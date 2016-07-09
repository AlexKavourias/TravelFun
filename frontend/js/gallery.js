function addLinks(city) {
    $.get('/photos/' + (city == "all" ? "" : (city == "" ? city : "city/" + city)), function(photos) {
        if (photos.length == 0) {
            $('#links').append("<div style='margin-left:40px;'><p> Oops! Haven't visited here yet, or I'm just being lazy </p</div>");
            return;
        }
        showButtons();
        photos.forEach(function (photo) {
            var row = $($('#links').find('row'));
            $('#links').append("<a href='https://s3.amazonaws.com/wherearealexandliam/photos/" + photo["file_name"] + "'" + 
                "title='" + photo["title"] +" (" + photo["city"] + ")' data-gallery>" +
            "<img src='https://s3.amazonaws.com/wherearealexandliamresized/resized-photos/" + photo["file_name"] + "' alt='Image'></a>");
        });
    });
}

function showButtons() {
   $('#image-gallery-button').toggle();
   $('#checkbox').toggle();
}

function addListeners() {
    $('#image-gallery-button').on('click', function (event) {
        event.preventDefault();
        blueimp.Gallery($('#links a'), $('#blueimp-gallery').data());
    });
    $('#borderless-checkbox').on('change', function () {
        var borderless = $(this).is(':checked')
        $('#blueimp-gallery').attr('data-use-bootstrap-modal', $('#blueimp-gallery').attr('data-use-bootstrap-modal') == "false");
        $('#blueimp-gallery').toggleClass('blueimp-gallery-controls', borderless)
    });
}

function addTitle(city) {
    $('#galleryTitle').append("<h1>" + (city == "all" ? "All Photos" : (city == "" ? "Most Recent Photos" : "Photos From " + city.replace('%20', ' ') + "</h1>")));
}

$(document).ready(function() {
    var city = window.location["pathname"].split('/');
    city = city.length < 3 ? "" : city[2];
    addTitle(city);
    addLinks(city);
    addListeners();
    $.get('/locations/', function (locations) {
        $('#galleryLinks').append("<div style='width:25%;float:left;'><a class='cityAnchor' id='all' href='/gallery/all'>All</a></div>");
        locations.forEach(function (location) {
            $('#galleryLinks').append("<div style='width:25%;float:left;'><a class='cityAnchor'" +
                 " href='/gallery/" + location["city"] + "'>" + location["city"] + "</a></div>");
        });
    });
});

