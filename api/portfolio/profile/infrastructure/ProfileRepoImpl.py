from django.contrib.auth.models import User

from portfolio.profile.domain.Profile import Profile
from portfolio.profile.domain.ProfileRepository import UserRepository, ProfileRepository
from utils.tools import create_hash


class UserRepositoryImpl(UserRepository):
    def user_exists(self, email):
        if User().__class__.objects.filter(email=email).exists():
            return True

    def create(self, email, password):
        user = User().__class__.objects.create_user(
            username=email,
            email=email,
            password=password)

        user.username = create_hash(user.id)
        return user.save()


class ProfileRepositoryImpl(ProfileRepository):
    def create(self, full_name, user):
        return Profile().__class__.objects.create(full_name=full_name, user=user)