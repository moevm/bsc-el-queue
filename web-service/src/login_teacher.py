from flask import request
from flask_restful import Resource

from db_model import login_teacher


class LoginTeacher(Resource):
    def post(self):
        body = request.get_json()

        authenticated = login_teacher(body['id'], body['password'])

        return authenticated
