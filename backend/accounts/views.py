from django.shortcuts import render
from .models import Profile, User
from .serializer import UserTokenObtainPairSerializer, UserSerializer , RegisterSerializer
from rest_framework.decorators import api_view , permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics , status
from rest_framework.permissions import AllowAny , IsAuthenticated
from rest_framework.response import Response


# Create your views here.
class UserTokenObtainPairView(TokenObtainPairView):
    serializer_class = UserTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])
# def home_view(request):
#     if request == 'GET':
#         response = f"Hey {request.user} your are seeing a get response"
#         return Response({'response': response}, status=status.HTTP_200_OK)
#     elif request.method == 'POST':
#         text=  request.POST.get('text')
#         response = f"Hey {request.user} your text is {text}"
#         return Response({'response': response}, status=status.HTTP_200_OK)
#     return response({}, status=status.HTTP_400_BAD_REQUEST)
    


    
