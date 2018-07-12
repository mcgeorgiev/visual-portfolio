from django.test import TestCase
from django.urls import resolve
from portfolio.views import home_page
from portfolio.models import Profile
import json

class ApiTest(TestCase):

    def test_root_resolves_to_home_page_view(self):
        found = resolve('/')
        self.assertEqual(found.func, home_page)

    def test_login_route_is_postable(self):
        response = self.client.post('/api/login', data={'email':'example@example.com','password':'secret-password!'})
        self.assertEqual(response.status_code, 200)

    def test_create_route_is_postable(self):
        data = {
            'user': {
                'email': 'example@example.com',
                'password': 'secret-password!'
            },
            'full_name': 'Joe Bloggs'
        }
        response = self.client.post('/api/create', data=json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, 201)

    # def test_create_response_contains_name(self):
    #     response = self.client.post('/api/create', data={
    #         'fullname': 'Joe Bloggs', 'email':'example@example.com','password':'secret-password!'
    #     })
    #     self.assertIn('example@example.com', response.content.decode())

    # def test_created_user(self):
    #     first_user = UserProfile()
    #     first_user.full_name = 'Joe Bloggs'
    #     first_user.save()
    #
    #     second_user = UserProfile()
    #     second_user.full_name = 'Mike'
    #     second_user.save()
    #
    #     saved_users = UserProfile.objects.all()
    #     self.assertEqual(saved_users.count(), 2)
    #
    #     first_saved_user = saved_users[0]
    #     second_saved_user = saved_users[1]
    #     self.assertEqual(first_saved_user.text, 'Joe Bloggs')
    #     self.assertEqual(second_saved_user.text, 'Mike')

