from django.test import TestCase

from portfolio.users.models import User

class TestUserModels(TestCase):

    def test_user_is_created_with_all_fields(self):
        user = User.objects.create_user(email="joe@bloggs.com", password="secret-password")
        self.assertEqual(user.email, "joe@bloggs.com")
        self.assertIsNot(user.password, "secret-password")
        self.assertIsNotNone(user.id)