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

    # @patch('image.service.ImageService')
    # def test_201_is_returned_when_image_is_created(self, serializer):
    #     request = self.factory.post('/image', data=json.dumps(self.image_data), content_type='application/json')
    #     serializer.is_valid = MagicMock(return_value=True)
    #
    #     response = ImageView.as_view(serializer=serializer)(request)
    #     self.assertEqual(response.status_code, 201)

    # def test_400_is_returned_if_no_user_field(self, serializer):
    #     serializer.is_valid = MagicMock(return_value=True)
    #     serializer.create_image = MagicMock(return_value=None)
    #     request = self.factory.post('/image', data=json.dumps(self.image_data.pop("user")), content_type='application/json')
    #
    #     response = ImageView.as_view()(request)
    #     self.assertEqual(response.status_code, 400)

    # @patch('image.service.ImageService')
    # def test_create_service_is_called_when_valid(self, serializer):
    #     request = self.factory.post('/image', data=json.dumps(self.image_data), content_type='application/json')
    #     serializer.is_valid = MagicMock(return_value=True)
    #     serializer.create_user = MagicMock(return_value="yay!")
    #     ImageView.as_view(serializer=serializer)(request)
    #     serializer.create_user.assert_called_once()

    def test_data_is_returned_when_image_is_created(self):
        pass

    def test_data_is_returned_with_content_url(self):
        pass

    def test_no_data_is_returned_on_bad_request(self):
        pass
