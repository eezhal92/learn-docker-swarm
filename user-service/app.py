from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS
import requests

app = Flask(__name__)
api = Api(app)
CORS(app)

class Users(Resource):
  def get(self):
    return {
      'users': [
        { 'id': 'user-1', 'name': 'John Doe' },
        { 'id': 'user-2', 'name': 'Alex Garett' },
        { 'id': 'user-3', 'name': 'Herman' }
      ]
    }

  def post(self):
    return {
      'user': { 'id': 'Hello' }
    }

class User(Resource):
  def get(self, user_id):
    return {
      'user': {
        'id': 'user-id',
        'name': 'Awesome'
      }
    }

class UserBooking(Resource):
  def get(self, user_id):
    # r = requests.get('http://jsonplaceholder.typicode.com/todos/1')
    r = requests.get('http://room-service:3000/bookings')

    return r.json()

api.add_resource(Users, '/users')
api.add_resource(User, '/users/<user_id>')
api.add_resource(UserBooking, '/users/<user_id>/bookings')

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=80, debug=True)
