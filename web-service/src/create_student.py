from flask import request
from flask_restful import Resource

from db_model import create_student


class CreateStudent(Resource):
    def post(self):
        body = request.get_json()
        name = body['firstName'] + ' ' + body['lastName']

        student_id = create_student(name)

        return {
            'studentId': str(student_id)
        }
