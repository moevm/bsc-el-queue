from flask_restful import Resource


class TestRequest(Resource):
    def get(self):
        return 'Hello, World!'
