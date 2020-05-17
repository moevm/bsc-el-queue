from flask import request
from flask_restful import Resource

from db_model import create_queue


class CreateQueue(Resource):
    def post(self, room_id):
        body = request.get_json()

        queue_id = create_queue(room_id, body['name'])

        return {
            'queueId': str(queue_id)
        }
