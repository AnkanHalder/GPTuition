from rest_framework import serializers
from .models import User,Quiz

class UserSignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('name', 'password', 'email')
class UserLoginSerializer(serializers.Serializer):  # Use Serializer instead of ModelSerializer
    email = serializers.EmailField(max_length=255)
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        try:
            user = User.objects.get(email=email,password=password)  # Retrieve user by email
            print(user)
            print(user.email)
            print(user.password)
            print(user.name)
        except User.DoesNotExist:
            raise serializers.ValidationError({'Error': 'Invalid email or password.'})
        return user  # Return validated data

class CreateQuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ()