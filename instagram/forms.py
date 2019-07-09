from django import forms


class CreatePostForm(forms.Form):
    imageURL = forms.FileField()
    caption = forms.CharField(max_length=500)
