from rest_framework_simplejwt.tokens import Token
from .models import User, Profile
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from django.db import IntegrityError


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

# Define a serializer class for obtaining JWT token with additional user information
class UserTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        # Retrieve the token using the parent class method
        token = super().get_token(user)

        # Add additional user information to the token
        token['full_name'] = user.profile.full_name
        token['username'] = user.username
        token['email'] = user.email
        token['bio'] = user.profile.bio
        token['image'] = str(user.profile.image)
        token['verified'] = user.profile.verified

        return token
    
# Define a serializer class for user registration
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'password2']

    # also done with in frontend
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({'Password': 'Password field does not match'})
        return attrs
    
    # Create a new user with validated data
    def create(self, validated_data):
        try:
            user = User.objects.create_user(
                username=validated_data['username'],
                email=validated_data['email'],
                password=validated_data['password']
            )
        except IntegrityError as e:
            if 'unique constraint' in str(e):
                raise serializers.ValidationError({'email': 'User with this email already exists'})
            else:
                raise serializers.ValidationError({'non_field_errors': str(e)})
        return user
