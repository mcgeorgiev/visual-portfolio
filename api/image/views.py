import os
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from utils.tools import InvalidException


class ImageView(APIView):
    serializer = None
    service = None
    permission_classes = (AllowAny,)

    def post(self, request):
        try:
            validated_data = self.serializer.serialize(request.data)
    
            image = self.service.create(validated_data)
            # if image is None -> something else
            deserialized_image = self.serializer.deserialize(image)
            return Response(deserialized_image,
                            status=status.HTTP_201_CREATED,
                            headers=self.create_location_header(image.resource_id))

        except InvalidException:
            return Response({}, status=status.HTTP_400_BAD_REQUEST)

    def create_location_header(self, resource_id):
        return {'location': '{0}/image/{1}/'.format(os.environ.get('API_URL'), resource_id)}
