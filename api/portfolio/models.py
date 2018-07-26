from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import User
from django.db import models


class Profile(models.Model):
    """Represents a user's profile details"""

    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=50, null=True)

    class Meta:
        verbose_name_plural = 'profiles'

    def __unicode__(self):
        return f'<Profile ${self.user.email}>'

    def __str__(self):
        return f'<Profile ${self.user.email}>'
