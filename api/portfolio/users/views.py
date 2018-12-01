from rest_framework import viewsets, mixins
# from rest_framework.permissions import AllowAny
from .models import User
# from .permissions import IsUserOrReadOnly
from .serializers import UserSerializer


class UserCreateViewSet(mixins.CreateModelMixin,
                        viewsets.GenericViewSet):

    queryset = User.objects.all()
    serializer_class = UserSerializer
