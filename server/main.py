from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

import bcrypt

app = Flask(__name__)
cors = CORS(app, origins='*')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///crypto.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    wallets = db.relationship('Wallet', backref='owner', lazy=True)

# Wallet Model
class Wallet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    address = db.Column(db.String(64), unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False, index=True)

with app.app_context():
    db.create_all()

@app.route('/')
def index():
    return 'Welcome to the CoinTracker-Demo!'

@app.route('/api/users/signup', methods=['POST'])
def add_user():
    data = request.get_json()
    try:
        password = data.get('password')
        # contrived password validation (in conjunction with FE validation)
        if not password or len(password) < 4:
            raise ValueError("Password not valid")

        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        new_user = User(username=data['username'], password_hash=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify({"message": "User added successfully"}), 201
    except Exception as e:
        # server log for debugging, TODO: add to logging and monitoring Datadog/AWS Cloudwatch 
        print(f"Error: {e}")
        db.session.rollback()
        
        return jsonify({"error": "Failed to create user", "details": str(e)}), 401

@app.route('/api/users/login', methods=['POST'])
def login_user():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user and bcrypt.check_password_hash(user.password_hash, data['password']):
        return jsonify({"message": "Login successful", "username": user.username}), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401

# for testing only
@app.route("/api/users", methods=['GET'])
def get_users():
    users = User.query.all()
    usernames = [user.username for user in users]
    return jsonify(usernames)

if __name__ == "__main__":
    app.run(debug=True, port=8080)