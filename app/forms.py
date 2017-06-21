from flask_wtf import Form
from wtforms import StringField, BooleanField, SubmitField, PasswordField, TextAreaField, FileField
from wtforms.validators import DataRequired, Email, Length, EqualTo

class AddForm(Form):
    title = StringField('Title', validators=[DataRequired(), Length(1, 128)])
    description = StringField('Description', validators=[DataRequired(), Length(1, 128)])
    picture = FileField()
    submit = SubmitField('Add Image')
