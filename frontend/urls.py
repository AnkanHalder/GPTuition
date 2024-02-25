from django.urls import path
from .views import index

urlpatterns = [
    path('',index),
    path('selfstudy',index),
    path('selfstudy/take_quiz',index),
    path('selfstudy/take_quiz/<str:poll_id>',index),
    path('queryPDF',index),
    path('generateNotes',index),
    path('freeResources',index),
    path('login',index),
]