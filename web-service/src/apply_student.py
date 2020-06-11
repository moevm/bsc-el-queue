from flask_restful import Resource

from db_model import remove_student_from_queue


class ApplyStudent(Resource):
    def put(self, room_id, queue_id, student_id):

        res = remove_student_from_queue(queue_id, student_id)

        return res
