from django.contrib.auth.models import User
from django.test import TestCase

from image.models import Image
from image.service import ImageSerializer
from utils.tools import Serializer, InvalidException


class ImageSerializerTest(TestCase):

    def setUp(self):
        self.image_data = {
            "title": 'Judith Beheading Holofernes',
            "medium": 'Oil Painting',
            "description": 'A horrific painting',
            "date_created": '1598',
            "user": 'joe bloggs'
        }

        self.user = User(username=self.image_data['user'])
        self.user.save()

    def test_serializer_deserializes_data(self):
        serializer = Serializer(ImageSerializer)
        validated_data = serializer.serialize(self.image_data)
        self.assertEqual(validated_data["title"], self.image_data["title"])
        self.assertEqual(validated_data["medium"], self.image_data["medium"])
        self.assertEqual(validated_data["description"], self.image_data["description"])
        self.assertEqual(validated_data["date_created"], self.image_data["date_created"])
        self.assertEqual(validated_data["user"], self.user)

    def test_serializer_throws_error_when_invalid_data(self):
        serializer = Serializer(ImageSerializer)
        self.image_data['user'] = "nobody!"
        bad_data = self.image_data
        with self.assertRaises(InvalidException):
            serializer.serialize(bad_data)

    def test_serializer_serializes_object(self):
        serializer = Serializer(ImageSerializer)
        validated_data = serializer.serialize(self.image_data)
        image = Image(**validated_data)
        self.assertEqual(ImageSerializer(image).data, self.image_data)

    def test_deserialize_image_object(self):
        serializer = Serializer(ImageSerializer)
        image = Image(**{
            **self.image_data,
            'user': self.user
        })
        data = serializer.deserialize(image)
        self.assertEqual(data, self.image_data)


