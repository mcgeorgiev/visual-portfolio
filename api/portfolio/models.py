from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=50, blank=True)
    about = models.TextField(max_length=100, blank=True)

    class Meta:
        app_label = 'portfolio'

    def __unicode__(self):
        return self.user.username

    def __str__(self):
        return self.user


