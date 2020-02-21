# matchup/model_interactions/handlers.py

from django.apps import apps
from channels.db import database_sync_to_async
from django.db.models import Q

import random

from ..models import Match
from ..exceptions import ExistError
from ..utils import evaluate_rps, get_time_seconds

from .utils import get_match, get_user_slot_in_match, RPSMove

Wallet = apps.get_model('accounts', 'Wallet')
Stats = apps.get_model('accounts', 'Stats')

@database_sync_to_async
def join_match(user_id):
    """
    Finds and joins an open match, if one is available. If none is available, creates a new one and joins it.
    Either way, returns the ID of the joined match.

    :param UUID user_id: the id of the user trying to join the match.
    :rtype: UUID, str, UUID
    :return: 
        the UUID of the match. Will return the match a user is already a part of if they are part of one.
        a message describing the transaction
        the UUIID of the opponent. None if there are none in the match at joining.
    """
    already_joined_matches = list(Match.objects.filter(Q(user1=user_id) | Q(user2=user_id)))
    if len(already_joined_matches) > 0:
        match = already_joined_matches[0]
        opponent = None
        if match.user_count == 2:
            opponent = match.user1 if match.user1 != user_id else match.user2
        return match.id, 'Already joined match {}. Re-sending ID.'.format(already_joined_matches[0].id), opponent

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
    opponent = None
    if match.user_count == 2:
        match.lock = True
        opponent = match.user1 if match.user1 != user_id else match.user2
    match.save()
    return match.id, 'Joined match {} successfully'.format(match.id), opponent


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
        match.user1_choice = RPSMove[move].value
    else:
        match.user2_choice = RPSMove[move].value
    match.save()

#EXPERIMENTAL
@database_sync_to_async
def set_user_bet(match_id, user_id, amount):
    """
    Sets the user's bet.

    :param UUID match_id: the id of the match.
    :param UUID user_id: the id of the user betting.
    :param int amount: the amount the user wishes to bet.
    """
    match = get_match(match_id)
    user_slot = get_user_slot_in_match(match, user_id)

    if user_slot == 1:
        match.user1_bet += amount
    else:
        match.user2_bet += amount
    match.save()

@database_sync_to_async
def get_total_bet(match_id):
    match = get_match(match_id)

    return match.user1_bet + match.user2_bet

@database_sync_to_async
def get_wallet_cash(match_id, user_id):
    match = get_match(match_id)
    user_slot = get_user_slot_in_match(match, user_id)

    already_bet = None
    if user_slot == 1:
        already_bet = match.user1_bet
    else:
        already_bet = match.user2_bet

    wallet = Wallet.objects.get(user_id=user_id)

    print("ALREADY BET")
    print(already_bet)
    return wallet.cash, already_bet


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
def evaluate_round(match_id, user_id):
    """
    Evaluates the round based on the current state, randomly assigning selections to players if they have not made one. Then deducts bets from cash.

    After winner determined: 
        sets user1_choice, user2_choice to None
        increments rounds_finished
        increments the winning user's win count
        sets user bets back to 0

    :param UUID match_id: the id of the match.
    :rtype: uuid, str
    :return: 
        the winner of round. None if no one won.
        opponent move
    """
    match = get_match(match_id)

    if match.user1_choice is None:
        match.user1_choice = random.randint(0, 2)
    if match.user2_choice is None:
        match.user2_choice = random.randint(0, 2)

    winner = evaluate_rps(RPSMove(match.user1_choice), RPSMove(match.user2_choice))

    wallet_1 = Wallet.objects.get(user_id=match.user1)
    wallet_2 = Wallet.objects.get(user_id=match.user2)
    stats_1 = Stats.objects.get(user_id=match.user1)
    stats_2 = Stats.objects.get(user_id=match.user2)

    print("USER BETS")
    print(match.user2_bet)
    print(match.user1_bet)

    # don't count the round if we tied
    #EXPERIMENTAL if user1 won, then add user2's bet to their money, and vice-versa if user2 won.
    if winner != 0:
        if winner == 1: 
            winner = match.user1
            match.user1_wins += 1
            if match.user1_wins >= 2:
                print("user 2 is losing {}".format(match.user2_bet))
                wallet_1.cash += match.user2_bet
                wallet_2.cash -= match.user2_bet
                stats_1.games_won += 1
                stats_2.games_lost += 1
        else: 
            winner = match.user2
            match.user2_wins += 1
            if match.user2_wins >= 2:
                print("user 1 is losing {}".format(match.user1_bet))
                wallet_2.cash += match.user1_bet
                wallet_1.cash -= match.user1_bet
                stats_1.games_lost += 1
                stats_2.games_won += 1

        match.rounds_finished += 1
        wallet_1.save()
        wallet_2.save()
        stats_1.save()
        stats_2.save()

    else:
        winner = None

    user1_choice = match.user1_choice
    user2_choice = match.user2_choice

    match.user1_choice = None
    match.user2_choice = None
    match.started = False # this way the client can again order a new start

    match.save()

    return winner, match.user1, match.user2, RPSMove(user1_choice).name.lower(), RPSMove(user2_choice).name.lower()

@database_sync_to_async
def match_complete(match_id):
    match = get_match(match_id)

    return match.user1_wins >= 2 or match.user2_wins >= 2

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

@database_sync_to_async
def proper_round_time_elapsed(match_id, round_time):
    """
    Returns true if it's been round_time since match_id started.
    """
    match = get_match(match_id)

    return match.round_start_ts + round_time >= get_time_seconds()
