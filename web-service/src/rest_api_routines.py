from flask_restful import Api
from flask import Flask
from flask_socketio import SocketIO

from remove_student_from_queue import RemoveStudentFromQueue
from add_student_to_queue import AddStudentToQueue
from create_queue import CreateQueue
from create_room import CreateRoom
from create_student import CreateStudent
from delete_queue import DeleteQueue
from get_queue import GetQueue
from get_room import GetRoom
from skip_student import SkipStudent
from socket_connection import socket_connection
from constants import API_ROUTE

API = None
app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins='*')
socket_connection(socketio)


def addResources():
    getApi().add_resource(CreateRoom, API_ROUTE + '/rooms')
    getApi().add_resource(GetRoom, API_ROUTE + '/rooms/<string:room_id>')

    getApi().add_resource(CreateQueue, API_ROUTE + '/rooms/<string:room_id>/queues')
    getApi().add_resource(GetQueue, API_ROUTE + '/rooms/<string:room_id>/queues/<string:queue_id>')
    getApi().add_resource(DeleteQueue, API_ROUTE + '/rooms/<string:room_id>/queues/<string:queue_id>')
    getApi().add_resource(AddStudentToQueue,
                          API_ROUTE + '/rooms/<string:room_id>/queues/<string:queue_id>/students/<string:student_id>')
    getApi().add_resource(RemoveStudentFromQueue,
                          API_ROUTE + '/rooms/<string:room_id>/queues/<string:queue_id>/students/<string:student_id>')
    getApi().add_resource(SkipStudent,
                          API_ROUTE + '/rooms/<string:room_id>/queues/<string:queue_id>/students/<string:student_id>/skip')

    getApi().add_resource(CreateStudent, API_ROUTE + '/students')


def getApp():
    return app


def getApi():
    global API
    if API is None:
        API = Api(app)
    return API
