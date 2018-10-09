from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

class ImageView(APIView):
    serializer = None
    service = None
    permission_classes = (AllowAny,)

    def post(self, request):
        if self.serializer.is_valid():
            validated_data = self.serializer.validated_data
            image = self.service.create(validated_data)
            print(self.serializer.serialize(image))
            return Response("hey", status=status.HTTP_201_CREATED)
        return Response({}, status=status.HTTP_400_BAD_REQUEST)
