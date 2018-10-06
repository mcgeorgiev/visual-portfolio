from django.contrib.auth.models import User
from django.test import TestCase

from portfolio.profile.domain.Profile import Profile
from portfolio.profile.infrastructure.ProfileRepoImpl import ProfileRepositoryImpl


class ProfileRepositoryTest(TestCase):

    def setUp(self):
        self.FULL_NAME = "joe bloggs"
        self.EMAIL = "example@example.com"
        self.PASSWORD = "secret-password"

    def test_profile_is_created(self):
        user = User(username=self.EMAIL, email=self.EMAIL, password=self.PASSWORD)
        user.save()

        ProfileRepositoryImpl().create(full_name=self.FULL_NAME, user=user)
        created_profile = Profile.objects.get(full_name=self.FULL_NAME)

        self.assertEqual(created_profile.full_name, self.FULL_NAME)
        self.assertEqual(created_profile.user, user)
