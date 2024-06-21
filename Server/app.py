import os
import json  # Add this import
import cohere
import re
import pyttsx3
from flask import Flask, request, redirect, url_for, session, jsonify, send_from_directory, current_app, send_file
import pyrebase
from firebase_admin import firestore
import firebase_admin
from firebase_admin import credentials, auth as admin_auth
import firebase_config  # Import the firebase configuration
from flask_cors import CORS, cross_origin
import uuid 
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from authlib.integrations.flask_client import OAuth
from flask_socketio import SocketIO, emit
from firebase_admin import storage
from werkzeug.utils import secure_filename
co = cohere.Client('4aYW0bLEV3UQvVuFwgqma9mNuS61i7uECkTWsBp1')

app = Flask(__name__, static_folder='../Client/build', static_url_path='/')
CORS(app, resources={r"/*": {"origins": "https://studylighthouse.netlify.app"}}, supports_credentials=True)  # Enable CORS

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

def send_email(subject,receiver_emails, body):
    # Email settings
    smtp_server = 'smtp.gmail.com'
    smtp_port = 587
    sender_email = 'manikantaswamynanduri75@gmail.com'
    password = 'cukc fpyu gxhb sxdd'
    
    # Create message
    message = MIMEMultipart()
    message['From'] = sender_email
    message['Subject'] = subject
    message.attach(MIMEText(body, 'plain'))
    
    # Send email
    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(sender_email, password)
        text = message.as_string()
        server.sendmail(sender_email, receiver_emails, text)
        print('Email sent successfully')
    except Exception as e:
        print(f'Error: {e}')
    finally:
        server.quit()


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
        user_data = {'name': name, 'newContact': number, 'email': email, 'uid': user['localId']}
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
        response.headers.add('Access-Control-Allow-Origin', 'https://studylighthouse.netlify.app')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response, 200
    except Exception as e:
        return jsonify({"message": "Invalid email or password"}), 401

@app.route('/signin/google', methods=['GET'])
@cross_origin(origin='https://studylighthouse.netlify.app', headers=['Content-Type', 'Authorization'])
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
        user_data = {'name': name, 'email': email,'uid': str(uuid.uuid4())}
        db.collection('users').document(user_data['uid']).set(user_data)
        user = user_data

    session['user'] = user

    # Redirect to React app with user data as query parameters
    response = redirect(f"https://studylighthouse.netlify.app/google-redirect?name={user['name']}&email={user['email']}&uid={user['uid']}")
    response.headers.add('Access-Control-Allow-Origin', 'https://studylighthouse.netlify.app')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

@app.route('/forgot_password', methods=['POST'])
def forgot_password():
    email = request.get_json().get('email')
    print(email)
    try:
        user = firebase_admin.auth.get_user_by_email(email)
        if user:
            auth.send_password_reset_email(email)
            return jsonify({"message": "Password reset link sent to your email"}), 200
        else:
            return jsonify({"message": "User not found please signup"}), 200
    except Exception as e:
        print(e)
        return jsonify({"message": str(e)}), 400

@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('index'))

@app.route('/post_question', methods=['POST'])
@cross_origin(origin='https://studylighthouse.netlify.app', headers=['Content-Type', 'Authorization'], supports_credentials=True)
def post_question():
    try:
        user_json = request.form.get('user')
        if not user_json:
            return jsonify({"message": "User not authenticated"}), 401

        user = json.loads(user_json)
        question = request.form.get('question')
        file = request.files.get('image')

        if file and question:  # If both file and text question are provided
            file_id = str(uuid.uuid4())
            file_extension = os.path.splitext(file.filename)[1]
            file_path = f"doubts/{file_id}{file_extension}"  # Correct folder path

            # Initialize Firebase Storage
            storage_client = storage.bucket('study-lighthouse.appspot.com')  # Specify the bucket name

            # Upload the file to Firebase Storage
            blob = storage_client.blob(file_path)
            blob.upload_from_file(file)

            # Get the public URL of the uploaded file
            file_url = blob.public_url
            question_data = {
                'question_id': str(uuid.uuid4()),
                'question': question,
                'file_url': file_url,
                'filename': file.filename,
                'username': user['name'],
                'uid': user['uid'],
                'timestamp': firestore.SERVER_TIMESTAMP,
            }
        elif file:  # If only a file is provided
            file_id = str(uuid.uuid4())
            file_extension = os.path.splitext(file.filename)[1]
            file_path = f"doubts/{file_id}{file_extension}"  # Correct folder path

            # Initialize Firebase Storage
            storage_client = storage.bucket('study-lighthouse.appspot.com')  # Specify the bucket name

            # Upload the file to Firebase Storage
            blob = storage_client.blob(file_path)
            blob.upload_from_file(file)

            # Get the public URL of the uploaded file
            file_url = blob.public_url
            question_data = {
                'question_id': str(uuid.uuid4()),
                'question': "",
                'file_url': file_url,
                'filename': file.filename,
                'username': user['name'],
                'uid': user['uid'],
                'timestamp': firestore.SERVER_TIMESTAMP,
            }
        elif question:  # If only a text question is provided
            question_data = {
                'question_id': str(uuid.uuid4()),
                'question': question,
                'file_url': None,
                'filename': "",
                'username': user['name'],
                'uid': user['uid'],
                'timestamp': firestore.SERVER_TIMESTAMP,
            }
        else:
            return jsonify({"message": "Neither question nor file provided"}), 400
        
        question_ref = db.collection('questions').document(question_data['question_id'])  # Use the generated ID
        question_ref.set(question_data)  # Set the question data

        # Add the question to the user's posted questions
        user_ref = db.collection('users').document(user.get('uid'))
        user_ref.collection('posted_questions').document(question_data['question_id']).set(question_data)

        socketio.emit('new_question', question_data)
        users = db.collection('users').stream()
        recipients = [u.get('email') for u in users if u.get('email') and u.get('email')!=user.get('email')]
        send_email("New question alert",recipients, f"You got a new Qustion to solve from {question_data['username']}\nQuestion:\n{question_data['question']}")
        return jsonify({"message": "Question posted successfully"}), 201
    except Exception as e:
        print(f"Error in post_question: {str(e)}")
        return jsonify({"message": str(e)}), 500

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

def identify_code_snippets(response_text):
    # Regex pattern to identify code snippets
    code_pattern = re.compile(r'```(.*?)```', re.DOTALL)
    
    # Regex pattern to identify numbered points like 1. text
    numbered_points_pattern = re.compile(r'(\b\d+\.)\s(.*?)\n', re.DOTALL)

    parts = []
    last_pos = 0

    # Find code snippets
    for match in code_pattern.finditer(response_text):
        start, end = match.span()
        if last_pos < start:
            parts.append({"text": response_text[last_pos:start], "is_code": False})
        parts.append({"text": match.group(1).strip(), "is_code": True})
        last_pos = end
    
    # Find numbered points
    for match in numbered_points_pattern.finditer(response_text):
        start, end = match.span()
        if last_pos < start:
            parts.append({"text": response_text[last_pos:start], "is_code": False})
        parts.append({"text": match.group(1) + match.group(2).strip(), "is_code": False})
        last_pos = end

    if last_pos < len(response_text):
        parts.append({"text": response_text[last_pos:], "is_code": False})

    return parts

@app.route('/api/cohorequest_text', methods=['POST'])
def handle_cohorequest():
    data = request.json
    text = data.get('text', '')
    index = data.get('index')  # Get the index from the request

    if not text:
        return jsonify({'error': 'No text provided'}), 400

    response = co.generate(
        model='command',
        prompt=text,
        max_tokens=500,
        temperature=0.5
    )
    response_text = response.generations[0].text.strip()
    parts = identify_code_snippets(response_text)

    

    return jsonify({
        'response_text': response_text,
        'response_parts': parts
        
    })

@app.route('/api/cohorequest_audio', methods=['POST'])
def handle_cohorequest_audio():
    try:
        data = request.json
        text = data.get('text', '')
        index = data.get('index')

        if not text:
            return jsonify({'error': 'No text provided'}), 400

        response = co.generate(
            model='command',
            prompt=text,
            max_tokens=500,
            temperature=0.5
        )
        response_text = response.generations[0].text.strip()
        parts = identify_code_snippets(response_text)

        audio_filename = f'output_{index}.mp3'

        # Text-to-speech conversion
        tts_engine = pyttsx3.init()
        tts_engine.save_to_file(response_text, audio_filename)
        tts_engine.runAndWait()

        return jsonify({
            'response_text': response_text,
            'response_parts': parts,
            'audio': audio_filename
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/audio/<filename>', methods=['GET'])
def get_audio(filename):
    return send_file(filename, as_attachment=True)

@app.route('/delete_audio/<filename>',methods=['POST'])
def delete_audio(filename):
    try:
        os.remove(filename)
        return jsonify({'message':'succesful delete'}),200
    except Exception as e:
        print(e)
    return jsonify({'message':'no file'}),405
# @app.route('/api/cohorequest', methods=['POST'])
# def handle_cohorequest():
#     text = request.json.get('text', '')  # Access the text data from the request JSON payload
#     print(f"Received text: {text}")

#     if not text:
#         return jsonify({'error': 'No text provided'}), 400

#     # Call the cohere API and get the response
#     response = co.chat(message=f"Generate a clear and concise response for: {text}")
#     response_text = response.text  # Adjusted based on the cohere API response structure
#     print(f"LLM Response: {response_text}")
#     return jsonify({'response_text': response_text})

@app.route('/save_chat',methods=['POST'])
def save_chat():
    data = request.get_json()
    name=data.get('name')
    chat_msgs = data.get('chat')
    user = data.get('user')
    chat_id=str(uuid.uuid4())
    if user and 'uid' in user:
        db.collection('users').document(user.get('uid')).collection('chat_history').document(chat_id).set({'name':name,'chat_msgs':chat_msgs,'timestamp': firestore.SERVER_TIMESTAMP,'uid':chat_id})
        return jsonify({'message':"Chat saved successfully",'status':1}),200
    else:
        return jsonify({'message':"Chat saved unsuccessfull",'status':0}),404
    
@app.route('/get_saved_chats',methods=['POST'])
def get_saved_chats():
    data=request.get_json()
    user=data.get('cred')
    if user and 'uid' in user:
        docs=db.collection('users').document(user.get('uid')).collection('chat_history').order_by('timestamp', direction=firestore.Query.DESCENDING).stream()
        chats=[]
        for doc in docs:
            chat=doc.to_dict()
            chats.append(chat)
        return jsonify(chats),200
    else:
        return jsonify({'message':"invalid credentials"}),404

@app.route('/get_chat_messages',methods=['POST'])
def get_chat_messages():
    data = request.get_json()
    user = data.get('cred')
    chat_id = data.get('id')
    
    if user and 'uid' in user:
        print(chat_id)
        try:
            print(f"Fetching chat messages for chat ID: {chat_id}")
            doc = db.collection('users').document(user.get('uid')).collection('chat_history').document(chat_id).get()
            # print(doc)
            if doc.exists:
                # print(f"Chat document found: {doc.to_dict()}")
                return jsonify(doc.to_dict().get('chat_msgs')), 200
            else:
                print("Chat document not found")
                return jsonify({'message': "Chat not found"}), 404
        except Exception as e:
            print(f"Exception occurred: {e}")
            return jsonify({'message': "Error fetching chat messages"}), 500
    else:
        print("Invalid credentials or chat ID")
        return jsonify({'message': "Invalid credentials or chat ID"}), 400

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
@cross_origin(origin='https://studylighthouse.netlify.app', headers=['Content-Type', 'Authorization'], supports_credentials=True)
def post_solution():
    try:
        data = request.form.to_dict()
        user_json = data.get('user')
        if not user_json:
            return jsonify({"message": "User not authenticated"}), 401

        user = json.loads(user_json)
        question_id = data.get('questionId')
        
        question = data.get('question')
        UID = data.get('UID')
        solution_text = data.get('solution')
        
        file = request.files.get('file')
        print(1)
        if not solution_text and not file:
            return jsonify({"message": "No solution provided"}), 400

        solution_data = {
            'solution_id': str(uuid.uuid4()),
            'question': question,
            'questionId': question_id,
            'username': user['name'],
            'userId': user['uid'],
            'timestamp': firestore.SERVER_TIMESTAMP,
            'likes': 0
        }

        if solution_text and file:
            solution_data['solution'] = solution_text
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

            solution_data['file_url'] = file_url
            solution_data['filename'] = file.filename
        elif file:
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
            solution_data['solution'] = ''

            solution_data['file_url'] = file_url
            solution_data['filename'] = file.filename
        elif solution_text:
            solution_data['solution'] = solution_text
            solution_data['file_url'] = ''
            solution_data['filename'] = ''
        # Save solution data into Firestore
        question_ref = db.collection('questions').document(question_id)
        question_ref.collection('solutions').document(solution_data['solution_id']).set(solution_data)

        # Save solution data into user's document
        user_ref = db.collection('users').document(user.get('uid'))
        user_ref.collection('solutions').document(solution_data['solution_id']).set(solution_data)

        # Save solution data into the user who posted the question's document
        solution_user_ref = db.collection('users').document(UID)
        print(UID)
        solution_user_ref.collection('posted_questions').document(question_id).collection('solutions').document(solution_data['solution_id']).set(solution_data)
        print(solution_user_ref.get().to_dict())
        # Send email notification
        send_email(f"New solution for your Question ", solution_user_ref.get().to_dict()['email'], f'Your Question \n{question} \ngot a new solution \n please check it out')

        return jsonify({"message": "Solution posted successfully"}), 201
    except Exception as e:
        print(f"Error in post_solution: {str(e)}")
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
    print(question_id,solution_id)

    try:
        # Check if the user has already liked the solution
        user_id = data.get('userId')
        print(user_id)
        if not user_id:
            return jsonify({"message": "User not authenticated"}), 401

        solution_ref = db.collection('questions').document(question_id).collection('solutions').document(solution_id)
        solution = solution_ref.get().to_dict()
        print(solution)

        user_ref = db.collection('users').document(user_id).collection('posted_questions').document(question_id).collection('solutions').document(solution_id)
        user_ref_solution = user_ref.get().to_dict()
        # Check if the user has already liked the solution
        print(user_ref_solution)
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
        print(e)
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
    
@app.route('/update_profile/<field>', methods=['POST'])
def update_profile(field):
    data = request.form
    user = json.loads(data.get('user'))
    profile_image = request.files.get('profileImage')

    try:
        user_ref = db.collection('users').document(user.get('uid'))
        user_data = user_ref.get().to_dict()

        if not user_data:
            return jsonify({"message": "User not found"}), 404

        if field == 'profileImage' and profile_image:
            file_id = str(uuid.uuid4())
            file_extension = os.path.splitext(profile_image.filename)[1]
            file_path = f"profiles/{file_id}{file_extension}"

            storage_client = storage.bucket('study-lighthouse.appspot.com')
            blob = storage_client.blob(file_path)
            blob.upload_from_file(profile_image)

            profile_image_url = blob.public_url
            user_ref.update({'profileImage': profile_image_url})
            user_data['profileImage'] = profile_image_url
            return jsonify({"message": "Profile image updated successfully", "user": user_data}), 200

        if field in data:
            # Map newUsername to name in Firestore
            update_field = 'name' if field == 'newUsername' else field
            user_ref.update({update_field: data[field]})
            user_data[update_field] = data[field]
        


        return jsonify({"message": "Profile updated successfully", "user": user_data}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500
    
@app.route('/user_details', methods=['GET'])
def get_user_details():
    user_id = request.args.get('user_id')
    user_ref = db.collection('users').document(user_id)
    user_data = user_ref.get().to_dict()
    print(user_data)

    if not user_data:
        return jsonify({"message": "User not found"}), 404

    # Fetch user's posted solutions
    solutions_ref = user_ref.collection('solutions')
    user_solutions = [doc.to_dict() for doc in solutions_ref.stream()]

    # Calculate user's level based on solutions with at least 10 likes
    total_solutions_above_10_likes = sum(1 for solution in user_solutions if solution.get('likes', 0) >= 10)
    level = total_solutions_above_10_likes// 4 + 1  # Assuming each 10 likes increase the level by 1

    # Add user's level and posted solutions to user data
    user_data['level'] = level
    user_data['posted_solutions'] = user_solutions

    return jsonify({"user": user_data}), 200

@app.route('/others_details', methods=['GET'])
def get_others_details():
    user_id = request.args.get('user_id')
    user_ref = db.collection('users').document(user_id)
    user_data = user_ref.get().to_dict()
    print(user_data)

    if not user_data:
        return jsonify({"message": "User not found"}), 404

    # Fetch user's posted solutions
    solutions_ref = user_ref.collection('solutions')
    user_solutions = [doc.to_dict() for doc in solutions_ref.stream()]

    # Calculate user's level based on solutions with at least 10 likes
    total_solutions_above_10_likes = sum(1 for solution in user_solutions if solution.get('likes', 0) >= 10)
    level = total_solutions_above_10_likes// 4 + 1  # Assuming each 10 likes increase the level by 1

    # Add user's level and posted solutions to user data
    user_data['level'] = level
    user_data['posted_solutions'] = user_solutions
    return jsonify({"user": user_data}), 200

@app.route('/add_todo',methods=['POST'])
def add_todo():
    data = request.get_json()
    user = data.get('cred')
    todo=data.get('todo')
    print(user,todo)
    task_id=str(uuid.uuid4())
    if user and 'uid' in user:
        doc={
        'task':todo['task'],
        'start_date':todo['startOn'],
        'end_date':todo['endBy'],
        'id':task_id,
        'timestamp': firestore.SERVER_TIMESTAMP
        }
        db.collection('users').document(user.get('uid')).collection('toDos').document(task_id).set(doc)
        return jsonify({'message':"Task added succesfully"}),202
    else:
        return jsonify({'message':'invalid user credentials'}),404

@app.route('/get_todos',methods=['POST'])
def get_todos():
    data = request.get_json()
    user = data.get('cred')
    if user and 'uid' in user:
        docs= db.collection('users').document(user.get('uid')).collection('toDos').order_by('timestamp', direction=firestore.Query.DESCENDING).stream()
        todos=[]
        for doc in docs:
            task=doc.to_dict()
            todos.append(task)
        return jsonify(todos),200
    else:
        return jsonify({'message':"invalid credentials"}),404

@app.route('/update_todo', methods=['POST'])
def update_todo():
    data = request.get_json()
    user = data.get('cred')
    todo_id = data.get('id')
    updated_todo = data.get('todo')
    
    if user and 'uid' in user:
        doc_ref = db.collection('users').document(user.get('uid')).collection('toDos').document(todo_id)
        doc_ref.update({
            'task': updated_todo['task'],
            'start_date': updated_todo['startOn'],
            'end_date': updated_todo['endBy']
        })
        return jsonify({'message': "Task updated successfully"}), 200
    else:
        return jsonify({'message': 'Invalid user credentials'}), 404

@app.route('/delete_todo', methods=['POST'])
def delete_todo():
    data = request.get_json()
    user = data.get('cred')
    todo_id = data.get('id')
    
    if user and 'uid' in user:
        db.collection('users').document(user.get('uid')).collection('toDos').document(todo_id).delete()
        return jsonify({'message': "Task deleted successfully"}), 200
    else:
        return jsonify({'message': 'Invalid user credentials'}), 404
    
@app.route('/get_solution', methods=['GET'])
def get_solution():
    user_id = request.args.get('user_id')
    solution_id = request.args.get('solution_id')

    try:
        solution_ref = db.collection('users').document(user_id).collection('solutions').document(solution_id).get()
        solution_data = solution_ref.to_dict()

        if solution_data:
            question_id = solution_data.get('questionId')
            question_ref = db.collection('questions').document(question_id).get()
            question_data = question_ref.to_dict()
            print(solution_data, question_data)
            return jsonify({
                'solution': solution_data,
                'question': question_data
            })
        else:
            return jsonify({'error': 'Solution not found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/postQuery',methods=['POST'])
def postQuery():
    data = request.json
    query = data.get('query')
    print(query)
    uid=str(uuid.uuid4())
    db.collection("userQueries").document(uid).set({'query':query,'uid':uid,'timeStamp':firestore.SERVER_TIMESTAMP})
    return jsonify({'message':'query posted ssuccessfully'})


@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

if __name__ == '__main__':
    socketio.run(app, debug=True, port=5000)
