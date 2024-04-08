//Counters that keeps track of itemID and outfitID, not specified in the form:
itemCounter = 12;
outfitCounter = 3;

//Array to hold data for clothes:
var clothes = [];
var outfits = []


//Validation and Submitting form data for form: Add Clothes
$("#addClothesForm").validate({
    rules: {
        itemName: {
            required : true,
            minlength : 4
        },
        itemBrand: {
            required : true
        },
        itemDescription: {
            required: false,
            maxlength: 30
        },
        itemSize: {
            required: true,
        }
    },
    messages: { 
        itemName: {
            required: "Please enter this field!",
            minlength: "Item name must be at least 3 letter long!"
        },
        itemBrand: {
            required: "Item must have a brand/creator/sellee!"
        },
        itemDescription: {
            maxlength: "Descrption length is too long!"
        },
        itemSize: {
            required: "Item must have a size!"
        }
    },
    submitHandler: function(form, event){
        event.preventDefault();
        blockUI("#addClothesModal");

        let data = serializeItemForm(form);
        clothes.push(data);
        $("#addClothesForm")[0].reset();
        console.log(clothes);


        unblockUI("#addClothesModal");
    }
});

//Validation and Submitting form data for form: Add Outfits
$("#addOutfitsForm").validate({
    rules: {
        outfitName: {
            required: true,
            minlength : 5
        },
        outfitDescription: {
            maxlength: 30
        }
    },
    messages: {
        outfitName: {
            required: "Outfit name is required",
            minlength : "Outfit name must be atleast 5 characters long!"
        },
        outfitDescription: {
            maxlength: "Outfit description is too long!"
        }
    },
    submitHandler: function(form, event) {
        event.preventDefault();
        blockUI("#addOutfitModal");

        let data = serializeOutfitForm(form);
        outfits.push(data);
        $("#addOutfitsForm")[0].reset();
        console.log(outfits);


        unblockUI("#addOutfitModal");
    }
});

serializeItemForm = (form) => {
    let result = {};
    result["itemID"] = ++itemCounter;
    $.each($(form).serializeArray(), function(){
        result[this.name] = this.value; 
    });
    return result;
}

serializeOutfitForm = (form) => {
    let result = {};
    result["outfitID"] = ++outfitCounter;
    $.each($(form).serializeArray(), function(){
        result[this.name] = this.value; 
    });
    return result;
}

blockUI = (element) => {
    $(element).block({
        message:
        '<div class="spinner-border text-primary" role="status"></div>',
        css: {
            backgroundColor: "transparent",
            border: "0"
        }
    });
}

unblockUI = (element) => {
    $(element).unblock();
}
