from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from portfolio.profile.service.ProfileService import ProfileService

class ProfileView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = ProfileService(data=request.data)
        if serializer.is_valid():
            if serializer.create(request.data):
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.data, status=status.HTTP_409_CONFLICT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# # POST /profile -> 201 id
# # POST /image -> id, content_url
# profile_id,
# name,
# medium,
# description,
# date,
#
# # PUT /image/79dddf9/content
# image,
# crop points
#
# 1) select image
# 2)see image
# 2) select crop
# 3) fill in data
