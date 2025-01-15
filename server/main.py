from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt

app = Flask(__name__)
cors = CORS(app, origins='*')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///crypto.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = '5fcf70d660455aeb014d5e4e4aab1fdc07b6ffcc2b47ca7869d49b645f1552c6'
# # normally in env file,but hardcoding here for demo
# # load_dotenv()

bcrypt = Bcrypt(app)
db = SQLAlchemy(app)
jwt = JWTManager(app)

# User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    wallets = db.relationship('Wallet', backref='owner', lazy=True)

# Wallet Model
class Wallet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    address = db.Column(db.String(64), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False, index=True)

with app.app_context():
    db.create_all()

@app.route('/')
def index():
    return 'Welcome to the CoinTracker-Demo!'

@app.route('/api/users/signup', methods=['POST'])
def add_user():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user:
        return jsonify({"error": "Username already exists"}), 400
    try:
        password = data.get('password')
        # contrived password validation (in conjunction with FE validation)
        if not password or len(password) < 4:
            raise ValueError("Password not valid")

        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        new_user = User(username=data['username'], password_hash=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        access_token = create_access_token(identity=str(new_user.id))
        
        return jsonify({"message": "User added successfully", "access_token": access_token, "user_id": new_user.id}), 201
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
        access_token = create_access_token(identity=str(user.id))
        return jsonify({"message": "Login successful", "access_token": access_token, "user_id": user.id}), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401

@app.route('/api/users/<int:user_id>/wallets', methods=['GET'])
@jwt_required()
def get_user_wallets(user_id):
    current_user_id = get_jwt_identity()
    if current_user_id != str(user_id):
        return jsonify({"error": "Unauthorized access"}), 401
    
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    wallets = Wallet.query.filter_by(user_id=user_id).all()

    # Serialize wallet data
    wallets_data = [
        {"address": wallet.address, "wallet_id": wallet.id}
        for wallet in wallets
    ]

    return jsonify({"user": user.username, "wallets": wallets_data}), 200

@app.route('/api/users/<int:user_id>/wallets', methods=['POST'])
@jwt_required()
def add_user_wallet(user_id):
    current_user_id = get_jwt_identity()
    if current_user_id != str(user_id):
        return jsonify({"error": "Unauthorized access"}), 401

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()

    if 'address' not in data:
        return jsonify({"error": "Wallet address not found"}), 404

    new_wallet = Wallet(address=data['address'], user_id=user_id)
    try:
        db.session.add(new_wallet)
        db.session.commit()
        return jsonify({"message": "Wallet added successfully", "wallet_id": new_wallet.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Failed to add wallet", "details": str(e)}), 400

@app.route('/api/users/<int:user_id>/wallets/<int:wallet_id>', methods=['DELETE'])
@jwt_required()
def delete_wallet(user_id, wallet_id):
    current_user_id = get_jwt_identity()

    if current_user_id != str(user_id):
        return jsonify({"error": "Unauthorized access"}), 401

    wallet = Wallet.query.filter_by(id=wallet_id, user_id=user_id).first()

    if not wallet:
        return jsonify({"error": "Wallet not found"}), 404

    try:
        db.session.delete(wallet)
        db.session.commit()

        return jsonify({"message": "Wallet deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Failed to delete wallet", "details": str(e)}), 500

# for testing only
@app.route("/api/users", methods=['GET'])
def get_users():
    users = User.query.all()
    usernames = [{"username": user.username, "id": user.id} for user in users]
    return jsonify(usernames)

if __name__ == "__main__":
    app.run(debug=True, port=8080)