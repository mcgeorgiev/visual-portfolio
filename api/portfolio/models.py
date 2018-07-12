from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class Profile(models.Model):
    """Represents a user's profile details"""

    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=50, null=True)

    class Meta:
        verbose_name_plural = 'profiles'

    def __unicode__(self):
        return self.user.email

    def __str__(self):
        return self.user.email