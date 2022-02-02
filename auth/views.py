from rest_framework import status
from django.shortcuts import render
from rest_framework.response import Response
from django.contrib.auth import authenticate, login

def login_view(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        # Redirect to a success page.
        return render(request,'index.html')
    else:
        # Return an 'invalid login' error message.
        return Response(status=status.HTTP_404_NOT_FOUND)