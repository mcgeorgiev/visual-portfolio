import uuid
from hashids import Hashids


def create_uuid():
    return uuid.uuid4().hex

def create_hash(value):
    return Hashids().encode(value)