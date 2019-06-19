from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


class Post(models.Model):
    image = models.CharField(max_length=200)
    description = models.TextField()
    date_posted = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    likes = models.ManyToManyField(User, related_name='likes')

    def __str__(self):
        return f'{self.author}: {self.description}'
