from django.contrib.auth.models import User
from rest_framework import serializers

from portfolio.repositories import UserRepositoryImpl, ProfileRepositoryImpl
from .models import Profile

user_repository = UserRepositoryImpl()
user_profile_repository = ProfileRepositoryImpl()

class UserService(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'password')

    def create(self, validated_data):
        if user_repository.user_exists(validated_data["email"]):
            return False

        return user_repository.create(validated_data["email"], validated_data["password"])


class ProfileService(serializers.ModelSerializer):
    user = UserService(allow_null=False, required=True, write_only=True)
    full_name = serializers.CharField()

    class Meta:
        model = Profile
        fields = ('full_name', 'user')

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = UserService.create(UserService(), user_data)
        if not user:
            return False

        return user_profile_repository.create(validated_data["full_name"], user)
