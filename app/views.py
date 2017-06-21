from flask import render_template, redirect, flash, url_for
from app import app, db
from app.models import User, Image
import re
from app.forms import AddForm
from werkzeug.utils import secure_filename


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


@app.route('/add', methods=['GET', 'POST'])
def add_image():
    data = {}
    owner = User.query.first()
    data["name"] = owner.name

    form = AddForm()
    if form.validate_on_submit():
        print "YAY!"
        picture = secure_filename(form.picture.file.filename)


    # if add_form.submit.data:
    #     if edit_form.about.data.strip():
    #          user = g.user
    #          user.about = edit_form.about.data
    #          db.session.add(user)
    #          db.session.commit()
    # elif edit_form.picture_submit.data:
    #     file = edit_form.picture.data
    #     if file.filename == '':
    #         flash('No selected file')
    #         return redirect(request.url)
    #
    #     if file and allowed_file(file.filename):
    #         filename = secure_filename(file.filename)
    #         file.save(app.config["BASEDIR"] + app.config['UPLOAD_FOLDER'] + "/" + filename)
    #         return redirect(url_for('uploaded_file', filename=filename))

    return render_template("add.html",
                            add_form=form, data=data)


@app.route('/<title_slug>')
def image(title_slug):
    data = {}
    owner = User.query.first()
    data["name"] = owner.name
    image = Image.query.filter_by(slug=title_slug).first()
    if image == None:
        flash('Incorrect URL')
        return redirect(url_for('index'))
    data["title"] = image.title
    data["description"] = image.description
    data["url"] = image.url
    return render_template('image.html',
                           data=data)


def slugify(text, delim=u'-'):
    """Generates an ASCII-only slug."""
    result = []
    for word in _punct_re.split(text.lower()):
        word = word.encode()
        if word:
            result.append(word)
    return unicode(delim.join(result))
