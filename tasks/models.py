# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Task(models.Model):
    label_choices = [
        ('Backlog','Backlog',),
        ('In Progress','In Progress'),
        ('Completed','Completed')
    ]
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length = 100)
    label = models.CharField(max_length = 100, choices=label_choices)
    body = models.TextField(max_length = 1000)
    owner = models.ForeignKey('auth.User', related_name='tasks', on_delete=models.CASCADE) 

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

    def __str__(self):
            return(f"{self.id}. {self.name} - {self.label}")
    
    class Meta:
        ordering = ['id']
        

