from app import db
from werkzeug.security import generate_password_hash, check_password_hash
from app import login_manager
from flask_login import UserMixin

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    images = db.relationship('Image', backref='author', lazy='dynamic')
    about = db.Column(db.String(512))
    password_hash = db.Column(db.String(128))

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def get_id(self):
        try:
            return unicode(self.id) # python 2
        except NameError:
            return str(self.id) # python 3


    def __repr__(self):
        return '<User %r>' % (self.name)


class Image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    position = db.Column(db.Integer)
    title = db.Column(db.String(128))
    slug = db.Column(db.String(128))
    description = db.Column(db.String(256))
    timestamp = db.Column(db.DateTime)
    url = db.Column(db.String(256))
    cropped_url = db.Column(db.String(256))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __repr__(self):
        return '<Image %r>' % (self.title)
