from rest_framework import serializers
from .models import User
from rest_registration.api.serializers import DefaultRegisterUserSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'username', 'password')

class RegisterUserSerializer(DefaultRegisterUserSerializer):
    email = serializers.EmailField(required=True)

    def validate_username(self, username):
        if len(username) <= 3:
            raise serializers.ValidationError(
                "Username must be more than 3 characters long"
            )
        return username