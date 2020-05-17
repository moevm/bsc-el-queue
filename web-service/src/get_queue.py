from flask_restful import Resource
from pydash import update

from db_model import get_queue_by_id


class GetQueue(Resource):
    def get(self, room_id, queue_id):

        queue = get_queue_by_id(queue_id)

        update(queue, ['_id'], lambda val: str(val))

        return queue
