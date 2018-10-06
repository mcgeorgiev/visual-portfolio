from rest_framework import serializers

from image.models import Image

class ImageService(serializers.ModelSerializer):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.repo = self.context.get("repo")

    class Meta:
        model = Image
        fields = ('title', 'medium', 'description', 'date_created', 'user')

    def create_image(self):
        user = self.validated_data["user"]
        if self.repo.user_exists(user.username):
            self.repo.create()
            return Image(**self.validated_data)
        else:
            return None
