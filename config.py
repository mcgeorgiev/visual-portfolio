import os
BASEDIR = os.path.abspath(os.path.dirname(__file__))
UPLOAD_FOLDER = "/app/static"
ALLOWED_EXTENSIONS = set(['jpg', 'jpeg', 'png', 'gif'])

SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(BASEDIR, 'app.db')
SQLALCHEMY_MIGRATE_REPO = os.path.join(BASEDIR, 'db_repository')

WTF_CSRF_ENABLED = True
SECRET_KEY = 'this-is-a-secret-key'
