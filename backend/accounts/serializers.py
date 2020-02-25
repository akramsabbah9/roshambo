# accounts/serializers.py

from rest_framework import serializers
from rest_framework.fields import empty
from rest_framework.validators import UniqueValidator

from .models import RoshamboUser, Skins, SkinsInventory, Stats, Wallet
from .utils import check_for_edit_validation_errors


class UserSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(max_length=30, required=True),
    last_name = serializers.CharField(max_length=150, required=True),
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
        print(validated_data)
        if validated_data.get('country_code'):
            user = RoshamboUser.objects.create_user(validated_data['username'], validated_data['email'],
                validated_data['password'], validated_data['first_name'], validated_data['last_name'], validated_data['country_code'])
        else:
            user = RoshamboUser.objects.create_user(validated_data['username'], validated_data['email'],
                validated_data['password'], validated_data['first_name'], validated_data['last_name'])
        return user

    class Meta:
        model = RoshamboUser
        fields = ('id', 'username', 'email', 'password', 'country_code', 'guild', 'first_name', 'last_name')

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


class WalletSerializer(serializers.ModelSerializer):
    def validate(self, data):
        if hasattr(self, 'initial_data'):
            allowed_edits = set(['cash'])
            provided_fields = set(self.initial_data.keys())
            defined_fields = set(self.fields.keys())
            check_for_edit_validation_errors(defined_fields, allowed_edits, provided_fields)
        return data

    cash = serializers.IntegerField()

    class Meta:
        model = Wallet
        exclude = ('user',)


class StatsSerializer(serializers.ModelSerializer):
    def validate(self, data):
        if hasattr(self, 'initial_data'):
            allowed_edits = set(['games_won', 'games_lost'])
            provided_fields = set(self.initial_data.keys())
            defined_fields = set(self.fields.keys())
            check_for_edit_validation_errors(defined_fields, allowed_edits, provided_fields)
        return data

    games_won = serializers.IntegerField()
    games_lost = serializers.IntegerField()

    class Meta:
        model = Stats
        exclude = ('user',)


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
