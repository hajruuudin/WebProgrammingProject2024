var FormValidation = {
    // Validating the form with the following custom parameters:
    // form: the form to validate
    // rules: the rules for the form fields
    // messages: the messages for the form fields
    // submit_handler_callback: the callback function to execute when the form is valid
    validateForm: function(form, rules, messages, submit_handler_callback){
        // Add custom validation method for the file size
        $.validator.addMethod("filesize", function(value, element, param) {
            // Convert file size from bytes to megabytes
            var maxSize = param * 1024 * 1024; // param is in MB
            return this.optional(element) || (element.files[0].size <= maxSize);
        }, "File size must be less than {0} MB.");
        
        $.validator.addMethod("filetype", function(value, element, param) {
            // Get the file extension
            var extension = value.split('.').pop().toLowerCase();
            // Check if the extension is in the allowed list
            return this.optional(element) || $.inArray(extension, param) !== -1;
        }, "Please select a valid file type.");
        
        $.validator.addMethod("aspectratio", function(value, element) {
            // Check if the aspect ratio of the image is 3:4
            var img = new Image();
            img.src = URL.createObjectURL(element.files[0]);
            var aspectRatio = img.width / img.height;
            return this.optional(element) || (Math.abs(aspectRatio - 4/3) < 0.1); // Adjust the tolerance as needed
        }, "Image must have a 3:4 aspect ratio.");

        var error = $(".alert_danger", form);
        var success = $(".alert_success", form);

        $(form).validate({
            rules: rules,
            messages: messages,
            submitHandler: function(form, event){
                event.preventDefault();
                success.show();
                error.hide();

                if(submit_handler_callback){
                    submit_handler_callback(FormValidation.serializeForm());
                }
            }
        });
    },

    // Serializing the form data into a data object that we can use to send to the server
    serializeForm: function(form){
        let result = {};
        $.each($(form).serializeArray(), function(){
            result[this.name] = this.value;
        });
        return result;
    }

    
}