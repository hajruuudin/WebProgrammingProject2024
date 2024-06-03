var OutfitsService = {
    get_outfits: function () {
        var userId = Utils.get_item_from_localstorage("user").id;
        RestClient.get("backend/outfits/" + userId, (outfits) => {
            let outfitCards = "";
            if(outfits.length == 0){
                outfitCards += 
                `
                <h2 class="smallHeading">"No outfits to display :("</h2>
                <h4 class="smallSubheading"><em>Make sure to add some before looking at your wardrobe</em></h4>

                `
            } else {
                outfits.forEach((outfit) => {
                    outfitCards +=
                        `
                            <div class="col-lg-4 col-6 mb-2">
                                <a href="#outfitDescription" id="${outfit.id}" class="styleCardSelect" onclick="OutfitsService.get_outfit_description(${outfit.id})">
                                    <div class="styleData d-flex flex-column align-items-center">
                                        <img src="${outfit.img_dir}" alt="image" class="styleImage">
                                        <h3 class="styleName">${outfit.name}</h3>
                                        <p class="styleCategory ${outfit.categoryName}">${outfit.categoryName}</p>
                                        <p class="styleSeason">${outfit.weatherName}</p>
                                        <p class="styleRating">${outfit.rating}</p>
                                    </div>
                                </a>
                            </div>
                        `
                });
            }
            document.getElementById("outfitsContainer").innerHTML = outfitCards;
        });
    },

    get_outfits_rundown: function() {
        var userId = Utils.get_item_from_localstorage("user").id;
        RestClient.get(
            "backend/outfits/" + userId, (outfits) => {
                let outfitCards = "";
                let counter = 0;
                if(outfits.length == 0){
                    outfitCards += 
                        `
                        <h2 class="smallHeading">"No clothes to display"</h2>
                        <h4 class="smallSubheading"><em>Make sure to add some before viewing your wardrobe</em></h4>

                        `
                } else {
                    for(style of outfits){
                        if(counter >= 3){
                            break;
                        } else{
                            outfitCards +=
                            `
                            <div class="col-lg-4 col-12 mb-2">
                                <div class="styleData d-flex flex-column align-items-center">
                                    <img src="${style.img_dir}" alt="jeans" class="styleImageSmall">
                                    <h5 class="styleName">${style.name}</h5>
                                    <p class="styleCategory style-casual">${style.categoryName}</p>
                                    <p class="styleSeason">${style.weatherName}</p>
                                    <p class="styleRating">${style.rating}</p>
                                </div>
                            </div>
                            `
    
                            counter++;
                        }
                    
                    }
                }
                

                document.getElementById("rundown-styles").innerHTML = outfitCards;
            }
        )
    },


    get_outfit_description: function (outfitId) {
        setTimeout(function () {
            var userId = Utils.get_item_from_localstorage("user").id;
            RestClient.get("backend/outfits/" + userId, (outfits) => {
                const selectedOutfit = outfits.find(outfit => outfit.id === parseInt(outfitId));
                if (selectedOutfit) {
                    console.log("Outfit has been found!");
                    $("#outfitDescriptionBody").html(
                        `
                            <div class="col-xl-7 col-12 align-items-center p-4">
                                <img src="${selectedOutfit.img_dir}" alt="image" height="600px" id="addThingImage" class="m-3">
                            </div>
                            <div class="col-xl-5 col-12 p-5">
                                <h1 class="h1 mb-2 text-gray-800 font-weight-bold">${selectedOutfit.name}</h1>
                                <p class="descriptionName">Name: <span>${selectedOutfit.name}</span></p>
                                <p class="descriptionName">Season: <span>${selectedOutfit.weatherName}</span></p>
                                <p class="descriptionName">Style: <span class="style-formal">${selectedOutfit.categoryName}</span></p>
                                <p class="descriptionName">Description: <span>${selectedOutfit.description}</span></p>
                                <p class="descriptionName">Rating: <span class="styleRating">${selectedOutfit.rating}</span></p>
                                <p class="descriptionName">Data Added: <span>${selectedOutfit.date_added}</span></p>
                                <div class="btn-group-vertical" role="group">
                                <a href="#outfits" onclick="OutfitsService.get_outfits()"><button class="btn btn-primary mt-2 mb-2">Return To Outfits</button></a>
                                <div class=""btn-group" role="group"> 
                                    <a><button class="btn btn-danger mt-2 mb-2" data-toggle="modal" data-target="#deleteOutfitModal">Delete</button></a>
                                    <a><button class="btn btn-warning mt-2 mb-2" onclick="OutfitsService.get_outfit_by_id(${selectedOutfit.id})">Edit Outfit</button></a>
                                </div>
                            </div>
                            </div>
                            `
                    );

                    $("#deleteOutfitModal").html(
                        `
                            <div class="modal-dialog" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Delete Item</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <p>Are you sure you want to delete the following item from the wardrobe:</p>
                                <p><strong>${selectedOutfit.name}</strong></p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-danger" onclick="OutfitsService.delete_outfit(${selectedOutfit.id})" data-dismiss="modal">Yes, Delete</button>
                            </div>
                            </div>
                        </div>
                        `
                    )
                } else {
                    console.log("Outfit not found.");
                }
            });
        }, 10)
    },

    delete_outfit: function(outfitid){
        RestClient.delete(
            "backend/outfits/delete/" + outfitid,
            {},
            function(){
                Toasts.sucess_c("Outfit deleted from your wardrobe!")
                window.location.href = "#outfits";
                OutfitsService.get_outfits();
            },
            function(){alert("SUM TING WONG")}
        )
    },

    get_outfit_by_id: function(outfitid) {
        RestClient.get(
            "backend/outfits/get/" + outfitid,
            function(data){
                console.log(data);
                $("#editOutfitModal").modal("toggle");
                $("#editOutfitsForm input[name='id']").val(data.id);
                $("#editOutfitsForm input[name='name']").val(data.name);
                $("#editOutfitsForm select[name='outfit_categoryID']").val(data.outfit_categoryID);
                $("#editOutfitsForm input[name='description']").val(data.description);
                $("#editOutfitsForm select[name='rating']").val(data.rating);
                $("#editOutfitsForm select[name='weatherID']").val(data.weatherID);
                $("#editOutfitsForm input[name='date_added']").val(data.date_added);
            },
            function(){
                alert("SUM TING WONG")
            }
        )
    }
}