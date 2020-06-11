from flask_restful import Resource

from db_model import get_user_role


class GetUserRole(Resource):
    def get(self, user_id):

        roles = get_user_role(user_id)

        return roles
