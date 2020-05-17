from flask_restful import Api
from flask import Flask

from remove_student_from_queue import RemoveStudentFromQueue
from add_student_to_queue import AddStudentToQueue
from create_queue import CreateQueue
from create_room import CreateRoom
from create_student import CreateStudent
from delete_queue import DeleteQueue
from get_queue import GetQueue
from get_room import GetRoom

from constants import API_ROUTE

API = None
app = Flask(__name__)


def addResources():
    getApi().add_resource(CreateRoom, API_ROUTE + '/room')
    getApi().add_resource(GetRoom, API_ROUTE + '/room/<string:room_id>')

    getApi().add_resource(CreateQueue, API_ROUTE + '/room/<string:room_id>/queue')
    getApi().add_resource(GetQueue, API_ROUTE + '/room/<string:room_id>/queue/<string:queue_id>')
    getApi().add_resource(DeleteQueue, API_ROUTE + '/room/<string:room_id>/queue/<string:queue_id>')
    getApi().add_resource(AddStudentToQueue,
                          API_ROUTE + '/room/<string:room_id>/queue/<string:queue_id>/student/<string:student_id>')
    getApi().add_resource(RemoveStudentFromQueue,
                          API_ROUTE + '/room/<string:room_id>/queue/<string:queue_id>/student/<string:student_id>')

    getApi().add_resource(CreateStudent, API_ROUTE + '/student')


def getApp():
    return app


def getApi():
    global API
    if API is None:
        API = Api(app)
    return API
