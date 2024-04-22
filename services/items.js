var ItemsService = {
    get_items: function(){
        $.get(Constants.API_BASE_URL + "backend/get_clothes.php", (clothes) => {
            console.log(clothes);
            let itemCards = "";
            clothes.forEach((item) => {
                itemCards +=
                    `
                        <div class="col-lg-3 col-m-4 col-6 mb-2">
                            <a href="#itemDescription" id="${item.id}" class="itemCardSelect" onclick="ItemsService.get_item_description(${item.id})">
                                <div class="itemData d-flex flex-column align-items-center">
                                    <img src="${item.img_dir}" alt="item" class="itemImage">
                                    <h4 class="itemName">${item.name}</h4>
                                    <p class="itemCategory ${item.categoryName}">${item.categoryName}</p>
                                    <p class="itemWearCount"><span>Count:</span>${item.wear_count}</p>
                                </div>
                            </a>
                        </div>
                    `
            });
            document.getElementById("clothesContainer").innerHTML = itemCards;
        });
    },

    get_item_description: function(itemId){
        setTimeout(function () {
            $.getJSON(Constants.API_BASE_URL + "backend/get_clothes.php", (clothes) => {
                const selectedItem = clothes.find(item => item.id === parseInt(itemId));
                if (selectedItem) {
                    $("#itemDescriptionBody").html(
                        `
                                <div class="col-xl-6 col-12 align-items-center p-4">
                                    <img src="${selectedItem.img_dir}" alt="" height="600px" id="addThingImage" class="m-3 rounded">
                                </div>
                                <div class="col-xl-6 col-12 p-5">
                                    <h1 class="h1 mb-2 text-gray-800 font-weight-bold">${selectedItem.name}</h1>
                                    <p class="descriptionName">Name: <span>${selectedItem.name}</span></p>
                                    <p class="descriptionName">Brand: <span>${selectedItem.brand}</span></p>
                                    <p class="descriptionName">Season: <span>${selectedItem.weatherName} / ${selectedItem.weatherName}</span></p>
                                    <p class="descriptionName">Category: <span class="tshirt">${selectedItem.categoryName}</span></p>
                                    <p class="descriptionName">Description: <span>${selectedItem.description}</span></p>
                                    <p class="descriptionName">Wear Count: <span>${selectedItem.wear_count}</span></p>
                                    <p class="descriptionName">Data Added: <span>${selectedItem.date_added}</span></p>
                                        <div class="btn-group-vertical" role="group">
                                            <a href="#wardrobe" onclick="ItemsService.get_items()"><button class="btn btn-primary mt-2 mb-2">Return To wardrobe</button></a>
                                            <div class=""btn-group" role="group"> 
                                                <a><button class="btn btn-danger mt-2 mb-2" data-toggle="modal" data-target="#deleteItemModal">Delete</button></a>
                                                <a><button class="btn btn-warning mt-2 mb-2" onclick="ItemsService.get_item_by_id(${selectedItem.id})">Edit Item</button></a>
                                            </div>
                                        </div>
                                </div>
                            `
                    );

                    $("#deleteItemModal").html(
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
                                <p><strong>${selectedItem.name}</strong></p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-danger" onclick="ItemsService.delete_item(${selectedItem.id})" data-dismiss="modal">Yes, Delete</button>
                            </div>
                            </div>
                        </div>
                        `
                    )
                } else {
                    console.log("Item not found.");
                }
            })
        }, 10)
    },

    delete_item: function(itemid){
        RestClient.delete(
            "backend/delete_items.php?id=" + itemid,
            {},
            function(){
                Toastify({
                    text: "Item has been deleted",
                    duration: 3000,
                    newWindow: true,
                    close: true,
                    gravity: "bottom", // `top` or `bottom`
                    position: "center", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                      background: "linear-gradient(to right, #A10000, #9400D3)",
                    },
                  }).showToast();
                  window.location.href = "#wardrobe";
                  ItemsService.get_items();
            },
            function(){alert("SUM TING WONG")}
        )
    },

    get_item_by_id: function(itemid) {
        RestClient.get(
            "backend/get_item.php?id=" + itemid,
            function(data){
                console.log(data);
                $("#editClothesModal").modal("toggle");
                $("#editClothesForm input[name='id']").val(data.id);
                $("#editClothesForm input[name='name']").val(data.name);
                $("#editClothesForm input[name='brand']").val(data.brand);
                $("#editClothesForm input[name='description']").val(data.description);
                $("#editClothesForm input[name='size']").val(data.size);
                $("#editClothesForm input[name='date_added']").val(data.date_added);
                $("#editClothesForm select[name='item_categoryID']").val(data.item_categoryID);
                $("#editClothesForm select[name='weatherID']").val(data.weatherID);
                $("#editClothesForm select[name='rating']").val(data.rating);
            },
            function(){
                alert("SUM TING WONG")
            }
        )
    }
}

