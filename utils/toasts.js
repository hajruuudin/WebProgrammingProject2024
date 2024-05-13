var Toasts = {
    sucess_a: function(message){
        Toastify({
            text: message,
            style: {
                background: "linear-gradient(to right, #add8e6, #00FFFF)"
            },
            duration: 1000,
            gravity: "bottom", // `top` or `bottom`
            position: "center",
        }).showToast();
    },

    sucess_b: function(message){
        Toastify({
            text: message,
            style: {
                background: "linear-gradient(to right, #add8e6, #00FF00)"
            },
            duration: 1000,
            gravity: "bottom", // `top` or `bottom`
            position: "center",
        }).showToast();
    },

    sucess_c: function(message){
        Toastify({
            text: message,
            style: {
                background: "linear-gradient(to right, #90EE90, #FFB6C1)"
            },
            duration: 1000,
            gravity: "bottom", // `top` or `bottom`
            position: "center",
        }).showToast();
    },

    fail_a: function(message){
        Toastify({
            text: message,
            style: {
                background: "linear-gradient(to right, #8B0000, #8B4513)"
            },
            duration: 1000,
            gravity: "bottom", // `top` or `bottom`
            position: "center",
        }).showToast();
    },

    fail_b: function(message){
        Toastify({
            text: message,
            style: {
                background: "linear-gradient(to right, #8B0000, #800080)"
            },
            duration: 1000,
            gravity: "bottom", // `top` or `bottom`
            position: "center",
        }).showToast();
    },

    fail_c: function(message){
        Toastify({
            text: message,
            style: {
                background: "linear-gradient(to right, #8B0000, #000000)"
            },
            duration: 1000,
            gravity: "bottom", // `top` or `bottom`
            position: "center",
        }).showToast();
    },

    info: function(message){
        Toastify({
            text: message,
            style: {
                background: "linear-gradient(to right, #FFFF00, #FFA500)"
            },
            duration: 1000,
            gravity: "bottom", // `top` or `bottom`
            position: "center",
        }).showToast();
    },

    warning: function(message){
        Toastify({
            text: message,
            style: {
                background: "linear-gradient(to right, #D8BFD8, #FF00FF)"
            },
            duration: 1000,
            gravity: "bottom", // `top` or `bottom`
            position: "center",
        }).showToast();
    },
}