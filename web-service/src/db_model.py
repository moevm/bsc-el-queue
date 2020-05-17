from pymongo import MongoClient
from bson.objectid import ObjectId
from pydash import find

import datetime

from constants import DEFAULT_QUEUE_NAME, Roles

MONGO_CLIENT = None
HOST = 'localhost'
PORT = 27017
ROOMS = 'rooms'
QUEUES = 'queues'
USERS = 'users'


def get_db_name():
    return 'queue_system'


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


def create_queue(room_id, name=DEFAULT_QUEUE_NAME, db=get_db_object()):
    queue = {
        'room_id': room_id,
        'name': name,
        'students': [],
    }

    result = db[QUEUES].insert_one(queue)

    db[ROOMS].find_one_and_update({
        '_id': ObjectId(room_id)
    }, {
        '$push': {
            'queues': {
                'id': str(result.inserted_id),
                'name': queue['name']
            }
        }
    })

    return result.inserted_id


def delete_queue(queue_id, room_id, db=get_db_object()):
    db[QUEUES].delete_one({'_id': ObjectId(queue_id)})

    db[ROOMS].find_one_and_update({
        '_id': ObjectId(room_id)
    }, {
        '$pull': {
            'queues': {
                'id': str(queue_id),
            }
        }
    })

    return True


def get_queue_by_id(queue_id, db=get_db_object()):
    return db[QUEUES].find_one({'_id': ObjectId(queue_id)})


def get_queue_list_by_room_id(queue_id, db=get_db_object()):
    return db[QUEUES].find({'room_id': ObjectId(queue_id)}).collection


def create_room(teacher_id, name, db=get_db_object()):
    result = db[ROOMS].insert_one({
        'created': datetime.datetime.now(),
        'name': name,
        'teachers': [teacher_id],
        'queues': [],
    })

    create_queue(result.inserted_id)

    return result.inserted_id


def get_room_by_id(room_id, db=get_db_object()):
    return db[ROOMS].find_one({'_id': ObjectId(room_id)})


def create_student(name, db=get_db_object()):
    result = db[USERS].insert_one({
        'name': name,
        'roles': [Roles['STUDENT']]
    })

    return result.inserted_id


def add_student_to_queue(queue_id, student_id, student_name, db=get_db_object()):
    queue = db[QUEUES].find_one({
        '_id': ObjectId(queue_id)
    })

    student = find(queue['students'], lambda student: student['_id'] == student_id)

    if student:
        return False

    db[QUEUES].find_one_and_update({
        '_id': ObjectId(queue_id)
    }, {
        '$push': {
            'students': {
                '_id': student_id,
                'name': student_name,
            }
        }
    })

    return True
