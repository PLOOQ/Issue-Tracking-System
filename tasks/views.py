from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import render
from .models import Task
from rest_framework import status
from .serializers import TaskSerializer
from django.http import Http404
from django.contrib.auth.models import User
from rest_framework import generics
from tasks.serializers import UserSerializer
from rest_framework import permissions
from tasks.permissions import IsOwnerOrReadOnly

# Create your views here.
def index(request):
    return render(request,'index.html')

class TaskList(APIView):

    def get(self, request, format=None):
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks,many=True)
        return Response(serializer.data)
    
    def post(self, request, format=None):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid(): 
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    
    
class TaskDetail(APIView):

    def get_object(self, task_id):
        try:
            return Task.objects.get(pk=task_id)
        except Task.DoesNotExist:
             raise Http404

    def get(self, request, task_id, format=None):
        task = self.get_object(task_id)
        serializer = TaskSerializer(task)
        return Response(serializer.data)


    def put(self, request, task_id, format=None):
        task = self.get_object(task_id)
        serializer = TaskSerializer(task,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, task_id, format=None):
        task = self.get_object(task_id)
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly,IsOwnerOrReadOnly]

class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

