from flask import request
from flask_restful import Resource

from db_model import add_student_to_queue


class AddStudentToQueue(Resource):
    def post(self, room_id, queue_id, student_id):
        body = request.get_json()

        res = add_student_to_queue(queue_id, student_id, body['name'])

        return res
