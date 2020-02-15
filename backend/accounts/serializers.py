# accounts/serializers.py

from rest_framework import serializers
from rest_framework.fields import empty
from rest_framework.validators import UniqueValidator

from .models import RoshamboUser, Skins, SkinsInventory
from .utils import check_for_edit_validation_errors


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
            provided_fields = set(self.initial_data.keys())
            defined_fields = set(self.fields.keys())
            check_for_edit_validation_errors(defined_fields, allowed_edits, provided_fields)
        return data

    class Meta:
        model = RoshamboUser
        exclude = ('id',)

class SkinsInventorySerializer(serializers.ModelSerializer):
    skin = serializers.IntegerField(required=True)

    class Meta:
        model = SkinsInventory
        fields = ('skin',)


class SkinsSerializer(serializers.ModelSerializer):
    active_skin = SkinsInventorySerializer()
    purchased_skins = SkinsInventorySerializer(many=True)

    class Meta:
        model = Skins
        fields = ('active_skin', 'purchased_skins')
