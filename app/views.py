from flask import render_template
from app import app, db
from app.models import User, Image
import re

_punct_re = re.compile(r'[\t !"#$%&\'()*\-/<=>?@\[\\\]^_`{|},.]+')

@app.route("/")
def index():
    data = {}
    owner = User.query.first()
    data["name"] = owner.name

    data["images"] = []
    images = owner.images
    for item in images:
        image = {}
        image["title"] = item.title
        image["description"] = item.description
        image["url"] = item.url
        data["images"].append(image)

    return render_template('index.html', data=data)


@app.route('/work/<title_slug>')
def image(title_slug):
    image = Image.query.filter_by(slug=title_slug).first()
    if image == None:
        flash('Incorrect URL')
        return redirect(url_for('index'))

    return render_template('image.html',
                           image=image)


def slugify(text, delim=u'-'):
    """Generates an ASCII-only slug."""
    result = []
    for word in _punct_re.split(text.lower()):
        word = word.encode()
        if word:
            result.append(word)
    return unicode(delim.join(result))
