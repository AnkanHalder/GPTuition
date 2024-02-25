from django.db import models
from django.contrib.auth.models import AbstractUser

class User(models.Model):
    name = models.CharField(max_length=255)
    password = models.CharField(max_length=128)
    email = models.EmailField(max_length=254, unique=True)
    classrooms = models.ManyToManyField('Classroom', blank=True)

class Classroom(models.Model):
    """Classroom model.

    Fields:
        - name: CharField for classroom name (required)
        - password: CharField for classroom access (optional)
        - admin: ForeignKey to User model, referring to the classroom admin
        - subject: CharField for classroom subject (required)
        - quizzes: ManyToManyField to Quiz model
    """

    name = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=128)
    admin = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_classrooms')
    subject = models.CharField(max_length=255)
    quizz_array = models.ManyToManyField('Quiz')

class Quiz(models.Model):

    topic = models.CharField(max_length=255)
    date = models.DateField()
    classroom_id = models.ForeignKey(Classroom, on_delete=models.CASCADE, related_name='quizzes' , blank=True)
    quiz_data = models.JSONField()

    def __str__(self):
        return f"{self.topic} - {self.classroom.name}"
