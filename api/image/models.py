from abc import abstractmethod, ABCMeta

from django.conf import settings
from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone

from django.contrib.contenttypes.models import ContentType

from utils.tools import create_hash


class Image(models.Model):
    title = models.CharField(max_length=100, null=False)
    medium = models.CharField(max_length=100)
    description = models.TextField()
    date_created = models.CharField(max_length=50)
    upload_time = models.DateTimeField(default=timezone.now, blank=True)
    resource_id = models.SlugField(max_length=16)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, to_field='username')

    class Meta:
        verbose_name_plural = 'images'

    def __unicode__(self):
        return f'<Image ${self.title}>'

    def __str__(self):
        return f'<Image ${self.title}>'

    def save(self, *args, **kwargs):
        super(Image, self).save(*args, **kwargs)
        self.resource_id = create_hash(self.pk)
        super(Image, self).save(*args, **kwargs)


class ImageRepository:
    __metaclass__ = ABCMeta

    @abstractmethod
    def create(self, image): raise NotImplementedError

    @abstractmethod
    def user_exists(self, id_): raise NotImplementedError
