from django.contrib.auth.models import User
from django.test import TestCase
from hashids import Hashids

from image.models import Image

class ImageTest(TestCase):

    def setUp(self):
        EMAIL = "example@example.com"
        PASSWORD = "secret-password"

        self.user = User(username=EMAIL, email=EMAIL, password=PASSWORD)
        self.user.save()

    def test_image_generates_uuid(self):
        image = Image(user=self.user)
        image.save()
        self.assertEqual(Hashids().decode(image.resource_id)[0], image.id)

    def test_image_sets_upload_time(self):
        image = Image()
        self.assertIsNotNone(image.upload_time)

    def test_image_created_with_user(self):
        image = Image(user=self.user)
        self.assertEqual(image.user, self.user)

    def test_image_is_queryable_from_user(self):
        image = Image(user=self.user)
        image.save()

        self.assertEqual(Image.objects.all().filter(user=self.user).count(), 1)

    def test_image_is_queryable_from_user_by_username(self):
        image = Image(title="The Annunciation", user=self.user)
        image.save()

        self.assertEqual(Image.objects.all().filter(user=self.user.username)[0].title, "The Annunciation")
        self.assertEqual(Image.objects.all().filter(user=self.user.username).count(), 1)

