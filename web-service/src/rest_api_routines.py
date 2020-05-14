from flask_restful import Api
from flask import Flask

from test_request import TestRequest


API = None
app = Flask(__name__)


def addResources():
    getApi().add_resource(TestRequest, '/test')


def getApp():
    return app


def getApi():
    global API
    if API is None:
        API = Api(app)
    return API
