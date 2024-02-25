import pyrebase
import json

config = {
    'apiKey': "AIzaSyBdoW5kiB6Cc57Q_aPdkr0FpslqyPfA-NE",
    'authDomain': "gptuition-f642d.firebaseapp.com",
    'projectId': "gptuition-f642d",
    "databaseURL": "https://gptuition-f642d-default-rtdb.firebaseio.com",
    'storageBucket': "gptuition-f642d.appspot.com",
    'messagingSenderId': "1019435120216",
    'appId': "1:1019435120216:web:ad9c5d392c4888ca4e3c2d"
}

firebase = pyrebase.initialize_app(config)

class FirebaseController:
    def __init__(self):
        self.auth = firebase.auth()
        self.db = firebase.database()
    def saveQuiz(self,data):
        saved_quiz_id = self.db.child("quiz").push(data)['name']
        saved_quiz = self.db.child("quiz").child(saved_quiz_id).get().val()
        if(saved_quiz):
            return {
                "id" : saved_quiz_id,
                "topicName" : saved_quiz["name"],
                "quiz" : json.loads(saved_quiz["quiz"]),
                'numOfAttempts' : saved_quiz["numOfAttempts"],
                "avgScore" : saved_quiz["avgScore"]
            }
    def submitQuiz(self,quiz_id,score):
        quiz_data = self.db.child("quiz").child(quiz_id).get().val()
        if not quiz_data:
            return None
        existing_num_attempts = quiz_data.get("numOfAttempts", 0)
        existing_avg_score = quiz_data.get("avgScore", 0)
        new_num_attempts = existing_num_attempts + 1
        new_avg_score = ((existing_avg_score * existing_num_attempts) + score) / new_num_attempts
        updated_quiz_data = {
            "numOfAttempts": new_num_attempts,
            "avgScore": new_avg_score,
        }
        self.db.child("quiz").child(quiz_id).update(updated_quiz_data)
        updated_quiz_data = self.db.child("quiz").child(quiz_id).get().val()
        print(updated_quiz_data)
        return updated_quiz_data
    
    def getQuiz(self,quiz_id):
        print("Received:",quiz_id)
        try:
            quiz_ref = self.db.child("quiz").child(quiz_id)
            quiz_data = quiz_ref.get().val()
            if(quiz_data):
                return {"success": True, "data": quiz_data, "error": None}
            else:
                return {"success": False, "data": quiz_data, "error": None}
        except Exception as e:
            return {"success": False, "data": quiz_data, "error": e}


    def get_top_quizzes(self, limit=10, order_by="numOfAttempts"):
        try:
            ordered_query = self.db.child("quiz").order_by_child(order_by).limit_to_last(int(limit))

            data = ordered_query.get().val()
            ans = []
            if(data):
                for key in data.keys():
                    ans.append({
                        "id" : key,
                        "topicName" : data[key]["name"],
                        "quiz" : json.loads(data[key]["quiz"]),
                        'numOfAttempts' : data[key]["numOfAttempts"],
                        "avgScore" : data[key]["avgScore"]
                    })
            return ans

        except Exception as e:
            return {"success": False, "data": None, "error": str(e)}

    def sign_up(self, name, email,member_of, password):
        try:
            user = self.auth.create_user_with_email_and_password(email, password)
            print(user)
            user_id = user['localId']
            data = {
                "name": name,
                "email": email,
                "id" : user_id,
                "member_of" : member_of
            }
            self.db.child("users").child(user_id).set(data)
            user_data = self.db.child("users").child(user_id).get().val()
            print("User created successfully! Your user ID is", user_id)
            return {'success': True , 'data': user_data , 'message': 'User Registered successfully' , 'error': None}
        except Exception as e:
            print("Sign-up failed:", e)
            return {'success': False , 'data': None , 'error': json.loads(e.args[1])['error'] ,'message': 'Invalid Credentials. Check Mail Id or Increase Password Strength'}

    def login(self, email, password):
        try:
            user = self.auth.sign_in_with_email_and_password(email, password)
            if not user or ('code' in user and user['code'] == 400 ):
                print("Login failed:", json.loads(e.args[1])['error'])
                return {'success': False , 'data': None , 'error': json.loads(e.args[1])['error'] ,'message': 'Invalid Credentials.'}
            local_id = user['localId']
            user_data = self.db.child("users").child(local_id).get().val()
            print(user_data)
            return {'success': True , 'data': user_data , 'message': 'User Logged In successfully' , 'error': None}
        except Exception as e:
            print("Login failed:", json.loads(e.args[1])['error'])
            return {'success': False , 'data': None , 'error': json.loads(e.args[1])['error'] ,'message': 'Invalid Credentials.'}

    def createCommunity(self,data):
        try:
            
            community_id = self.db.child("communities").push(data)['name']
            community_data = self.db.child("communities").child(community_id).get().val()

            adminId = data['adminId']
            user_data = self.db.child("users").child(adminId).get().val()
            current_communities = user_data.get("member_of", [])

            if isinstance(current_communities, str):
                current_communities = json.loads(current_communities)

            current_communities.append(community_id)
            updated_member_of = json.dumps(current_communities)
            self.db.child("users").child(adminId).update({"member_of": updated_member_of})

            return {'success': True, 'data': community_data, 'error': None}
        except Exception as e:
            print(e)
            return {'success': False, 'data': None, 'error': str(e)}
    
    def getCommunityData(self, community_ids):
        try:
            # Initialize an empty list to store community data
            community_data_list = []

            # Iterate through each community ID
            for community_id in community_ids:
                # Get the data for the current community ID
                data = self.db.child("communities").child(community_id).get().val()

                # Append the data to the list
                community_data_list.append(data)

            # Return the list of community data
            return {'success': True, 'data': community_data_list, 'error': None}

        except Exception as e:
            print(e)
            return {'success': False, 'data': None, 'error': str(e)}


