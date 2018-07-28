from django.contrib.auth.models import User

from portfolio.models import UserRepository, ProfileRepository, Profile


class UserRepositoryImpl(UserRepository):
    def user_exists(self, email):
        if User().__class__.objects.filter(email=email).exists():
            return True

    def create(self, email, password):
        return User().__class__.objects.create_user(
            username=email,
            email=email,
            password=password)


class ProfileRepositoryImpl(ProfileRepository):
    def create(self, full_name, user):
        return Profile().__class__.objects.create(full_name=full_name, user=user)

