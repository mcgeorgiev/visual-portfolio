from rest_framework import serializers

from image.models import Image


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('title', 'medium', 'description', 'date_created', 'user')


class ImageService:
    def __init__(self, repo):
        self.repo = repo

    def create(self, validated_data):
        user = validated_data["user"]

        if self.repo.user_exists(user.username):
            self.repo.create()
            return Image(**validated_data)
        else:
            return None
