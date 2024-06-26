var RestClient = {
    get: function (url, callback, error_callback) {
      $.ajax({
        url: Constants.get_base_api_url() + url,
        type: "GET",
        beforeSend: function(xhr){
          if(Utils.get_item_from_localstorage("user")){
            xhr.setRequestHeader(
              "Authentication",
              Utils.get_item_from_localstorage("user").token
            );
          }
        },
        success: function (response) {
          if (callback) callback(response);
        },
        error: function (jqXHR, textStatus, errorThrown) {
          if (error_callback) error_callback(jqXHR);
        },
      });
    },
    request: function (url, method, data, callback, error_callback) {
      $.ajax({
        url: Constants.get_base_api_url() + url,
        type: method,
        data: data,
        beforeSend: function(xhr){
          if(Utils.get_item_from_localstorage("user")){
            xhr.setRequestHeader(
              "Authentication",
              Utils.get_item_from_localstorage("user").token
            );
          }
        },
        processData: false,
        contentType: false,
      })
        .done(function (response, status, jqXHR) {
          if (callback) callback(response);
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
          if (error_callback) {
            error_callback(jqXHR);
          } else {
            Toastify({
                text: "REQUEST ERROR",
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "left", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
              }).showToast();;
          }
        });
    },
    post: function (url, data, callback, error_callback) {
      RestClient.request(url, "POST", data, callback, error_callback);
    },
    delete: function (url, data, callback, error_callback) {
      RestClient.request(url, "DELETE", data, callback, error_callback);
    },
    put: function (url, data, callback, error_callback) {
      RestClient.request(url, "PUT", data, callback, error_callback);
    },

    
  };