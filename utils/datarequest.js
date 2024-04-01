// Fetching the data for clothes and displaying on the wardrobe.html
_getClothes = () => {
    $.get("assets/jsonData/clothes.json", (clothes) => {
        data = JSON.parse(clothes);
        let itemCards = "";
        data.forEach((item) => {
            itemCards +=
                `
                    <div class="col-lg-3 col-m-4 col-6 mb-2">
                        <a href="#itemDescription" id="${item.itemID}" class="itemCardSelect">
                            <div class="itemData d-flex flex-column align-items-center">
                                <img src="${item.itemImage}" alt="item" class="itemImage">
                                <h4 class="itemName">${item.itemName}</h4>
                                <p class="itemCategory ${item.itemCategory}">${item.itemCategory}</p>
                                <p class="itemWearCount"><span>Count:</span>${item.itemWearCount}</p>
                            </div>
                        </a>
                    </div>
                `
        });
        document.getElementById("clothesContainer").innerHTML = itemCards;
    });
}

// Creating itemDescription.html for each individual piece of clothing
$(document).on("click", ".itemCardSelect", function () {
    const itemId = $(this).attr("id");

    setTimeout(function () {
        $.getJSON("assets/jsonData/clothes.json", (clothes) => {
            const selectedItem = clothes.find(item => item.itemID === parseInt(itemId));
            if (selectedItem) {
                $("#itemDescriptionBody").html(
                    `
                            <div class="col-xl-6 col-12 align-items-center p-4">
                                <img src="${selectedItem.itemImage}" alt="" height="600px" id="addThingImage" class="m-3 rounded">
                            </div>
                            <div class="col-xl-6 col-12 p-5">
                                <h1 class="h1 mb-2 text-gray-800 font-weight-bold">${selectedItem.itemName}</h1>
                                <p class="descriptionName">Name: <span>${selectedItem.itemName}</span></p>
                                <p class="descriptionName">Brand: <span>${selectedItem.itemBrand}</span></p>
                                <p class="descriptionName">Season: <span>${selectedItem.itemSeasonPrim} / ${selectedItem.itemSeasonSec}</span></p>
                                <p class="descriptionName">Category: <span class="tshirt">${selectedItem.itemCategory}</span></p>
                                <p class="descriptionName">Description: <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id quam qui quo dolores voluptate earum molestiae recusandae velit sequi mollitia eaque iusto rem quis accusamus officiis voluptatibus, maiores explicabo at doloribus dignissimos aperiam nam ea. Esse nam, maiores a fugit totam, magnam, pariatur ullam possimus quasi doloribus illo in tempore?</span></p>
                                <p class="descriptionName">Wear Count: <span>${selectedItem.itemWearCount}</span></p>
                                <p class="descriptionName">Data Added: <span>${selectedItem.itemDate}</span></p>
                                <a href="#wardrobe"><button class="btn btn-primary">Return To wardrobe</button></a>
                            </div>
                        `
                );
            } else {
                console.log("Item not found.");
            }
        })
    }, 10)


});

// Fetching the data for outfits and displaying on outfits.html
_getOutfits = () => {
    $.get("assets/jsonData/outfits.json", (clothes) => {
        data = JSON.parse(clothes);
        let outfitCards = "";
        data.forEach((outfit) => {
            outfitCards +=
                `
                    <div class="col-lg-4 col-6 mb-2">
                        <a href="#outfitDescription" id="${outfit.outfitID}" class="styleCardSelect">
                            <div class="styleData d-flex flex-column align-items-center">
                                <img src="${outfit.outfitImage}" alt="jeans" class="styleImage">
                                <h3 class="styleName">${outfit.outfitName}</h3>
                                <p class="styleCategory ${outfit.outfitCategory}">${outfit.outfitCategory}</p>
                                <p class="styleSeason">${outfit.outfitSeasonPrim} / ${outfit.outfitSeasonSec}</p>
                                <p class="styleRating">${outfit.outfitRating}</p>
                            </div>
                        </a>
                    </div>
                `
        });
        document.getElementById("outfitsContainer").innerHTML = outfitCards;
    });
}

// Creating outfitDescription.html for each individual outfit
$(document).on("click", ".styleCardSelect", function () {
    const outfitId = $(this).attr("id");
    console.log("Style ID:", outfitId); // Check if itemId is retrieved correctly

    setTimeout(function () {
        $.getJSON("assets/jsonData/outfits.json", (outfits) => {
            // Ensure clothes is an array
            console.log(outfits);

            const selectedOutfit = outfits.find(outfit => outfit.outfitID === parseInt(outfitId));
            if (selectedOutfit) {
                console.log("Outfit has been found!");
                $("#outfitDescriptionBody").html(
                    `
                        <div class="col-xl-7 col-12 align-items-center p-4">
                            <img src="${selectedOutfit.outfitImage}" alt="" height="600px" id="addThingImage" class="m-3">
                        </div>
                        <div class="col-xl-5 col-12 p-5">
                            <h1 class="h1 mb-2 text-gray-800 font-weight-bold">${selectedOutfit.outfitName}</h1>
                            <p class="descriptionName">Name: <span>${selectedOutfit.outfitName}</span></p>
                            <p class="descriptionName">Season: <span>${selectedOutfit.outfitSeasonPrim} / ${selectedOutfit.outfitSeasonSec}</span></p>
                            <p class="descriptionName">Style: <span class="style-formal">${selectedOutfit.outfitCategory}</span></p>
                            <p class="descriptionName">Description: <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id quam qui quo dolores voluptate earum molestiae recusandae velit sequi mollitia eaque iusto rem quis accusamus officiis voluptatibus, maiores explicabo at doloribus dignissimos aperiam nam ea. Esse nam, maiores a fugit totam, magnam, pariatur ullam possimus quasi doloribus illo in tempore?</span></p>
                            <p class="descriptionName">Rating: <span class="styleRating">${selectedOutfit.outfitRating}</span></p>
                            <p class="descriptionName">Data Added: <span>${selectedOutfit.outfitDate}</span></p>
                            <a href="#outfits"><button class="btn btn-primary">Return To Outfits</button></a>
                        </div>
                        `
                );
            } else {
                console.log("Outfit not found.");
            }
        });
    }, 10)
});

getClothes = () => {
    setTimeout(_getClothes, 5);
}


getOutfits = () => {
    setTimeout(_getOutfits, 10);
}

