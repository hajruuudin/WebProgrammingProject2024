var Constants = {
    get_base_api_url: function(){
        if(location.hostname == "localhost"){
            return'http://localhost/webProgrammingProject2024/'
        } else {
            return 'https://clownfish-app-cikj6.ondigitalocean.app/'
        }
    }
}