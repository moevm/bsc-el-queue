from flask import request
from flask_restful import Resource

from db_model import create_teacher


class CreateTeacher(Resource):
    def post(self):
        body = request.get_json()
        name = body['firstName'] + ' ' + body['lastName']

        teacher_id = create_teacher(name, body['password'])

        return {
            'teacherId': str(teacher_id)
        }
