import os
BASEDIR = os.path.abspath(os.path.dirname(__file__))
UPLOAD_FOLDER = "/app/static"
THUMBNAIL_FOLDER = "/app/static/thumbnails"
IMAGE_FOLDER = "/app/static/images"
ALLOWED_EXTENSIONS = set(['jpg', 'jpeg', 'png', 'gif'])
THUMBNAILS = "/static/thumbnails/"
IMAGES = "/static/images/"

SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(BASEDIR, 'app.db')
SQLALCHEMY_MIGRATE_REPO = os.path.join(BASEDIR, 'db_repository')
SQLALCHEMY_TRACK_MODIFICATIONS = False

WTF_CSRF_ENABLED = True
SECRET_KEY = 'this-is-a-secret-key'
