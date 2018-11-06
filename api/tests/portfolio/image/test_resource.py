from unittest import mock
from unittest.mock import MagicMock, Mock

import os
from django.test import TestCase, RequestFactory
import json

from image.models import Image
from image.views import ImageView
from utils.tools import InvalidException


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

    def create_service_mock(self, create_return_value):
        service = MagicMock()
        service.create = MagicMock(return_value=create_return_value)
        return service

    def test_201_is_returned_when_image_is_created(self):
        request = self.factory.post('/image', data=json.dumps(self.image_data), content_type='application/json')

        service = self.create_service_mock(Image())

        response = ImageView.as_view(serializer=MagicMock(), service=service)(request)
        self.assertEqual(response.status_code, 201)

    def test_service_create_is_called_when_data_is_valid(self):
        request = self.factory.post('/image', data=json.dumps(self.image_data), content_type='application/json')

        service = self.create_service_mock(Image())

        ImageView.as_view(serializer=MagicMock(), service=service)(request)
        service.create.assert_called()

    def test_service_create_is_called_with_validated_data(self):
        request = self.factory.post('/image', data=json.dumps(self.image_data), content_type='application/json')
        image = Image()
        serializer = MagicMock()
        serializer.serialize = MagicMock(return_value=image)
        service = self.create_service_mock(image)

        ImageView.as_view(serializer=serializer, service=service)(request)

        service.create.assert_called_with(image)

    def test_data_and_location_is_returned_when_image_is_created(self):
        request = self.factory.post('/image', data=json.dumps(self.image_data), content_type='application/json')
        serializer = MagicMock()
        serializer.deserialize = MagicMock(return_value=self.image_data)
        service = self.create_service_mock(Image(resource_id='image_hash'))
        os.environ['API_URL'] = 'api.com'

        response = ImageView.as_view(serializer=serializer, service=service)(request)
        self.assertEqual(response.data, self.image_data)
        self.assertEqual(dict(response.items())['location'], "api.com/image/image_hash/")

    def test_400_is_returned_if_no_user_field(self):
        serializer = MagicMock()
        # with self.assertRaises(InvalidException):
        serializer = MagicMock()
        serializer.serialize = MagicMock(return_value=InvalidException("Invalid Data"))
        request = self.factory.post('/image', data=json.dumps(self.image_data.pop("user")), content_type='application/json')
        service = MagicMock()

        response = ImageView.as_view(serializer=serializer, service=service)(request)

    #
    # def test_response_if_image_not_created(self):
    #     pass
    #
    # def test_no_data_is_returned_on_bad_request(self):
    #     serializer = MagicMock()
    #     serializer.is_valid = MagicMock(return_value=False)
    #     serializer.create_image = MagicMock(return_value=None)
    #     request = self.factory.post('/image', data=json.dumps(self.image_data.pop("user")), content_type='application/json')
    #     service = MagicMock()
    #
    #     response = ImageView.as_view(serializer=serializer, service=service)(request)
    #     # self.assertEqual(response.body, {})
