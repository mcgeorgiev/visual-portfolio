from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Profile


class UserService(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'password')

    def create(self, validated_data):
        if User().__class__.objects.filter(email=validated_data["email"]).exists():
            return False

        return User().__class__.objects.create_user(
            username=validated_data["email"],
            email=validated_data["email"],
            password=validated_data["password"])


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

        return Profile().__class__.objects.create(full_name=validated_data["full_name"], user=user)
