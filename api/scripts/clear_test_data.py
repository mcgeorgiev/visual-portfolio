# scripts/clear_test_data.py
from portfolio.users.models import User


def run():
    print("Cleaning...")
    user = User.objects.filter(email="joe@bloggs.com").first()
    try:
        user.delete()
    except Exception as e:
        pass
