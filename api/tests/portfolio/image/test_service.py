from django.contrib.auth.models import User
from django.test import TestCase
from unittest.mock import MagicMock
from image.repository import ImageRepositoryImpl
from image.service import ImageService


class ImageServiceTest(TestCase):
    def setUp(self):
        self.image_data = {
            "title": 'Judith Beheading Holofernes',
            "medium": 'Oil Painting',
            "description": 'A horrific painting',
            "date_created": '1598',
            "user": User(username="joe bloggs")
        }

    def test_when_image_is_created_user_exists_is_called(self):
        repo = ImageRepositoryImpl()
        repo.create = MagicMock()
        repo.user_exists = MagicMock(return_value=True)
        service = ImageService(repo)
        service.create(self.image_data)
        repo.user_exists.assert_called_once_with(self.image_data["user"].username)

    def test_when_user_not_found_return_None(self):
        repo = ImageRepositoryImpl()
        repo.create = MagicMock()
        repo.user_exists = MagicMock(return_value=False)
        service = ImageService(repo)
        image = service.create(self.image_data)
        self.assertIsNone(image)

    def test_when_image_is_created_repos_create_is_called(self):
        repo = ImageRepositoryImpl()
        repo.create = MagicMock()
        repo.user_exists = MagicMock(return_value=True)
        service = ImageService(repo)
        service.create(self.image_data)
        repo.create.assert_called()

    def test_when_image_is_created_object_is_returned(self):
        repo = ImageRepositoryImpl()
        repo.create = MagicMock()
        repo.user_exists = MagicMock(return_value=True)
        service = ImageService(repo)
        created_image = service.create(self.image_data)
        self.assertEquals(created_image.user.username, self.image_data["user"].username)
        self.assertEquals(created_image.title, self.image_data["title"])
