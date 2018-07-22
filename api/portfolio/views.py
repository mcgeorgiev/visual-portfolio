from portfolio.serializers import ProfileSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.http import HttpResponse


def home_page():
    return None


def login(request):
    return HttpResponse()


class CreateView(APIView):

    def post(self, request):
        serializer = ProfileSerializer(data=request.data)
        if serializer.is_valid():
            if serializer.create(request.data):
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.data, status=status.HTTP_409_CONFLICT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
