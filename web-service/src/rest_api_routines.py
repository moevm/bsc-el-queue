from flask_restful import Api
from flask import Flask
from flask_socketio import SocketIO

from apply_student import ApplyStudent
from check_is_student_in_queue import CheckIsStudentInQueue
from create_teacher import CreateTeacher
from get_student import GetStudent
from get_user import GetUser
from get_user_role import GetUserRole
from login_teacher import LoginTeacher
from reject_student import RejectStudent
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
    getApi().add_resource(CheckIsStudentInQueue,
                          API_ROUTE + '/rooms/<string:room_id>/queues/<string:queue_id>/students/<string:student_id>')
    getApi().add_resource(SkipStudent,
                          API_ROUTE + '/rooms/<string:room_id>/queues/<string:queue_id>/students/<string:student_id>/skip')
    getApi().add_resource(ApplyStudent,
                          API_ROUTE + '/rooms/<string:room_id>/queues/<string:queue_id>/students/<string:student_id>/apply')
    getApi().add_resource(RejectStudent,
                          API_ROUTE + '/rooms/<string:room_id>/queues/<string:queue_id>/students/<string:student_id>/reject')
    getApi().add_resource(CreateStudent, API_ROUTE + '/students')
    getApi().add_resource(GetStudent, API_ROUTE + '/students/<string:student_id>')

    getApi().add_resource(CreateTeacher, API_ROUTE + '/teachers')
    getApi().add_resource(LoginTeacher, API_ROUTE + '/teachers/login')

    getApi().add_resource(GetUserRole, API_ROUTE + '/users/<string:user_id>/role')
    getApi().add_resource(GetUser, API_ROUTE + '/users/<string:user_id>')


def getApp():
    return app


def getApi():
    global API
    if API is None:
        API = Api(app)
    return API
