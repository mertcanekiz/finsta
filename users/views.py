from django.shortcuts import render, redirect
from django.contrib import messages
from django.http import HttpResponse
from .forms import UserRegisterForm
from .models import Profile
from instagram.models import Post
from django.contrib.auth.models import User


def register(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            profile = Profile(bio='', picture='default.jpg')
            form.save()
            username = form.cleaned_data.get('username')
            messages.success(request, f'Account created for {username}! You can now login')
            return redirect('login')
    else:
        form = UserRegisterForm()
    return render(request, 'users/register.html', {'form': form})


def profile(request, **kwargs):
    username = kwargs['username']
    user = User.objects.filter(username=username).first()
    posts = Post.objects.filter(author=user).order_by('-date_posted')

    context = {
        'view_user': user,
        'posts': [(post, len(post.likes.filter(username=request.user.username)) > 0) for post in posts],
    }
    return render(request, 'users/profile.html', context)
