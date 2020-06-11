from flask_restful import Resource

from db_model import is_student_in_queue


class CheckIsStudentInQueue(Resource):
    def get(self, room_id, queue_id, student_id):

        student_in_queue = is_student_in_queue(queue_id, student_id)

        return student_in_queue
