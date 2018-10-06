from django.contrib.auth.models import User
from django.test import TestCase
from unittest.mock import MagicMock
from image.models import Image
from image.repository import ImageRepositoryImpl
from image.service import ImageService
from portfolio.profile.domain.Profile import Profile


class ImageServiceTest(TestCase):
    def setUp(self):
        self.image_json = {
            "title": 'Judith Beheading Holofernes',
            "medium": 'Oil Painting',
            "description": 'A horrific painting',
            "date_created": '1598',
            "user": 'joe bloggs'
        }

        self.user = User(username=self.image_json["user"])
        self.user.save()

    def test_when_image_is_created_user_exists_is_called(self):
        repo = ImageRepositoryImpl()
        repo.create = MagicMock()
        repo.user_exists = MagicMock(return_value=True)
        service = ImageService(data=self.image_json, context={"repo": repo})
        service.is_valid()
        service.create_image()
        repo.user_exists.assert_called_once_with(self.image_json["user"])

    def test_when_user_not_found_return_None(self):
        repo = ImageRepositoryImpl()
        repo.create = MagicMock()
        repo.user_exists = MagicMock(return_value=False)
        service = ImageService(data=self.image_json, context={"repo": repo})
        service.is_valid()
        image = service.create_image()
        self.assertIsNone(image)

    def test_when_image_is_created_repos_create_is_called(self):
        repo = ImageRepositoryImpl()
        repo.create = MagicMock()
        repo.user_exists = MagicMock(return_value=True)
        service = ImageService(data=self.image_json, context={"repo": repo})
        service.is_valid()
        service.create_image()
        repo.create.assert_called()

    def test_when_image_is_created_object_is_returned(self):
        repo = ImageRepositoryImpl()
        repo.create = MagicMock()
        repo.user_exists = MagicMock(return_value=True)
        service = ImageService(data=self.image_json, context={"repo": repo})
        service.is_valid()
        created_image = service.create_image()
        self.assertEquals(created_image.user.username, self.image_json["user"])
        self.assertEquals(created_image.title, self.image_json["title"])
