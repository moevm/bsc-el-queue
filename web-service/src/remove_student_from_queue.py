from flask_restful import Resource

from db_model import remove_student_from_queue


class RemoveStudentFromQueue(Resource):
    def delete(self, room_id, queue_id, student_id):

        res = remove_student_from_queue(queue_id, student_id)

        return res
