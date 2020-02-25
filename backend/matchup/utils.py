# matchup/utils.py

import datetime
import time
from threading import Timer

from .model_interactions.utils import RPSMove


class RepeatedTimer(object):
    def __init__(self, interval, function, *args, **kwargs):
        self._timer     = None
        self.interval   = interval
        self.function   = function
        self.args       = args
        self.kwargs     = kwargs
        self.is_running = False

    def _run(self):
        self.is_running = False
        self.start()
        self.function(*self.args, **self.kwargs)

    def start(self):
        if not self.is_running:
            self._timer = Timer(self.interval, self._run)
            self._timer.start()
            self.is_running = True

    def stop(self):
        self._timer.cancel()
        self.is_running = False


def wait_then_call(time_to_take, callback):
    """
    Waits time_to_take and then calls callback.

    :param int time_to_take: the time to take in seconds.
    :param func callback: the function to call when time_to_take has been taken.
    """
    timer = Timer(time_to_take, callback)
    print("TIMER STARTED")
    timer.start()

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
