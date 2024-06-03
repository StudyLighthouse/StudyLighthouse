import firebase_admin
from firebase_admin import credentials, firestore

# Path to your service account key JSON file
SERVICE_ACCOUNT_KEY_PATH = "./key.json"

# Initialize Firebase Admin SDK
cred = credentials.Certificate(SERVICE_ACCOUNT_KEY_PATH)
firebase_admin.initialize_app(cred)

# Export Firestore client
db = firestore.client()

# Export initialized Firebase Admin SDK instance for reuse in other modules
admin = firebase_admin
