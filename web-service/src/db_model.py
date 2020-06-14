from pymongo import MongoClient
from bson.objectid import ObjectId
from pydash import find, find_index, splice, concat, omit, update

import datetime

from constants import DEFAULT_QUEUE_NAME, Roles

MONGO_CLIENT = None
# HOST = '172.17.0.2'
# HOST = 'localhost'
HOST = '127.0.0.1'
PORT = 27018
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


def get_queue_list_by_room_id(room_id, db=get_db_object()):
    return db[QUEUES].find({'room_id': room_id})


def create_room(teacher_id, name, db=get_db_object()):
    result = db[ROOMS].insert_one({
        'created': datetime.datetime.now(),
        'name': name,
        'teachers': [teacher_id],
        'queues': [],
    })

    create_queue(str(result.inserted_id))

    return result.inserted_id


def get_room_by_id(room_id, db=get_db_object()):
    return db[ROOMS].find_one({'_id': ObjectId(room_id)})


def create_student(name, db=get_db_object()):
    result = db[USERS].insert_one({
        'name': name,
        'roles': [Roles['STUDENT']]
    })

    return result.inserted_id


def get_student_by_id(student_id, db=get_db_object()):
    return db[USERS].find_one({'_id': ObjectId(student_id)})


def add_student_to_queue(queue_id, student_id, db=get_db_object()):
    student = db[USERS].find_one({
        '_id': ObjectId(student_id)
    })

    student_in_queue = is_student_in_queue(queue_id, student_id, db)

    if student_in_queue:
        return False

    db[QUEUES].find_one_and_update({
        '_id': ObjectId(queue_id)
    }, {
        '$push': {
            'students': {
                'id': student_id,
                'name': student['name'],
            }
        }
    })

    return True


def remove_student_from_queue(queue_id, student_id, db=get_db_object()):
    db[QUEUES].find_one_and_update({
        '_id': ObjectId(queue_id)
    }, {
        '$pull': {
            'students': {
                'id': str(student_id),
            }
        }
    })

    return True


def is_student_in_queue(queue_id, student_id, db=get_db_object()):
    queue = db[QUEUES].find_one({'_id': ObjectId(queue_id)})

    student_in_queue = find(queue['students'], lambda student: student['id'] == student_id)

    if student_in_queue:
        return True

    return False


def skip_student(queue_id, student_id, db=get_db_object()):
    queue = db[QUEUES].find_one({'_id': ObjectId(queue_id)})
    students = queue['students'].copy()
    student_index = find_index(students, lambda student: student['id'] == student_id)

    rest_students = splice(students, student_index)
    student_after_current = splice(rest_students, 1, 1)

    result_student_list = concat(students, student_after_current, rest_students)

    db[QUEUES].find_one_and_update({
        '_id': ObjectId(queue_id)
    }, {
        '$set': {
            'students': result_student_list
        }
    })

    return True


def create_teacher(name, password, db=get_db_object()):
    result = db[USERS].insert_one({
        'name': name,
        'password': password,
        'roles': [Roles['TEACHER']],
    })

    return result.inserted_id


def login_teacher(teacher_id, password, db=get_db_object()):
    teacher = db[USERS].find_one({'_id': ObjectId(teacher_id)})

    if teacher['password'] != password:
        return False

    update(teacher, ['_id'], lambda val: str(val))
    return omit(teacher, 'password')


def get_user_role(user_id, db=get_db_object()):
    user = db[USERS].find_one({'_id': ObjectId(user_id)})

    return user['roles']


def get_user_by_id(user_id, db=get_db_object()):
    user = db[USERS].find_one({'_id': ObjectId(user_id)})

    return user

def is_teacher_in_room(room_id, teacher_id, db=get_db_object()):
    room = db[ROOMS].find_one({'_id': ObjectId(room_id)})

    teacher_in_room = find(room['teachers'], lambda _teacher_id: _teacher_id == teacher_id)

    if teacher_in_room:
        return True

    return False


def add_teacher_to_room(room_id, teacher_id, db=get_db_object()):
    teacher_in_room = is_teacher_in_room(room_id, teacher_id, db)

    if teacher_in_room:
        return False

    db[ROOMS].find_one_and_update({
        '_id': ObjectId(room_id)
    }, {
        '$push': {
            'teachers':  teacher_id,
        }
    })

    return True
