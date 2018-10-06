from django.contrib.auth.models import User
from django.test import TestCase

from image.models import Image
from image.repository import ImageRepositoryImpl
from portfolio.profile.domain.Profile import Profile


class ImageRepoTest(TestCase):

    def test_created_image_is_saved(self):

        user = User()
        user.save()

        image = Image()

        image.title = 'Judith Beheading Holofernes'
        image.medium = 'Oil Painting'
        image.description = 'A horrific painting'
        image.date = '1598'
        image.user = user

        ImageRepositoryImpl().create(image)

        created_images = Image.objects.all()
        self.assertEqual(created_images.count(), 1)

    def test_user_exists(self):
        user = User(username="joe bloggs")
        user.save()

        self.assertIsNotNone(ImageRepositoryImpl().user_exists(user.username))




