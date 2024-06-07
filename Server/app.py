import os
import json  # Add this import
from flask import Flask, request, redirect, url_for, session, jsonify, send_from_directory
import pyrebase
from firebase_admin import firestore
import firebase_admin
from firebase_admin import credentials, auth as admin_auth
import firebase_config  # Import the firebase configuration
from flask_cors import CORS, cross_origin
import uuid 
from authlib.integrations.flask_client import OAuth
from flask_socketio import SocketIO, emit
from firebase_admin import storage
from werkzeug.utils import secure_filename

app = Flask(__name__, static_folder='../Client/build', static_url_path='/')
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)  # Enable CORS

# Initialize SocketIO
socketio = SocketIO(app, cors_allowed_origins="*")

# Initialize Firestore DB
db = firebase_config.db

admin = firebase_config.admin

ALLOWED_EXTENSIONS = {'pdf', 'doc', 'docx', 'txt'}

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
    "FLASK_SECRET": "study@light@house",
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

    if password != confirm_password:
        return jsonify({"message": "Passwords do not match"}), 400

    try:
        user = auth.create_user_with_email_and_password(email, password)
        user_data = {'name': name, 'mobile': number, 'email': email, 'uid': user['localId']}
        db.collection('users').document(user['localId']).set(user_data)
        return jsonify({"message": "Account created successfully"}), 201
    except Exception as e:
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
        response = jsonify({"message": "Sign in successful", "user": user_data})
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response, 200
    except Exception as e:
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
    user = data.get('user')  # Get user data from the request body

    # Check if the user data exists and contains necessary information
    if user and 'name' in user and 'email' in user and 'uid' in user:
        question_data = {
            'question_id': str(uuid.uuid4()),  # Generate a unique ID for the question
            'username': user.get('name'),
            'email': user.get('email'),
            'question': question_text,
            'timestamp': firestore.SERVER_TIMESTAMP,
        }
        question_ref = db.collection('questions').document(question_data['question_id'])  # Use the generated ID
        question_ref.set(question_data)  # Set the question data

        # Add the question to the user's posted questions
        user_ref = db.collection('users').document(user.get('uid'))
        user_ref.collection('posted_questions').document(question_data['question_id']).set(question_data)

        # Emit the new question event to all connected clients
        socketio.emit('new_question', question_data)

        return jsonify({"message": "Question posted successfully"}), 201
    else:
        return jsonify({"error": "Invalid user data"}), 400

@app.route('/get_questions', methods=['GET'])
def get_questions():
    questions_ref = db.collection('questions').order_by('timestamp', direction=firestore.Query.DESCENDING).stream()
    questions = []
    for question in questions_ref:
        question_data = question.to_dict()
        question_data['id'] = question.id
        questions.append(question_data)
    print(questions)
    return jsonify(questions), 200

@app.route('/get_question/<question_id>', methods=['GET'])
def get_question(question_id):
    try:
        question_ref = db.collection('questions').document(question_id)
        question = question_ref.get().to_dict()
        if question:
            return jsonify(question), 200
        else:
            return jsonify({"message": "Question not found"}), 404
    except Exception as e:
        return jsonify({"message": str(e)}), 500

@app.route('/post_solution', methods=['POST'])
def post_solution():
    data = request.get_json()
    question_id = data.get('questionId')
    solution_text = data.get('solution')
    user = data.get('user')
    print(question_id)
    if not user:
        return jsonify({"message": "User not authenticated"}), 401

    try:
        solution_data = {
            'solution_id': str(uuid.uuid4()),
            'solution': solution_text,
            'username': user['name'],
            'userId': user['uid'],
            'timestamp': firestore.SERVER_TIMESTAMP,
            'likes': 0
        }
        # Save solution in question document
        question_ref = db.collection('questions').document(question_id)
        question_ref.collection('solutions').document(solution_data['solution_id']).set(solution_data)

        user_ref = db.collection('users').document(user.get('uid'))
        user_ref.collection('solutions').document(solution_data['solution_id']).set(solution_data)
        return jsonify({"message": "Solution posted successfully"}), 201
    except Exception as e:
        return jsonify({"message": str(e)}), 500

@app.route('/post_file_solution', methods=['POST'])
@cross_origin(origin='http://localhost:3000', headers=['Content-Type', 'Authorization'], supports_credentials=True)
def post_file_solution():
    try:
        user_json = request.form.get('user')
        if not user_json:
            return jsonify({"message": "User not authenticated"}), 401

        user = json.loads(user_json)
        question_id = request.form.get('questionId')
        file = request.files.get('file')
        print(question_id)

        if not file:
            return jsonify({"message": "No file provided"}), 400

        file_id = str(uuid.uuid4())
        file_extension = os.path.splitext(file.filename)[1]
        file_path = f"solutions/{file_id}{file_extension}"  # Correct folder path

        # Initialize Firebase Storage
        storage_client = storage.bucket('study-lighthouse.appspot.com')  # Specify the bucket name

        # Upload the file to Firebase Storage
        blob = storage_client.blob(file_path)
        blob.upload_from_file(file)

        # Get the public URL of the uploaded file
        file_url = blob.public_url

        solution_data = {
            'solution_id': str(uuid.uuid4()),
            'file_url': file_url,
            'filename': file.filename,
            'username': user['name'],
            'userId': user['uid'],
            'timestamp': firestore.SERVER_TIMESTAMP,
            'likes': 0
        }
        
        question_ref = db.collection('questions').document(question_id)
        question_ref.collection('solutions').document(solution_data['solution_id']).set(solution_data)

        user_ref = db.collection('users').document(user.get('uid'))
        user_ref.collection('posted_questions').document(question_id).collection('solutions').document(solution_data['solution_id']).set(solution_data)

        return jsonify({"message": "File uploaded successfully"}), 201
    except Exception as e:
        print(f"Error in post_file_solution: {str(e)}")
        return jsonify({"message": str(e)}), 500
    
@app.route('/get_solutions/<question_id>', methods=['GET'])
def get_solutions(question_id):
    try:
        solutions_ref = db.collection('questions').document(question_id).collection('solutions')
        solutions = []
        for solution in solutions_ref.stream():
            solution_data = solution.to_dict()
            solution_data['id'] = solution.id
            solutions.append(solution_data)
        return jsonify(solutions), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500
    
@app.route('/like_solution', methods=['POST'])
def like_solution():
    data = request.get_json()
    solution_id = data.get('solutionId')
    question_id = data.get('questionId')

    try:
        # Check if the user has already liked the solution
        user_id = data.get('userId')
        print(user_id)
        if not user_id:
            return jsonify({"message": "User not authenticated"}), 401

        solution_ref = db.collection('questions').document(question_id).collection('solutions').document(solution_id)
        solution = solution_ref.get().to_dict()

        user_ref = db.collection('users').document(user_id).collection('posted_questions').document(question_id).collection('solutions').document(solution_id)
        user_ref_solution = user_ref.get().to_dict()
        # Check if the user has already liked the solution
        liked_users = solution.get('liked_users', [])
        liked_users_in_users = user_ref_solution.get('liked_users', [])
        if user_id in liked_users and user_id in liked_users_in_users:
            # If the user has already liked the solution, decrement the likes count and remove the user from the liked_users list
            likes_count = solution.get('likes', 0)
            user_likes_count = user_ref_solution.get('likes', 0)
            likes_count -= 1
            user_likes_count -= 1
            liked_users.remove(user_id)
            liked_users_in_users.remove(user_id)
            solution_ref.update({'likes': likes_count, 'liked_users': liked_users})
            user_ref.update({'likes': likes_count, 'liked_users': liked_users})
            return jsonify({"message": "Solution disliked successfully", "likes": likes_count}), 200
        else:
            # If the user has not already liked the solution, increment the likes count and add the user to the liked_users list
            likes_count = solution.get('likes', 0)
            user_likes_count = user_ref_solution.get('likes', 0)
            likes_count += 1
            user_likes_count += 1
            liked_users.append(user_id)
            liked_users_in_users.append(user_id)
            solution_ref.update({'likes': likes_count, 'liked_users': liked_users})
            user_ref.update({'likes': likes_count, 'liked_users': liked_users})
            return jsonify({"message": "Solution liked successfully", "likes": likes_count}), 200

    except Exception as e:
        return jsonify({"message": str(e)}), 500
    
@app.route('/post_study_material', methods=['POST'])
def post_study_material():
    
    # Check if the POST request has the file part
    if 'file' not in request.files:
        return jsonify({"message": "No file provided"}), 400
    
    file = request.files['file']
    
    # Check if the file is not empty
    if file.filename == '':
        return jsonify({"message": "No file selected"}), 400
    
    # Check if the file extension is allowed
    if '.' not in file.filename or file.filename.rsplit('.', 1)[1].lower() not in ALLOWED_EXTENSIONS:
        return jsonify({"message": "Invalid file extension"}), 400
    
    # Secure filename to prevent path traversal attacks
    filename = secure_filename(file.filename)
    
    # Save the file to Firebase Storage
    try:
        
        file_id = str(uuid.uuid4())
        file_extension = os.path.splitext(filename)[1]
        file_path = f"study_materials/{file_id}{file_extension}"
        
        storage_client = storage.bucket('study-lighthouse.appspot.com')
        blob = storage_client.blob(file_path)
        blob.upload_from_file(file)
        
        # Get the public URL of the uploaded file
        file_url = blob.public_url
    except Exception as e:
        return jsonify({"message": str(e)}), 500
    
    # Store study material information in Firestore
    try:
        user_json = request.form.get('user')
        if not user_json:
            return jsonify({"message": "User not authenticated"}), 401
        user = json.loads(user_json)
        data = request.form
        user_id = user.get('uid')
        print(user_id)
        material_name = data.get('materialName')
        
        study_material_data = {
            'material_id': str(uuid.uuid4()),
            'user_id': user_id,
            'material_name': material_name,
            'file_url': file_url,
            'filename': filename,
            'timestamp': firestore.SERVER_TIMESTAMP,
        }
        
        study_material_ref = db.collection('study_materials').document(study_material_data['material_id'])
        study_material_ref.set(study_material_data)
        
        # Associate the study material with the user
        user_ref = db.collection('users').document(user_id)
        user_ref.collection('posted_materials').document(study_material_data['material_id']).set(study_material_data)
        
        return jsonify({"message": "Study material posted successfully"}), 201
    except Exception as e:
        return jsonify({"message": str(e)}), 500
    
# Add this route to your backend

@app.route('/get_study_materials', methods=['GET'])
def get_study_materials():
    try:
        study_materials_ref = db.collection('study_materials').stream()
        study_materials = []
        for material in study_materials_ref:
            study_material_data = material.to_dict()
            study_materials.append(study_material_data)
        return jsonify(study_materials), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500


@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

if __name__ == '__main__':
    socketio.run(app, debug=True, port=5000)
