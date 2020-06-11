from db_model import get_db_object, get_room_by_id, get_queue_by_id
from bson.objectid import ObjectId
from flask_socketio import emit, join_room

# from bson.json_util import dumps


def socket_connection(socketio):
    @socketio.on('connect')
    def connect_handler():
        print('connected')

    @socketio.on('room connect')
    def test(room_id):
        print('============================')
        print('=======ROOM_CONNECT=========')
        print(room_id)
        join_room(room_id)

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
                emit('queues update', room['queues'], room=room_id)

    @socketio.on('queue connect')
    def test(queue_id):
        print('============================')
        print('=======QUEUE_CONNECT========')
        print(queue_id)
        join_room(queue_id)

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
                emit('students update', queue['students'], room=queue_id)
