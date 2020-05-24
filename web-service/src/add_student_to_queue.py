from flask_restful import Resource

from db_model import add_student_to_queue


class AddStudentToQueue(Resource):
    def post(self, room_id, queue_id, student_id):
        res = add_student_to_queue(queue_id, student_id)

        return res
