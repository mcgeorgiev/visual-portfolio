from django.contrib.auth.models import User

from image.models import ImageRepository


class ImageRepositoryImpl(ImageRepository):
    def user_exists(self, id_):
        return User.objects.get(username=id_)

    def create(self, image):
        return image.save()

