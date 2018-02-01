from flask_wtf import Form
from wtforms import StringField, BooleanField, SubmitField, PasswordField, TextAreaField, HiddenField
from wtforms.validators import DataRequired, Email, Length, EqualTo
from flask_wtf.file import FileField

class AddForm(Form):
    title = StringField('Title', validators=[Length(1, 128)])
    description = StringField('Description', validators=[Length(1, 128)])
    picture = FileField(validators=[DataRequired()])
    crop_points = HiddenField()
    # submit = SubmitField('Add Image')

class CreateForm(Form):
    name = StringField('Name', validators=[DataRequired(), Length(1, 120)])
    email = StringField('Email address', validators=[DataRequired(), Email()])
    password = PasswordField()
    submit = SubmitField('Create Account')
#
#
# class AboutForm(Form):
#         about = TextAreaField('About yourself')
