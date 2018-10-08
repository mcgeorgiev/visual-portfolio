from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

class ImageView(APIView):
    serializer = None
    permission_classes = (AllowAny,)

    def post(self, request):
        if self.serializer.is_valid():
            return Response({}, status=status.HTTP_201_CREATED)
        return Response({}, status=status.HTTP_400_BAD_REQUEST)
