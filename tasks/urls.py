from . import views

from django.urls import path
urlpatterns = [
    path("", views.TaskList.as_view()),
    path("<int:task_id>", views.TaskDetail.as_view()),
    path('users/', views.UserList.as_view()),
    path('users/<int:pk>/', views.UserDetail.as_view()),
]