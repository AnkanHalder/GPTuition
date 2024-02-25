import json
from django.http import HttpResponse
import requests
from django.shortcuts import render
from rest_framework import generics
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from .serializer import UserSignUpSerializer, UserLoginSerializer
from .models import User;
from rest_framework.views import APIView
from rest_framework.response import Response
import google.generativeai as genai
from .chatbot.agent import PromptAgent
from io import BytesIO
from django.template.loader import get_template
from django.views import View
from xhtml2pdf import pisa
import os
from dotenv import load_dotenv
from .firebase_auth import FirebaseController

load_dotenv()
firebase_controller = FirebaseController()


def index(request, *args, **kwargs):
    return render(request, "api/QuizResultsPDF.html")


def render_to_pdf(template_src, context_dict={}):
    template = get_template(template_src)
    html = template.render(context_dict)
    result = BytesIO()
    try:
        pdf = pisa.pisaDocument(BytesIO(html.encode("ISO-8859-1")), result)
    except Exception as e:
        print("Error during PDF generation:", e)
    if not pdf.err:
        return HttpResponse(result.getvalue(), content_type="application/pdf")
    else:
        print("PDF STILL HASS ERROR")
    return None


apiKey = os.environ.get('GEMINI_API_KEY')
genai.configure(api_key=apiKey)


# Create your views here.
class UserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSignUpSerializer


class GenerateQuizView(APIView):
    def post(self, request, format=None):
        topic_name = request.data.get('topicName')
        if not topic_name:
            return Response({'error': 'Missing topic name'}, status=HTTP_400_BAD_REQUEST)
        # Useing Gemini API or other method to generate questions
        try:
            model = genai.GenerativeModel('models/gemini-pro')
            response = model.generate_content(PromptAgent.getQuizPrompt(topic_name))
            quiz_data = response.text
            print(type(quiz_data))
            saved_quiz = firebase_controller.saveQuiz({
                'name': topic_name,
                'quiz': quiz_data,
                'numOfAttempts': 0,
                'avgScore': 0,
            })
            return Response({"success": True, "data": saved_quiz}, status=HTTP_200_OK)
        except requests.exceptions.RequestException as e:
            return Response({"success": False, 'error': f'Failed to generate quiz: {str(e)}'},
                            status=HTTP_400_BAD_REQUEST)


class GeneratQuizResultPDF(APIView):
    def post(self, request, format=None):
        try:
            json_data = json.loads(request.body)
            print("\n\nJSON data:\n\n", json_data)
            questions = []  # Store processed questions

            for question in json_data['quizData']:
                questions.append({
                    'number': question['QuestionNumber'],
                    'text': question['Question'],
                    'options': {'A': question['A'], 'B': question['B'], 'C': question['C'], 'D': question['D']},
                    'correct_answer': question['CorrectAnswer'],
                    'explanation': question['Explanation'],
                })
            processed_data = zip(questions, json_data['selectedOptions'])
            context = {'processed_data': processed_data, }
            pdf = render_to_pdf("api/QuizResultsPDF.html", context)
            return HttpResponse(pdf, content_type='application/pdf')
        except Exception as e:
            print("Error Occured in GEnerate quiz", e)
            return HttpResponse("this is quizData: " + "Error")


class GenerateNote(APIView):
    def post(self, request, format=None):
        topic_name = request.data.get('topicName')
        try:
            model = genai.GenerativeModel('models/gemini-pro')
            response = model.generate_content(PromptAgent.getNotePrompt(topic_name))
            note_data = response.text
        except requests.exceptions.RequestException as e:
            return Response({'error': f'Failed to generate quiz: {str(e)}'}, status=HTTP_400_BAD_REQUEST)

        return Response(note_data, status=HTTP_200_OK)


class GenerateNotePDF(APIView):
    def post(self, request, format=None):
        try:
            pdf = render_to_pdf('api/NotePDF.html', {
                'note_name': request.data.get('noteName'),
                'conversations': request.data.get('conversations')
            })
            return HttpResponse(pdf, content_type='application/pdf')
        except Exception as e:
            print("Error Occured in Note Pdf Generation :", e)
            return HttpResponse("<h1>An Error Occurred: " + str(e) + "</h1>")


class GetTopQuizs(APIView):
    def get(self, request):
        res = firebase_controller.get_top_quizzes()
        return Response(res, status=HTTP_200_OK)


class SubmitQuizView(APIView):
    def post(self, request, format=None):
        print(request.data)
        return Response(firebase_controller.submitQuiz(
            quiz_id=request.data.get('quiz_id'),
            score=request.data.get('score')
        ))

# class PreparePDF(APIView):
#     def post(self,request, format=None):
#         print("request: ",request.FILES['file'])
#         pdf_file = request.FILES['file']
#         dr = DocReader(pdf_file)
#         raw_text = dr.get_pdf_text()
#         text_chunks = dr.get_text_chunks(raw_text)
#         dr.get_vector_store(text_chunks)
#         res = dr.user_input(" What are Pandas ", text_chunks)
#         return Response({'success': True, 'message': res})


class SignUpUserView(APIView):
    def post(self, request, format=None):
        print(request.data)
        name = request.data.get('name')
        email = request.data.get('email')
        password = request.data.get('password')
        res = firebase_controller.sign_up(name=name, member_of=json.dumps([]) ,email=email, password=password)
        return Response(res, status=HTTP_200_OK)


class LoginUserView(APIView):
    def post(self, request, format=None):
        print(request.data)
        email = request.data.get('email')
        password = request.data.get('password')
        res = firebase_controller.login(email=email, password=password)
        return Response(res, status=HTTP_200_OK)

class GetQuiz(APIView):
    def post(self, request, format=None):
        print(request.data.get('id'))
        quiz_id = request.data.get('id')
        res = firebase_controller.getQuiz(quiz_id)
        return Response(res, status=HTTP_200_OK)

class CreateClassroomView(APIView):
    def post(self, request, format=None):
        print(request.data)
        name = request.data.get('name')
        subject = request.data.get('subject')
        adminId = request.data.get('adminId')
        tags = request.data.get('tags')
        desc = request.data.get('desc')
        data = {
            "name": name,
            "subject": subject,
            "adminId": adminId,
            "tags": tags,
            "desc": desc,
            "numOfMembers": 1,
        }
        print(data)
        res = firebase_controller.createCommunity(data)
        return Response(res, status=HTTP_200_OK)


class GetCommunityData(APIView):
    def post(self, request,format=None):
        print(request.data)
        classIds = request.data
        res = firebase_controller.getCommunityData(classIds)
        return Response(res, status=HTTP_200_OK)









