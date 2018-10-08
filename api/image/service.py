from rest_framework import serializers

from image.models import Image

# class ImageService(serializers.ModelSerializer):
#     def __init__(self, **kwargs):
#         super().__init__(**kwargs)
#         self.repo = self.context.get("repo")
#
#     class Meta:
#         model = Image
#         fields = ('title', 'medium', 'description', 'date_created', 'user')
#
#     def create_image(self):
#         user = self.validated_data["user"]
#         if self.repo.user_exists(user.username):
#             self.repo.create()
#             return Image(**self.validated_data)
#         else:
#             return None


class ImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Image
        fields = ('title', 'medium', 'description', 'date_created', 'user')


class ImageService:
    def __init__(self, repo):
        self.repo = repo

    def create(self, validated_data):
        # serializer = ImageSerializer(data=validated_data)
        # serializer.is_valid()
        # validated_data = serializer.validated_data
        user = validated_data["user"]

        if self.repo.user_exists(user.username):
            self.repo.create()
            return Image(**validated_data)
        else:
            return None