function upload(file, signed_request, url, done) {
      var xhr = new XMLHttpRequest()
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
      xhr.open("GET", "http://localhost:8000/photos/sign?file_name=" + file.name + "&file_type=" + file.type)

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
      var file = document.getElementById("image").files[0];
      if (!file) return;

      sign_request(file, function(response) {
        upload(file, response.signed_request, response.url, function() {
          console.log(response);
          document.getElementById("preview").src = response.url;
        });
      })
    }
