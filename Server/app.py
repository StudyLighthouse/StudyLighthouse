import os
from flask import Flask, request, redirect, url_for, session, jsonify, send_from_directory
import pyrebase
from firebase_admin import firestore
import firebase_admin
from firebase_admin import credentials, auth as admin_auth
import firebase_config  # Import the firebase configuration
from flask_cors import CORS
from flask_cors import cross_origin
from authlib.integrations.flask_client import OAuth

app = Flask(__name__, static_folder='../Client/build', static_url_path='/')
CORS(app, resources={r"/*": {"origins": "*"}})  # Enable CORS

# Initialize Firestore DB
db = firebase_config.db

admin = firebase_config.admin

# Firebase configuration for Pyrebase
firebaseConfig = {
    "apiKey": "AIzaSyAm3OThmKLoxOGq61r4t7tHbwBL5XefTDI",
    "authDomain": "study-lighthouse.firebaseapp.com",
    "databaseURL": "https://study-lighthouse.firebaseio.com",  # Corrected URL
    "projectId": "study-lighthouse",
    "storageBucket": "study-lighthouse.appspot.com",
    "messagingSenderId": "122422954486",
    "appId": "1:122422954486:web:c317cba0f416093869dfd7",
    "measurementId": "G-R0BDY2JMGF"
}

firebase = pyrebase.initialize_app(firebaseConfig)
auth = firebase.auth()

oauth = OAuth(app)
appConf = {
    "OAUTH2_CLIENT_ID": "122422954486-ot8o5nrf0qhqv1be71g1hacfvpqhl8bp.apps.googleusercontent.com",
    "OAUTH2_CLIENT_SECRET": "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",
    "OAUTH2_META_URL": "https://accounts.google.com/.well-known/openid-configuration",
    "FLASK_SECRET": "your_secret_key",
    "FLASK_PORT": 3000
}

app.secret_key = appConf.get("FLASK_SECRET")

# Google OAuth configuration
oauth = OAuth(app)
oauth.register("myApp",
               client_id=appConf.get("OAUTH2_CLIENT_ID"),
               client_secret=appConf.get("OAUTH2_CLIENT_SECRET"),
               server_metadata_url=appConf.get("OAUTH2_META_URL"),
               client_kwargs={
                   "scope": "openid email profile",
               }
               )

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_file(path):
    if os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    number = data.get('mobile')
    password = data.get('password')
    confirm_password = data.get('confirmPassword')

    print('Received signup data:', data)  # Log the received data

    if password != confirm_password:
        return jsonify({"message": "Passwords do not match"}), 400

    try:
        user = auth.create_user_with_email_and_password(email, password)
        user_data = {'name': name, 'mobile': number, 'email': email, 'uid': user['localId']}
        db.collection('users').document(user['localId']).set(user_data)
        return jsonify({"message": "Account created successfully"}), 201
    except Exception as e:
        print('Error creating user:', str(e))  # Log the error
        return jsonify({"message": str(e)}), 400

@app.route('/signin', methods=['POST'])
def signin():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    try:
        user = auth.sign_in_with_email_and_password(email, password)
        user_info = auth.get_account_info(user['idToken'])
        uid = user_info['users'][0]['localId']
        user_data = db.collection('users').document(uid).get().to_dict()

        session['user'] = user_data
        response = jsonify({"message": "Sign in successful"})
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        return response, 200
    except Exception as e:
        print('Error signing in:', str(e))  # Log the error
        return jsonify({"message": "Invalid email or password"}), 401

@app.route('/signin/google')
@cross_origin(origin='http://localhost:3000', headers=['Content-Type', 'Authorization'])
def signin_google():
    redirect_uri = url_for('authorized_google', _external=True)
    return oauth.myApp.authorize_redirect(redirect_uri)

@app.route('/authorized/google')
def authorized_google():
    token = oauth.myApp.authorize_access_token()
    nonce = ''  # Add a nonce value here
    user_info = oauth.myApp.parse_id_token(token, nonce=nonce)
    email = user_info['email']
    name = user_info['name']
    print(email,name)

    # Check if user exists in Firestore, if not create a new user
    users_ref = db.collection('users')
    query = users_ref.where('email', '==', email).stream()

    user = None
    for doc in query:
        user = doc.to_dict()
        user['id'] = doc.id
        break

    if not user:
        user_data = {'name': name, 'email': email}
        db.collection('users').add(user_data)
        user = user_data

    session['user'] = user
    # Redirect the user to the frontend route
    return redirect("http://localhost:3000/main")

@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('index'))

@app.route('/post_question', methods=['POST'])
def post_question():
    data = request.get_json()
    question_text = data.get('question')
    user = session.get('user')

    # Check if the user is authenticated
    if user:
        question_data = {
            'username': user.get('name'),
            'email': user.get('email'),
            'question': question_text,
            'timestamp': firestore.SERVER_TIMESTAMP,
            'likes': 0
        }
        question_ref = db.collection('questions').add(question_data)

        # Add the question to the user's posted questions
        user_ref = db.collection('users').document(user.get('id'))
        user_ref.collection('posted_questions').document(question_ref.id).set(question_data)

        return jsonify({"message": "Question posted successfully"}), 201
    else:
        return jsonify({"message": "User not authenticated"}), 401

@app.route('/get_questions', methods=['GET'])
def get_questions():
    questions_ref = db.collection('questions').order_by('timestamp', direction=firestore.Query.DESCENDING).stream()
    questions = []
    for question in questions_ref:
        question_data = question.to_dict()
        question_data['id'] = question.id
        questions.append(question_data)
    return jsonify(questions), 200

if __name__ == '__main__':
    app.run(debug=True)
