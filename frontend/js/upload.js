function upload(file, signed_request, url, done) {
      var xhr = new XMLHttpRequest();
      xhr.open("PUT", signed_request);

      xhr.setRequestHeader('x-amz-acl', 'public-read');
      console.log(xhr);
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
      console.log(xhr.responseText);
      var response = xhr.responseText;
      done(response);
    }
  }
  xhr.send();
}

document.getElementById("image").onchange = function() {
  var files = document.getElementById("image").files;
   
  if (!files) return;
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    sign_request(file, function(response) {
        response = JSON.parse(response);
        console.log('Rsp:' + response);
        upload(file, response['signed_request'], response['url'], function() {
          $('body').append("<img src='" + response['url'] +"'></img>");
          var post = $.post('/photos/', 
                {"city": $('#cityInput').val(),
			     "fileName": file.name,
                 "title": $('#title').val(),
                 "upload_key": $('#upload_key').val()});
          post.done(function(data) {
              $('body').append('<p>'+file.name+'</p');
          });
        });
     });
   }
};



