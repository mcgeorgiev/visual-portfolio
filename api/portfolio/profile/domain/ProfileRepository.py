from abc import ABCMeta, abstractmethod


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