from rest_framework import viewsets, mixins
from .models import User
from .serializers import UserSerializer


class UserCreateViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):

    queryset = User.objects.all()
    serializer_class = UserSerializer
