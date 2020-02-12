# accounts/serializers.py

from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import RoshamboUser


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=RoshamboUser.objects.all())]
    )
    username = serializers.CharField(
        required=True,
        max_length=32,
        validators=[UniqueValidator(queryset=RoshamboUser.objects.all())]
    )
    password = serializers.CharField(
        required=True,
        min_length=8, 
        write_only=True
    )
    country_code = serializers.IntegerField(required=False)
    guild = serializers.CharField(max_length=30, required=False)

    def create(self, validated_data):
        if validated_data.get('country_code'):
            user = RoshamboUser.objects.create_user(validated_data['username'], validated_data['email'],
                validated_data['password'], validated_data['country_code'])
        else:
            user = RoshamboUser.objects.create_user(validated_data['username'], validated_data['email'],
                validated_data['password'])
        return user

    class Meta:
        model = RoshamboUser
        fields = ('id', 'username', 'email', 'password', 'country_code', 'guild')
