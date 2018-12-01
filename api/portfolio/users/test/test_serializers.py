from django.test import TestCase
from django.forms.models import model_to_dict
from django.contrib.auth.hashers import check_password
from .factories import UserFactory
from ..serializers import UserSerializer


class TestCreateUserSerializer(TestCase):

    def setUp(self):
        self.user_data = model_to_dict(UserFactory.build())

    def test_serializer_with_empty_data(self):
        serializer = UserSerializer(data={})
        self.assertFalse(serializer.is_valid())

    def test_serializer_with_valid_data(self):
        serializer = UserSerializer(data=self.user_data)
        self.assertTrue(serializer.is_valid())

    def test_serializer_hashes_password(self):
        serializer = UserSerializer(data=self.user_data)
        self.assertTrue(serializer.is_valid())

        user = serializer.save()
        self.assertTrue(check_password(self.user_data.get('password'), user.password))

    def test_serializer_creates_user(self):
        serializer = UserSerializer(data=self.user_data)
        self.assertTrue(serializer.is_valid())

        user = serializer.save()
        self.assertTrue(user.email, self.user_data.get('email'))


