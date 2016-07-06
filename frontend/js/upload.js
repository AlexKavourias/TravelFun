var editFormState = 0;

function upload(file, signed_request, url, done) {
      var xhr = new XMLHttpRequest();
      xhr.open("PUT", signed_request);

      xhr.setRequestHeader('x-amz-acl', 'public-read');
      xhr.onload = function() {
        if (xhr.status === 200) {
          done()
        }
      };
      xhr.send(file);
}

function sign_request(file, done) {
  var xhr = new XMLHttpRequest()
  xhr.open("GET", "/photos/sign?file_name=" + file.name + "&file_type=" + file.type + "&upload_key=" + $("#upload_key").val())

  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200) {
      //console.log(xhr.responseText);
      var response = xhr.responseText;
      done(response);
    }
  }
  xhr.send();
}

document.getElementById("image").onchange = function() {
  var files = document.getElementById("image").files;
  console.log(files)
  if (!files) return;
  fileList = [];
  for (var i=0; i < files.length; i++)
    fileList.push(files[i]);
  console.log(fileList);
   
  fileList.forEach(function(file) {
    getCurrentLocation(function(location) {
        sign_request(file, function(response) {
            console.log(file.name + "\t" + JSON.parse(response));
            response = JSON.parse(response);
            upload(file, response['signed_request'], response['url'], function() {      
                addEditForm(file, location["city"]);
            });
        });
    });
  });
}

function addEditForm(file, city) {
    var fileName = file.name.split('.')[0];
    appendEditForm(fileName, city);
    //Register listeners
    readURL(file, function(e) {
        $('#img' + fileName).attr('src', e.target.result);
    });
    $('#form' + file.name.split('.')[0]).on('submit', function(e) {
      e.preventDefault();
      $.post("/photos/", {
            "city": $($('#form' + fileName).find("input")[1]).val(),
            "fileName": file.name,
            "title": $($('#form' + fileName).find("input")[0]).val(),
            "upload_key": $('#upload_key').val()},
            function() {
                $('#' + fileName).append("<p style='color:green;'>Successfully uploaded image</p>");
            },
            function() {
                $('#' + fileName).append("<p style='color:red;'> Failed to upload image</p>");
            });
    });
};

function appendEditForm(fileName, city) {
     var form = "<div class='col-sm-4 col-md-4 col-lg-4 col-xs-12'>" +
            "<div class='photo' id='" + fileName + "'><form id='form" + fileName + "' class='form-group' action='/photos/' method='POST'>" +
            "<div class='preview-photo'>" +
            "<img src='#' id='img" + fileName + "'/></div>" +
            "<div class='photo-input'>" +
                "<input class='form-control' type='text' name='title' placeholder='title'>" +
            "</div>" +
            "<div class='photo-input'>" +
                "<input class='form-control' type='text' name='city' value='" + city + "'>" +
            "</div>" +
            "<div class='photo-input'>" +
                "<input class='form-control' type='submit' value='upload'>" +
            "</div>" +
            "</form></div></div>";
    var rows = $("body").find("div[class='row']");
    if (rows.length == 2) {
        $('#photos').append("<div class='row'>" + form + "</div>");    
    } else {
        var row = $(rows[rows.length-1]);
        var photos = row.find("div[class='photo']");
        if (photos.length == 3) {
            $('#photos').append("<div class='row'>" + form + "</div>");    
        } else {
            $(row).append(form);
        } 
    }
}

function readURL(url, done) {
    var reader = new FileReader();
    reader.onload = done;
    reader.readAsDataURL(url);
};
