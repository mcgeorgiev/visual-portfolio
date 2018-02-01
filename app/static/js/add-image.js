var crop = $('#thumbnail-preview').croppie({
  viewport: {
    width: 200,
    height: 200,
    type: 'square'
  },
  boundary: {
    width: 300,
    height: 300
  },
  enableExif: true
});

var crImage = "";
// x1, y1, x2, y2
var cropPoints = [];

$('#picture').on('change', function() {
  readFile(this);
});

$(window).mouseup(() => {
  if ($("#nextBtn").hasClass( "will-crop" )) {
    cropPoints = crop.croppie('get').points.slice(0);
    console.log(cropPoints);
    $("#crop_points").val(cropPoints);
  }
});

function readFile(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (event) {
      crImage = event.target.result;
      $("#preview").attr("src", crImage);
    };
    reader.readAsDataURL(input.files[0]);
  } else {
    alert('Sorry - you\'re browser doesn\'t support the FileReader API');
  }
}

function bind() {
  if (cropPoints.length == 0 ) {
    crop.croppie('bind', {
      url: crImage
    });
  } else {
    crop.croppie('bind', {
      url: crImage,
      points: cropPoints
    });
  }
}

var currentTab = 0;
showTab(currentTab);

function showTab(n) {
  bind();

  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == 1) {
    document.getElementById("nextBtn").classList.add("will-crop");
  } else {
    document.getElementById("nextBtn").classList.remove("will-crop");
  }


  if (n == (x.length - 1)) {
    console.log(cropPoints);
    document.getElementById("nextBtn").innerHTML = "Submit";

  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  fixStepIndicator(n)
}

function nextPrev(n) {
  var x = document.getElementsByClassName("tab");

  x[currentTab].style.display = "none";
  currentTab = currentTab + n;
  if (currentTab >= x.length) {
    document.getElementById("add-form").submit();
    return false;
  }
  showTab(currentTab);
}

function fixStepIndicator(n) {
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  x[n].className += " active";
}
