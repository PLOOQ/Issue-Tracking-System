from . import views

from django.urls import path
urlpatterns = [
    path('', views.index, name='index'),
    path("tasks", views.TaskList.as_view()),
    path("tasks/<int:task_id>", views.TaskDetail.as_view()),

]