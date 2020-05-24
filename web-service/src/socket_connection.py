from db_model import get_db_object, get_room_by_id, get_queue_by_id
from bson.objectid import ObjectId
from flask_socketio import emit

# from bson.json_util import dumps


def socket_connection(socketio):
    @socketio.on('connect')
    def connect_handler():
        print('connected')

    @socketio.on('queues')
    def test(room_id):
        print('============================')
        print('=========ON_QUEUES==========')
        print(room_id)

        db = get_db_object()

        pipeline = [{
            '$match': {
                'documentKey': {
                    '_id': ObjectId(room_id)
                }
            }
        }]

        with db['rooms'].watch(pipeline) as stream:
            for change in stream:
                room = get_room_by_id(room_id)
                print(change)
                emit('queues', room['queues'])

    @socketio.on('students')
    def test(queue_id):
        print('============================')
        print('========ON_STUDENTS=========')
        print(queue_id)

        db = get_db_object()

        pipeline = [{
            '$match': {
                'documentKey': {
                    '_id': ObjectId(queue_id)
                }
            }
        }]

        with db['queues'].watch(pipeline) as stream:
            for change in stream:
                queue = get_queue_by_id(queue_id)
                print(change)
                emit('students', queue['students'])
