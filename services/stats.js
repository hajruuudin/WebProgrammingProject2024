var StatsService = {
    get_categories: function(){
        var userId = Utils.get_item_from_localstorage("user").id;
        RestClient.get("backend/items/" + userId, (clothes) => {

            var clothes_count = clothes.length;
            var stats = {"T-Shirt" : 0, "Shirt" : 0, "Jackets" : 0, "Coats" : 0, "Jeans" : 0, "Shorts" : 0, "Sportswear" : 0, "Footwear" : 0, "Fragrance" : 0, "Underclothes" : 0, "Accessories" : 0, "Other" : 0};
            statsString = "";

            if(clothes.length == 0){
                statsString += 
                `
                    <h2 class="smallHeading">"No clothes added"</h2>
                    <h4 class="smallSubheading"><em>Add clothes to see your stats!</em></h4>
                `
            } else {
                clothes.forEach(item => {
                    stats[item.categoryName]++;
                })

                for(category in stats){
                    if(stats[category] == 0){
                        continue
                    } else {
                        statsString += 
                        `
                        <h4 class="small font-weight-bold">${category}<span class="float-right">${Math.round((stats[category] / clothes_count) * 100)}%</span></h4>
                        <div class="progress mb-4">
                            <div class="progress-bar stats-${category}" role="progressbar" style="width:${(stats[category] / clothes_count) * 100}%" aria-valuenow="${(stats[category] / clothes_count) * 100}" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        `
                    }
                }
            }

            document.getElementById("stats-container").innerHTML = statsString;
    
        
        });
    },

    get_chart: function(){
        var userId = Utils.get_item_from_localstorage("user").id;
        RestClient.get("backend/outfits/" + userId, (outfits) => {

            var outfits_count = outfits.length;
            var stats = {"Casual" : 0,"Formal" : 0, "Sportswear" : 0, "Techwear" : 0, "Old-Money" : 0, "Minimal" : 0, "Modern Fashion" : 0, "Elegant" : 0, "Other" : 0};
            var names = [];
            var data = [];

            outfits.forEach(outfit => {
                stats[outfit.categoryName]++;
            })

            if(outfits_count == 0){
                document.getElementById("chartContainer").innerHTML = 
                "<h2 class='smallHeading'>No outfits added</h2><h4 class='smallSubheading'><em>Add outfits to see your style!</em></h4>"
            } else {
                for(category in stats){
                    if(stats[category] == 0){
                        continue;
                    } else {
                        names.push(category);
                        data.push(
                            Math.round((stats[category] / outfits_count) * 100)
                        )
                    }
                }
    
                var chart = document.getElementById('chartCanvas');
                new Chart(chart, {
                    type: 'pie',
                    data: {
                      labels: names,
                      datasets: [{
                        label: 'Styles',
                        data: data,
                        borderWidth: 1
                      }]
                    },
                  });
            }
        });
    },

    get_frequent_clothes: function(){
        var userId = Utils.get_item_from_localstorage("user").id;
        RestClient.get("backend/items/" + userId, (clothes) => {
            var outputString = "";
            var counter = 1;
            if(clothes.length == 0){
                outputString += 
                `
                    <h2 class="smallHeading">"No clothes added"</h2>
                    <h4 class="smallSubheading"><em>Add clothes and log them to see your most frequent ones!</em></h4>
                `
            } else {
                for(item of clothes){
                    if(counter > 6){
                        break;
                    } else {
                        outputString +=
                        `
                            <div class="col-md-2 col-sm-4 col-6">
                                <a href="#wardrobe">
                                <div class="d-flex flex-column align-items-center justify-content-center">
                                    <img src="${item.img_dir}" class="itemImage myItem">
                                    <p class="itemName">${item.name}</p>
                                </div>
                                </a>
                            </div>
                        ` 
                        counter++;
                    }
                }
            }
           
            document.getElementById("frequent-clothes-container").innerHTML = outputString;
        });
    }
}