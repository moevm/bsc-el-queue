from pymongo import MongoClient


MONGO_CLIENT = None
HOST = 'localhost'
PORT = 27017
LOGIC_GATES = 'logic_gates'
TASK = 'task_id'
ANSWER = 'is_correct_answer'
RESULT = 'result'
ERROR = 'error_msg'
TASK_CONDITION = 'task_condition'
SEED = 'seed'
INPUTS = 'inputs'
PARAMS = 'params'
ID = '_id'
OUTPUTS = 'outputs'


def get_db_name():
    return 'users'


def get_db_object():
    return get_client_object()[get_db_name()]


def get_client_object():
    global MONGO_CLIENT
    if MONGO_CLIENT is None:
        MONGO_CLIENT = MongoClient(HOST, PORT)
    return MONGO_CLIENT


def close_connection():
    if MONGO_CLIENT is not None:
        MONGO_CLIENT.close()

