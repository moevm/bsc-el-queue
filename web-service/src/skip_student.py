from flask_restful import Resource

from db_model import skip_student


class SkipStudent(Resource):
    def put(self, room_id, queue_id, student_id):

        res = skip_student(queue_id, student_id)

        return res
