# accounts/serializers.py

from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework.serializers import ValidationError

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

class EditUserSerializer(UserSerializer):
    def validate(self, data):
        if hasattr(self, 'initial_data'):
            allowed_edits = set(['username', 'email', 'password', 'country_code', 'guild'])
            init_data_set = set(self.initial_data.keys())
            forbidden_edits = init_data_set - allowed_edits
            unknown_keys = init_data_set - set(self.fields.keys())
            if unknown_keys or forbidden_edits:
                err_msg = self._validation_error_mesage(forbidden_edits, unknown_keys)
                raise ValidationError(err_msg, code='invalid')
        return data

    def _validation_error_mesage(self, forbidden_edits, unknown_keys):
        validation_error = {}
        for edit in forbidden_edits:
            validation_error[edit] = 'This field cannot be edited.'
        for key in unknown_keys:
            validation_error[key] = 'Unknown field.'
        return {'error': validation_error}

    class Meta:
        model = RoshamboUser
        exclude = ('id',)
