from . import views

from django.urls import path
urlpatterns = [
    path("tasks", views.TaskList.as_view()),
    path("tasks/<int:task_id>", views.TaskDetail.as_view())
]