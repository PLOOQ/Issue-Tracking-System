# Generated by Django 4.0.1 on 2022-01-26 20:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0003_alter_task_options'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='body',
            field=models.TextField(max_length=1000),
        ),
    ]
