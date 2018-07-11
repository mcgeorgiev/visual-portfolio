from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserProfile


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('email', 'password')

    def create(self):
        user = User.objects.create_user(email='jlennon@beatles.com',
                                        password='glass onion')
        user.save()
        return user

    # def create(self, validated_data):
    #     return Comment.objects.create(**validated_data)
