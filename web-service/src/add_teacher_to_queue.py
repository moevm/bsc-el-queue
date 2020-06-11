from flask_restful import Resource

from db_model import add_teacher_to_room


class AddTeacherToRoom(Resource):
    def post(self, room_id, teacher_id):
        res = add_teacher_to_room(room_id, teacher_id)

        return res
