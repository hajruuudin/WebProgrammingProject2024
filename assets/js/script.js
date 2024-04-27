// Making the topbar change style based on scrolling:
$(window).scroll(function() {
    if ($(this).scrollTop() > 0) {
        $(".topbar").css({
            "box-shadow" : "0px 0px 20px rgba(0,0,0,0.5)",
            "background-color" : "#FFFFFF",
            "padding-right" : "20px",
            "padding-left" : "20px",
            })
    } else {
        $(".topbar").css({
            "box-shadow" : "none",
            "background-color" : "#E1F4FF",
            "padding-right" : "10px",
            "padding-left" : "10px",})
    }
});