var Utils = {
    //Initializing the Single Page Application:
    init_spapp : function() {
        let app = $.spapp({
            defaultView: "#rundown",
            templateDir: "./pages/"
        });
        
        app.run();
    },

    //Blocking the UI to prevent excessive form submissions:
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

    //Unblocking the UI after the form submission:
    unblockUi : function(element){
         $(element).unblock();
    }
};
