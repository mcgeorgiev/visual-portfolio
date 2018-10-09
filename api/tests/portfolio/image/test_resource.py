from unittest.mock import MagicMock

from django.test import TestCase, RequestFactory
import json

from image.views import ImageView


class ImageResourceTest(TestCase):

    def setUp(self):
        self.image_data = {
            "title": 'Judith Beheading Holofernes',
            "medium": 'Oil Painting',
            "description": 'A horrific painting',
            "date_created": '1598',
            "user": 'joe bloggs'
        }

        self.factory = RequestFactory()

    def test_201_is_returned_when_image_is_created(self):
        request = self.factory.post('/image', data=json.dumps(self.image_data), content_type='application/json')
        serializer = MagicMock()
        serializer.is_valid = MagicMock(return_value=True)
        service = MagicMock()
        service.create = MagicMock()

        response = ImageView.as_view(serializer=serializer, service=service)(request)
        self.assertEqual(response.status_code, 201)

    def test_service_create_is_called_when_data_is_valid(self):
        request = self.factory.post('/image', data=json.dumps(self.image_data), content_type='application/json')
        serializer = MagicMock()
        serializer.is_valid = MagicMock(return_value=True)
        service = MagicMock()
        service.create = MagicMock()

        ImageView.as_view(serializer=serializer, service=service)(request)
        service.create.assert_called()

    def test_service_create_is_called_with_validated_data(self):
        request = self.factory.post('/image', data=json.dumps(self.image_data), content_type='application/json')
        serializer = MagicMock()
        serializer.is_valid = MagicMock(return_value=True)
        serializer.validated_data = MagicMock()
        service = MagicMock()
        service.create = MagicMock()

        ImageView.as_view(serializer=serializer, service=service)(request)

        service.create.assert_called_with(serializer.validated_data)

    def test_400_is_returned_if_no_user_field(self):
        serializer = MagicMock()
        serializer.is_valid = MagicMock(return_value=False)
        serializer.create_image = MagicMock(return_value=None)
        request = self.factory.post('/image', data=json.dumps(self.image_data.pop("user")), content_type='application/json')
        service = MagicMock()

        response = ImageView.as_view(serializer=serializer, service=service)(request)
        self.assertEqual(response.data, {})

    def test_data_is_returned_when_image_is_created(self):
        request = self.factory.post('/image', data=json.dumps(self.image_data), content_type='application/json')
        serializer = MagicMock()
        serializer.is_valid = MagicMock(return_value=True)
        service = MagicMock()
        service.create = MagicMock()

        response = ImageView.as_view(serializer=serializer, service=service)(request)
        self.assertEqual(response.data, 201)

    def test_data_is_returned_with_content_url(self):
        pass

    def test_response_if_image_not_created(self):
        pass

    def test_no_data_is_returned_on_bad_request(self):
        serializer = MagicMock()
        serializer.is_valid = MagicMock(return_value=False)
        serializer.create_image = MagicMock(return_value=None)
        request = self.factory.post('/image', data=json.dumps(self.image_data.pop("user")), content_type='application/json')
        service = MagicMock()

        response = ImageView.as_view(serializer=serializer, service=service)(request)
        print(response)
        # self.assertEqual(response.body, {})
