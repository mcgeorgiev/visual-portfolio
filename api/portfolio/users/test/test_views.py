from rest_framework.test import APITestCase
from rest_framework import status
from faker import Faker
from ..models import User
from .factories import UserFactory

fake = Faker()

class TestUserDetailTestCase(APITestCase):

    def setUp(self):
        self.user = UserFactory()

    def test_post_creates_a_user(self):
        new_email = fake.email()
        new_password = fake.password()
        payload = {'email': new_email, 'password': new_password}

        response = self.client.post('/api/v1/users/', payload)
        self.assertIs(response.status_code, status.HTTP_201_CREATED)

        user = User.objects.get(email=new_email)
        self.assertEquals(user.email, new_email)
