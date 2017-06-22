from flask import render_template, redirect, flash, url_for, request, jsonify
from app import app, db
from app.models import User, Image
import re
from app.forms import AddForm, CreateForm
from werkzeug.utils import secure_filename
import datetime
from PIL import Image as ImagePIL



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
        image["slug"] = item.slug
        data["images"].append(image)

    return render_template('index.html', data=data)


@app.route('/crop', methods=['GET', 'POST'])
def crop_image():
    data = {}
    data["url"] = "C29_b.jpg"
    return render_template('crop.html', data=data)


@app.route('/crop_points')
def crop_points():
    data = request.args
    filename = data["image"]
    points = (int(data["x1"]), int(data["y1"]), int(data["x2"]), int(data["y2"]))
    create_cropped_image(filename, points)
    return jsonify("OK")


def create_cropped_image(filename, points=None):
    path = app.config["BASEDIR"] + app.config['UPLOAD_FOLDER'] + "/"
    img = ImagePIL.open(path + filename)
    edge_size = 500
    if img.size[0] <= edge_size or img.size[1] <= edge_size:
        # if the size of the image is smaller than 500px:
        # make the shortest side the the size of the image
        edge_size = img.size[0] if img.size[0] < img.size[1] else img.size[1]

    if not points:
        half_the_width = img.size[0] / 2
        half_the_height = img.size[1] / 2
        points = (
                    half_the_width - (edge_size/2),
                    half_the_height - (edge_size/2),
                    half_the_width + (edge_size/2),
                    half_the_height + (edge_size/2)
                 )

    cropped_img = img.crop(points)
    split_name = filename.split(".")
    cropped_name = split_name[0] + "_cropped." + split_name[1]

    # save the cropped image url
    image = Image.query.filter_by(url=filename).first()
    image.cropped_url = cropped_name
    db.session.add(image)
    db.session.commit()
    cropped_img.save(path + cropped_name)


@app.route('/create', methods=['GET', 'POST'])
def create_account():
    form = CreateForm()
    if form.validate_on_submit():
        user = User(name=form.name.data, email=form.email.data, password=form.password.data)
        db.session.add(user)
        db.session.commit()
        return redirect(url_for('index'))
    return render_template('create.html', create_form=form)


@app.route('/add', methods=['GET', 'POST'])
def add_image():
    data = {}
    owner = User.query.first()
    data["name"] = owner.name

    form = AddForm()
    if form.validate_on_submit():
        filename = None
        try:
            filename = secure_filename(form.picture.data.filename)
        except:
            pass

        if filename is None:
            flash('No selected file')
        elif allowed_file(filename):
            form.picture.data.save(app.config["BASEDIR"] + app.config['UPLOAD_FOLDER'] + "/" + filename)
            title = form.title.data
            image = Image(title=title,
                slug=slugify(title),
                description=form.description.data,
                timestamp=datetime.datetime.now(),
                url=filename,
                user_id=owner.id)
            db.session.add(image)
            db.session.commit()
            flash('Added image successfully')
        else:
            flash('Incorrect file type')

    #   return redirect(url_for('uploaded_file', filename=filename))

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


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']
