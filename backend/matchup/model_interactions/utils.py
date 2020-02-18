# matchup/model_interactions/utils.py

from channels.db import database_sync_to_async

from enum import Enum

from ..models import Match
from ..exceptions import ExistError

class RPSMove(Enum):
    rock = 0
    paper = 1
    scissors = 2

def get_match(match_id):
    """
    Queries the database to see if a match with match_id exists. If it does, returns the match object. Otherwise, raises ExistError.

    :param uuid match_id: the id of the match.
    :rtype: Match
    :return: the match with match_id.
    :raises ExistError: if match cannot be found.
    """
    try:
        match = Match.objects.get(id=match_id)
    except Match.DoesNotExist:
        raise ExistError("Failed to find match {}. It does not exist!".format(match_id))
    return match

def get_user_slot_in_match(match, user_id):
    """
    Queries the database to see if user with user_id is in match. If it is, returns the user's slot. Otherwise, raises ExistError.

    :param Match match: the match object.
    :param uuid user_id: the id of the user.
    :rtype: int
    :return: 1 or 2; the slot for the user in the match (i.e., if user_id is user1 or user2).
    :raises ExistError: if user not in match.
    """
    if match.user1 == user_id:
        return 1
    elif match.user2 == user_id:
        return 2
    else:
        raise ExistError("Failed to get user {} in match {}. User is not present in that match!".format(user_id, match.id))
