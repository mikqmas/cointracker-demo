from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

from flask_sqlalchemy import SQLAlchemy

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

# for testing only
@app.route("/api/users", methods=['GET'])
def get_users():
    users = User.query.all()
    usernames = [user.username for user in users]
    return jsonify(usernames)

if __name__ == "__main__":
    app.run(debug=True, port=8080)