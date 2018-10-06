import json

from django.test import TestCase

from portfolio.profile.domain.Profile import Profile


class UserTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        cls.data = {
            'user': {
                'email': 'example@example.com',
                'password': 'secret-password!'
            },
            'full_name': 'Joe Bloggs'
        }

    def test_posted_profile_is_created(self):
        self.assertEqual(Profile.objects.all().count(), 0)
        response = self.client.post('/profile', data=json.dumps(self.data), content_type='application/json')
        self.assertEqual(Profile.objects.all().count(), 1)
        self.assertEqual(response.status_code, 201)

    def test_saved_password_is_hashed(self):
        self.client.post('/profile', data=json.dumps(self.data), content_type='application/json')
        profile = Profile.objects.get(full_name='Joe Bloggs')
        self.assertNotIn(self.data['user']['password'], profile.user.password)

    def test_multiple_users_cannot_be_created(self):
        self.assertEqual(Profile.objects.all().count(), 0)
        self.client.post('/profile', data=json.dumps(self.data), content_type='application/json')
        self.assertEqual(Profile.objects.all().count(), 1)
        response = self.client.post('/profile', data=json.dumps(self.data), content_type='application/json')
        self.assertEqual(Profile.objects.all().count(), 1)
        self.assertEqual(response.status_code, 409)

    def test_created_user_profile(self):
        first_user = Profile()

        first_user.full_name = 'Joe Bloggs'
        first_user.full_name = 'Joe Bloggs'
        first_user.save()

        second_user = Profile()
        second_user.full_name = 'Mike'
        second_user.save()

        saved_users = Profile.objects.all()
        self.assertEqual(saved_users.count(), 2)

        first_saved_user = saved_users[0]
        second_saved_user = saved_users[1]
        self.assertEqual(first_saved_user.full_name, 'Joe Bloggs')
        self.assertEqual(second_saved_user.full_name, 'Mike')

    def test_web_token_is_retrieved(self):
        self.client.post('/profile', data=json.dumps(self.data), content_type='application/json')

        response = self.client.post('/api-token-auth/', data=json.dumps({"username": "example@example.com", "password": "secret-password!"}), content_type='application/json')

        self.assertEqual(response.status_code, 200)
        self.assertIn('token', response.json())



class ImageTest(TestCase):
    pass

