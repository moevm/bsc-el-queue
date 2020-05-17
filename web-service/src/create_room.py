from flask import request
from flask_restful import Resource

from db_model import create_room


class CreateRoom(Resource):
    def post(self):
        body = request.get_json()

        room_id = create_room(body['teacherId'], body['name'])

        return {
            "roomId": str(room_id)
        }
