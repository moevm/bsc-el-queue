from flask_restful import Api
from flask import Flask

from create_queue import CreateQueue
from create_room import CreateRoom
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


def getApp():
    return app


def getApi():
    global API
    if API is None:
        API = Api(app)
    return API
