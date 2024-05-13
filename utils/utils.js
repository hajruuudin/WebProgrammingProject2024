var Utils = {
    // Initializing the Single Page Application:
    init_spapp : function() {
        let app = $.spapp({
            defaultView: "#rundown",
            templateDir: "./pages/"
        });
        
        app.run();
    },

    // Blocking the UI to prevent excessive form submissions:
    blockUi : function(element){
            $(element).block({
                message:
                '<div class="spinner-border text-primary" role="status"></div>',
                css: {
                    backgroundColor: "transparent",
                    border: "0"
                }
            });
    },

    // Unblocking the UI after the form submission:
    unblockUi : function(element){
         $(element).unblock();
    },

    // Setting the item to the local storage:
    set_to_localstorage: function(key, value){
        window.localStorage.setItem(key, JSON.stringify(value));
    },

    // Getting the item from the local storage:
    get_item_from_localstorage: function(key){
        return JSON.parse(window.localStorage.getItem(key));
    },

    // Logging out the user:
    log_out: function() {
        window.localStorage.clear();
        window.location = "login";
    },

    // Getting items for the select input
    get_select_items: function(form){
        var userId = Utils.get_item_from_localstorage("user").id;
        var url = 'backend/items/' + userId;
        $(form).select2({
            theme: "classic",
            ajax: {
                url: url, // Endpoint to fetch clothes data
                dataType: 'json',
                headers: {
                    "Authentication": Utils.get_item_from_localstorage("user").token
                },
                processResults: function(data) {
                    return {
                        results: data.map(function(cloth) {
                            return {
                            id: cloth.id,
                            text: cloth.name // Assuming cloth objects have a 'name' property
                            };
                        })
                    };
                }
            }
        });
    },

    // Logging items from the select input
    log_items: function(form){
        $(form).submit(function(event) {
            event.preventDefault();
            
            // Gather selected clothes from Select2 input
            var selectedClothes = $('#selectClothes').val();
            console.log(selectedClothes);
            
            $.ajax({
            url: 'backend/items/log/', // Endpoint to handle form submission
            method: 'POST',
            beforeSend: function(xhr){
                xhr.setRequestHeader(
                    "Authentiaction", 
                    Utils.get_item_from_localstorage("token")
                )
            },
            contentType: 'application/json',
            data: JSON.stringify({ items: selectedClothes }),
            success: function(response) {
                $('#selectClothes').val(null).trigger('change');
                Toasts.sucess_a("Items have been logged!");
                console.log('Wear count updated successfully');
            },
            error: function(xhr, status, error) {
                // Handle error response
                console.error('Error updating wear count:', error);
            }
            }
            );
        })
    }
};
