from flask_restful import Resource
from pydash import update

from db_model import get_student_by_id


class GetStudent(Resource):
    def get(self, student_id):

        student = get_student_by_id(student_id)

        update(student, ['_id'], lambda val: str(val))

        return student
