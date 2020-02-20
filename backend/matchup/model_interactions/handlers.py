# matchup/model_interactions/handlers.py

from channels.db import database_sync_to_async
from django.db.models import Q

import random

from ..models import Match
from ..exceptions import ExistError
from ..utils import evaluate_rps, get_time_seconds

from .utils import get_match, get_user_slot_in_match, RPSMove

@database_sync_to_async
def join_match(user_id):
    """
    Finds and joins an open match, if one is available. If none is available, creates a new one and joins it.
    Either way, returns the ID of the joined match.

    :param UUID user_id: the id of the user trying to join the match.
    :rtype: UUID, str
    :return: 
        the UUID of the match. Will return the match a user is already a part of if they are part of one.
        a message describing the transaction
    """
    already_joined_matches = list(Match.objects.filter(Q(user1=user_id) | Q(user2=user_id)))
    if len(already_joined_matches) > 0:
        match = already_joined_matches[0]
        return match.id, 'Already joined match {}. Re-sending ID.'.format(already_joined_matches[0].id)

    # find a match
    matches = list(Match.objects.filter(user_count__lte=1, lock=False))
    if len(matches) == 0:
        # if no matches are open, make a new one. Assured it is unique by UUID id field
        match = Match.objects.create(user1=user_id)
    else:
        match = matches[0]
        match.user2 = user_id
    # increment user_count of that match
    match.user_count += 1
    # matches are only allowed 2 users; lock ensures someone can't join in the middle of a match if someone else quits
    if match.user_count == 2:
        match.lock = True
    match.save()
    return match.id, 'Joined match {} successfully'.format(match.id)


@database_sync_to_async
def leave_match(match_id, user_id):
    """
    Removes the user with user_id from the match with match_id.

    :param UUID match_id: the id of the match.
    :param UUID user_id: the id of the user trying to leave the match.
    """
    match = get_match(match_id)
    
    user_slot = get_user_slot_in_match(match, user_id)
    if user_slot == 1:
        match.user1 = None
    else:
        match.user2 = None

    match.user_count -= 1
    match.save()
    if (match.user_count <= 0):
        match.delete()


@database_sync_to_async
def round_started(match_id):
    """
    :param UUID match_id: the id of the match.
    :rtype: bool
    :return: True if match with match_id has field started set to True. False otherwise.
    """
    match = get_match(match_id)

    return match.started

@database_sync_to_async
def set_round_as_started(match_id):
    """
    Sets match.started to true.
    :param UUID match_id: the id of the match.
    """
    match = get_match(match_id)

    match.started = True

    match.save()

@database_sync_to_async
def set_user_move(match_id, user_id, move):
    """
    Sets the user's move.

    :param UUID match_id: the id of the match.
    :param UUID user_id: the id of the user trying to leave the match.
    :param str move: the move the user desires. Must be valid within the enum model_interactions.utils.RPSMove.
    """
    match = get_match(match_id)
    user_slot = get_user_slot_in_match(match, user_id)

    if user_slot == 1:
        match.user1_choice = RPSMove['move'].value
    else:
        match.user2_choice = RPSMove['move'].value
    match.save()

@database_sync_to_async
def set_user_ready_status(match_id, user_id, ready_status):
    """
    Sets the user's ready status.

    :param UUID match_id: the id of the match.
    :param UUID user_id: the id of the user trying to leave the match.
    :param bool ready_status: the ready status the user desires.
    """
    match = get_match(match_id)
    user_slot = get_user_slot_in_match(match, user_id)

    if user_slot == 1:
        match.user1_ready = ready_status
        if not match.user2_ready:
            match.first_to_ready = user_id
    else:
        match.user2_ready = ready_status
        if not match.user1_ready:
            match.first_to_ready = user_id
    match.save()

@database_sync_to_async
def both_users_ready(match_id):
    """
    :param UUID match_id: the id of the match.
    :rtype: bool
    :return: True if user1_ready and user2_ready are both True. False otherwise.
    """
    match = get_match(match_id)

    # EXPERIMENTAL
    # update the timestamp of ready users. 2 save calls because we expect to have no users ready more often than not.
    if match.user1_ready:
        match.user1_ts = get_time_seconds()
        match.save()
    if match.user2_ready:
        match.user2_ts = get_time_seconds()
        match.save()

    return match.user1_ready and match.user2_ready

@database_sync_to_async
def evaluate_round(match_id):
    """
    Evaluates the round based on the current state, randomly assigning selections to players if they have not made one.

    After winner determined: 
        sets user1_choice, user2_choice to None
        increments rounds_finished
        increments the winning user's win count

    :param UUID match_id: the id of the match.
    :rtype: uuid
    :return: the winner of round. None if no one won.
    """
    match = get_match(match_id)

    if not match.user1_choice:
        match.user1_choice = random.randint(0, 2)
    if not match.user2_choice:
        match.user2_choice = random.randint(0, 2)

    winner = evaluate_rps(RPSMove(match.user1_choice), RPSMove(match.user2_choice))

    # don't count the round if we tied
    if winner != 0:
        if winner == 1: 
            winner = match.user1
            match.user1_wins += 1
        else: 
            winner = match.user2
            match.user2_wins += 1
        match.rounds_finished += 1
    else:
        winner = None
    
    match.user1_choice = None
    match.user2_choice = None
    match.started = False # this way the client can again order a new start

    match.save()

    return winner

@database_sync_to_async
def user_first_to_ready(match_id, user_id):
    """
    Determines if user was the first one to ready up.

    :param UUID match_id: the id of the match.
    :param UUID user_id: the id of the user trying to leave the match.
    :rtype: bool
    :return: True if this user is set as the first to ready, False otherwise.
    """
    match = get_match(match_id)
    
    return match.first_to_ready == user_id

@database_sync_to_async
def get_serialized_user_data(user):
    """
    :param RoshamboUser user: the user to get info for.
    :rtype: dict
    :return: the user's public info (id, username, guild, country_code).
    """
    # Somewhat janky since we don't want to import accounts' models/serializers
    return {
        'id': str(user.id),
        'username': user.username,
        'guild': user.guild,
        'country_code': user.country_code,
    }
