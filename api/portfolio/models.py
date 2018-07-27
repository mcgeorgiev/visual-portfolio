from abc import ABCMeta, abstractmethod

from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import User
from django.db import models


class UserRepository:
    __metaclass__ = ABCMeta

    @abstractmethod
    def create(self, email, password): raise NotImplementedError

    @abstractmethod
    def user_exists(self, email): raise NotImplementedError


class ProfileRepository:
    __metaclass__ = ABCMeta

    @abstractmethod
    def create(self, full_name, user): raise NotImplementedError


class Profile(models.Model):

    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=50, null=True)

    class Meta:
        verbose_name_plural = 'profiles'

    def __unicode__(self):
        return f'<Profile ${self.user.email}>'

    def __str__(self):
        return f'<Profile ${self.user.email}>'
