from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, JsonResponse
from .models import Post
import json


@login_required
def home(request):
    posts = Post.objects.all().order_by('-date_posted')
    result = [(post, len(post.likes.filter(username=request.user.username)) > 0)
              for post in posts]
    return render(request, 'instagram/home.html', {'posts': result})


def like(request):
    if request.user.is_authenticated:
        print(request.body)
        post_data = json.loads(request.body)
        post = Post.objects.get(id=post_data['id'])
        liked = False
        if len(post.likes.filter(username=request.user.username)) > 0:
            post.likes.remove(request.user)
            print(post.likes.all())
        else:
            post.likes.add(request.user)
            liked = True
        like_count = post.likes.count()
        return JsonResponse({'liked': liked, 'likeCount': like_count})
