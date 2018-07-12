from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Profile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'password')


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(allow_null=False, required=True, write_only=True)
    full_name = serializers.CharField()

    class Meta:
        model = Profile
        fields = ('full_name', 'user')

    def create(self, data):
        user_data = data.pop('user')
        user = UserSerializer.create(UserSerializer(), user_data)
        profile = Profile().__class__.objects.create(full_name=data["full_name"], user=user)
        return profile
