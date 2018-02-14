from flask import render_template, redirect, flash, url_for, request, jsonify
from app import app, db
from app.models import User, Image
import re
from app.forms import AddForm, CreateForm
from werkzeug.utils import secure_filename
import datetime
from PIL import Image as ImagePIL
from operator import itemgetter
import json

_punct_re = re.compile(r'[\t !"#$%&\'()*\-/<=>?@\[\\\]^_`{|},.]+')

@app.route("/")
def index():
    data = {}
    owner = User.query.first()
    if not owner:
        return redirect(url_for('create_account'))

    data["name"] = owner.name

    data["images"] = []
    images = owner.images
    for item in images:
        image = {}
        image["title"] = item.title
        image["description"] = item.description
        image["thumbnail_path"] = item.cropped_url
        image["slug"] = item.slug
        image["position"] = item.position
        image["id"] = item.id
        data["images"].append(image)
    unsorted_images = data["images"]
    data["images"] = sorted(unsorted_images, key=itemgetter('position'))
    return render_template('index.html', data=data)


@app.route('/set_positions', methods=["GET", "POST"])
def set_positions():
    data = json.loads(request.form.get("postitionData", None))
    if data:
        for position, _id in data.items():
            position = int(position)
            _id = int(_id)
            image = Image.query.filter_by(id=_id).first()
            image.position = position + 1
            db.session.add(image)
            db.session.commit()

        return jsonify({"response":'New positions set successfully'});
    return jsonify({"response":'An error has occurred. Please try again.'});

@app.route('/get_edit_info', methods=["GET", "POST"])
def get_edit_info():
    image_id = request.args.get("id")
    image = Image.query.filter_by(id=image_id).first()
    if image:
        image_data = {}
        image_data["id"] = image_id
        image_data["title"] = image.title
        image_data["description"] = image.description
        image_data["thumbnail"] = image.cropped_url
        return jsonify(image_data);
    return jsonify({"error": "No image found"})

@app.route('/change_meta_data', methods=["GET", "POST"])
def change_meta_data():
    data = json.loads(request.form.get("imageMeta", None))
    if data:
        image = Image.query.filter_by(id=data["id"]).first()
        image.title = data["title"]
        image.description = data["description"]
        db.session.add(image)
        db.session.commit()

        return jsonify({"response":'Successfully changed.'});
    return jsonify({"response":'An error has occurred.'});

@app.route("/edit")
def edit():
    data = {}
    owner = User.query.first()
    if not owner:
        return redirect(url_for('create_account'))

    data["name"] = owner.name

    data["images"] = []
    images = owner.images
    for item in images:
        image = {}
        image["title"] = item.title
        image["description"] = item.description
        image["thumbnail_path"] = item.cropped_url
        image["slug"] = item.slug
        image["position"] = item.position
        image["id"] = item.id
        data["images"].append(image)
    unsorted_images = data["images"]
    data["images"] = sorted(unsorted_images, key=itemgetter('position'))

    return render_template('edit.html', data=data)


@app.route("/test")
def test():
    return render_template('test.html')


def create_thumbnail(filename, crop_points):
    full_image_path = app.config["BASEDIR"] + app.config['IMAGE_FOLDER'] + "/"
    img = ImagePIL.open(full_image_path + filename)

    block = ''
    points = []
    i = 0
    while i < len(crop_points):
        if crop_points[i].isdigit():
            block += crop_points[i]
        else:
            points.append(int(block))
            block = ''
        i+=1
    points.append(int(block))

    thumbnail = img.crop(points)
    new_filename = create_thumbnail_name(filename)
    thumbnail_path = app.config["BASEDIR"] + app.config['THUMBNAIL_FOLDER'] + "/" + new_filename
    thumbnail.save(thumbnail_path, quality=90, optimize=True)
    return app.config["THUMBNAILS"] + new_filename


def create_thumbnail_name(filename):
    stemmed = filename.split(".")
    return "{0}_tb.{1}".format(stemmed[0], stemmed[1])


@app.route('/create', methods=['GET', 'POST'])
def create_account():
    form = CreateForm()
    if form.validate_on_submit():
        user = User(name=form.name.data, email=form.email.data, password=form.password.data)
        db.session.add(user)
        db.session.commit()
        return redirect(url_for('index'))
    return render_template('create.html', create_form=form)


def create_new_filename(filename, filename_id):
    stemmed = filename.split(".")
    return "{0}.{1}".format(filename_id, stemmed[-1])


@app.route('/add-image', methods=['GET', 'POST'])
def add_new_image():
    data = {}
    owner = User.query.first()
    data["name"] = owner.name
    form = AddForm()

    if form.validate():
        filename = None
        try:
            filename = secure_filename(form.picture.data.filename)
        except:
            pass
        print filename
        if filename is None:
            flash('No selected file')
        else:
            timestamp = datetime.datetime.now()

            # create new blank entry associated with user
            image = Image(
                timestamp=timestamp,
                user_id=owner.id)
            db.session.add(image)
            db.session.commit()

            # open up the image again and get the id
            image = Image.query.filter(Image.user_id == owner.id, Image.timestamp == timestamp).first()
            image_id = image.id
            new_filename = create_new_filename(filename, image_id)
            # Save all the information make the picture name the id
            image_path = app.config["BASEDIR"] + app.config['IMAGE_FOLDER'] + "/" + new_filename
            form.picture.data.save(image_path)
            # need to lower quality
            thumbnail_path = create_thumbnail(new_filename, form.crop_points.data)

            title = form.title.data
            image.title=title
            image.slug=slugify(title)
            image.description=form.description.data
            image.timestamp=datetime.datetime.now()
            image.url=app.config["IMAGES"] + new_filename
            image.cropped_url=thumbnail_path
            image.user_id=owner.id
            image.position = len([(i, x) for i, x in enumerate(owner.images, 1)])


            db.session.add(image)
            db.session.commit()
            flash('Added image successfully')

    return render_template('add-image.html', add_form=form, data=data)


@app.route('/add', methods=['GET', 'POST'])
def add_image():
    data = {}
    owner = User.query.first()
    data["name"] = owner.name
    print owner
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
