from flask_restful import Resource

from db_model import delete_queue


class DeleteQueue(Resource):
    def delete(self, room_id, queue_id):

        delete_queue(queue_id, room_id)

        return True
