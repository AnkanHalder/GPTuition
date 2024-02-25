from django.urls import path
from .views import UserView, \
    GenerateQuizView,\
    GeneratQuizResultPDF,\
    index,GenerateNote,\
    GenerateNotePDF, GetTopQuizs,SubmitQuizView,SignUpUserView,LoginUserView,CreateClassroomView,GetCommunityData,\
    GetQuiz
urlpatterns = [
    path('', UserView.as_view()),
    path('generate_quiz', GenerateQuizView.as_view()),
    path('generate_quiz_result', GeneratQuizResultPDF.as_view()),
    path('test', index ),
    path('generate_note', GenerateNote.as_view()),
    path('generate_note_pdf', GenerateNotePDF.as_view()),
    path('get_top_quizzes', GetTopQuizs.as_view()),
    path('get_quiz',GetQuiz.as_view()),
    path('submit_quiz', SubmitQuizView.as_view()),
    path('signup',SignUpUserView.as_view()),
    path('login',LoginUserView.as_view()),
    path('create_classroom',CreateClassroomView.as_view()),
    path('get_communities',GetCommunityData.as_view()),
]
