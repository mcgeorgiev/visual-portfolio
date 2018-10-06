from django.contrib.auth.models import User
from django.test import TestCase
from hashids import Hashids

from portfolio.profile.infrastructure.ProfileRepoImpl import UserRepositoryImpl


class UserRepositoryTest(TestCase):

    def setUp(self):
        self.hashids = Hashids()
        self.EMAIL = "example@example.com"
        self.PASSWORD = "secret-password"

    def test_user_is_created(self):

        UserRepositoryImpl().create(email=self.EMAIL, password=self.PASSWORD)

        users = User.objects.all()
        self.assertEqual(users.count(), 1)


    def test_user_is_created_with_resource_id_from_id(self):

        UserRepositoryImpl().create(email=self.EMAIL, password=self.PASSWORD)

        user = User.objects.get(email=self.EMAIL)
        self.assertEqual(self.hashids.decode(user.username)[0], user.id)


    def test_user_exists_when_exists(self):
        self.assertFalse(UserRepositoryImpl().user_exists(email=self.EMAIL))

        user = User(username=self.EMAIL, email=self.EMAIL, password=self.PASSWORD)
        user.save()

        self.assertTrue(UserRepositoryImpl().user_exists(email=self.EMAIL))
