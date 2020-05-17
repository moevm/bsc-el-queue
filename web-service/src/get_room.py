from flask_restful import Resource
from pydash import update

from db_model import get_room_by_id


class GetRoom(Resource):
    def get(self, room_id):

        room = get_room_by_id(room_id)
        update(room, ['_id'], lambda val: str(val))
        update(room, ['created'], lambda val: val.strftime("%d-%m-%Y %H:%M:%S"))
        return room
