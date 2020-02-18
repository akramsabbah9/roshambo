# matchup/utils.py

import asyncio
import datetime

from .model_interactions.utils import RPSMove

class Timer:
    def __init__(self, time_to_take, callback):
        self._time_to_take = time_to_take
        self._callback = callback
        self._task = asyncio.ensure_future(self._job())

    async def _job(self):
        await asyncio.sleep(self._time_to_take)
        await self._callback()

    def cancel(self):
        self._task.cancel()

def wait_then_call(time_to_take, callback):
    """
    Waits time_to_take and then calls callback.

    :param int time_to_take: the time to take in seconds.
    :param func callback: the function to call when time_to_take has been taken.
    """
    timer = Timer(time_to_take, callback)

def get_time_seconds():
    """
    returns the current time stamp in seconds since the epoch.
    """
    return int((datetime.datetime.utcnow() - datetime.datetime(1970, 1, 1)).total_seconds())

def evaluate_rps(user1_choice, user2_choice):
    """
    Evaluates rock-paper-scissors.

    :param RPSMove user1_choice: rock, paper or scissors for user 1.
    :param RPSMove user2_choice: rock, paper or scissors for user 2.
    :rtype: int
    :return: the slot of the winning user (1 or 2). If neither won, returns 0.
    """
    if user1_choice == RPSMove.rock:
        if user2_choice == RPSMove.rock:
            return 0
        elif user2_choice == RPSMove.paper:
            return 2
        else: # user2_choice == RPSMove.scissors
            return 1
    elif user1_choice == RPSMove.paper:
        if user2_choice == RPSMove.rock:
            return 1
        elif user2_choice == RPSMove.paper:
            return 0
        else: # user2_choice == RPSMove.scissors
            return 2
    else: # user1_choice == RPSMove.scissors
        if user2_choice == RPSMove.rock:
            return 2
        elif user2_choice == RPSMove.paper:
            return 1
        else: # user2_choice == RPSMove.scissors
            return 0
