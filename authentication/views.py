from django.shortcuts import render
from django.contrib.auth import authenticate, login

# Create your views here.


def my_view(request):
    username = request.POST['pabloloo1']
    password = request.POST['excruciatingly_long_password']
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        # Redirect to a success page.
        render("success.html")
    else:
        # Return an 'invalid login' error message.
        return