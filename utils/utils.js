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
            
            RestClient.post(
              "backend/items/log/",
              JSON.stringify({ items: selectedClothes }),
              function(response) {
                $('#selectClothes').val(null).trigger('change');
                Toasts.sucess_a("Items have been logged!");
                console.log('Wear count updated successfully');
            },
            function(xhr, status, error) {
              // Handle error response
              console.error('Error updating wear count:', error);
            }
    
          );
        })
    },

    //Displaying the quote
    display_quote: function(){
        var quotes = [
            {
              "quote": "Fashion is the armor to survive the reality of everyday life.",
              "author": "Bill Cunningham"
            },
            {
              "quote": "Style is a way to say who you are without having to speak.",
              "author": "Rachel Zoe"
            },
            {
              "quote": "Fashion fades, only style remains the same.",
              "author": "Coco Chanel"
            },
            {
              "quote": "You can have anything you want in life if you dress for it.",
              "author": "Edith Head"
            },
            {
              "quote": "The joy of dressing is an art.",
              "author": "John Galliano"
            },
            {
              "quote": "Clothes mean nothing until someone lives in them.",
              "author": "Marc Jacobs"
            },
            {
              "quote": "Style is something each of us already has, all we need to do is find it.",
              "author": "Diane von Furstenberg"
            },
            {
              "quote": "Fashions have done more harm than revolutions.",
              "author": "Victor Hugo"
            },
            {
              "quote": "Fashion is what you’re offered four times a year by designers. And style is what you choose.",
              "author": "Lauren Hutton"
            },
            {
              "quote": "Style is knowing who you are, what you want to say, and not giving a damn.",
              "author": "Orson Welles"
            },
            {
              "quote": "To me, clothing is a form of self-expression - there are hints about who you are in what you wear.",
              "author": "Marc Jacobs"
            },
            {
              "quote": "Fashion should be a form of escapism, and not a form of imprisonment.",
              "author": "Alexander McQueen"
            },
            {
              "quote": "Style is the perfection of a point of view.",
              "author": "Richard Eberhart"
            },
            {
              "quote": "Style is very personal. It has nothing to do with fashion. Fashion is over quickly. Style is forever.",
              "author": "Ralph Lauren"
            },
            {
              "quote": "Fashion is about dressing according to what’s fashionable. Style is more about being yourself.",
              "author": "Oscar de la Renta"
            },
            {
              "quote": "People will stare. Make it worth their while.",
              "author": "Harry Winston"
            },
            {
              "quote": "Fashion you can buy, but style you possess. The key to style is learning who you are, which takes years. There’s no how-to road map to style. It’s about self-expression and, above all, attitude.",
              "author": "Iris Apfel"
            },
            {
              "quote": "What you wear is how you present yourself to the world, especially today, when human contacts are so quick. Fashion is instant language.",
              "author": "Miuccia Prada"
            },
            {
              "quote": "One is never over-dressed or under-dressed with a Little Black Dress.",
              "author": "Karl Lagerfeld"
            },
            {
              "quote": "The best things you can do for your skin are not smoke, always use sunscreen and wear a full-length white gown.",
              "author": "Audrey Hepburn"
            }
        ];

        const randomIndex = Math.floor(Math.random() * quotes.length);
        
        let quote = 
            `
                <h2 class="smallHeading">"${quotes[randomIndex].quote}"</h2>
                <h4 class="smallSubheading"><em>${quotes[randomIndex].author}</em></h4>
            `

        document.getElementById("rundown-quote").innerHTML = quote;
          
    },
    
};

