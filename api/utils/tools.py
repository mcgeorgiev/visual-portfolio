import uuid
from hashids import Hashids


def create_uuid():
    return uuid.uuid4().hex


def create_hash(value):
    return Hashids().encode(value)


class Serializer:
    def __init__(self, serializer_class):
        self._serializer_class = serializer_class

    def deserialize(self, obj):
        return self._serializer_class(obj).data

    def serialize(self, data):
        serializer = self._serializer_class(data=data)

        if serializer.is_valid():
            return serializer.validated_data
        else:
            raise InvalidException("Invalid Data")


class InvalidException(Exception):
    pass
