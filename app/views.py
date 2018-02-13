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

@app.route("/test-two")
def test2():
    return render_template('test-two.html')

@app.route("/new", methods=['GET', 'POST'])
def new():
    print request.form
    print request.files
    return render_template('new.html')

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
