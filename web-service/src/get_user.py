from flask_restful import Resource
from pydash import update

from db_model import get_user_by_id


class GetUser(Resource):
    def get(self, user_id):
        user = get_user_by_id(user_id)

        update(user, ['_id'], lambda val: str(val))

        if user:
            return user
        else:
            return False
