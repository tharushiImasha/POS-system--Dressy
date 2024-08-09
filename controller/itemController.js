const itemForm = document.getElementById("item-registration-form")
const itemTableBody = document.getElementById('item-table').querySelector('tbody');

document.getElementById("item-update").style.display = "none"

if(items.length == 0){
    document.getElementById("costumeId").value = 'I00-001';
}else{
    fetchItems();
}

function getNextItemId(itemData) {
    let maxIdNum = 0;
    itemData.forEach(item => {
        let idNum = parseInt(item.costume_id.split('-')[1]);
        if (idNum > maxIdNum) {
            maxIdNum = idNum;
        }
    });
    return generateItemId(maxIdNum + 1);
}

function generateItemId(idNum) {
    let idStr = idNum.toString().padStart(3, '0'); // Pad the number to 3 digits
    let newId = `I00-${idStr}`;
    $('#costumeId').val(newId);
}

function validateItemForm(){
    let costumeId =  document.getElementById("costumeId").value;
    let type =  document.getElementById("type").value;
    let color =  document.getElementById("color").value;
    let amount =  document.getElementById("amount").value;
    let price =  document.getElementById("price").value;

    if(costumeId == ""){
        $("#costumeIdError").text("Please enter item ID");
        $("#costumeId").css("border-color",  "red");
        return false;
    } else if (!(regexItemId.test($("#costumeId").val()))){
        $("#costumeIdError").text("Please enter valid ID");
        $("#costumeId").css("border-color",  "red");
        return false;
    }else{
        $("#costumeIdError").text("");
        $("#costumeId").css("border-color",  "#644592");
    }

    if(type == ""){
        $("#typeError").text("Please enter item's type");
        $("#type").css("border-color",  "red");
        return false;
    } else if (!(regexType.test($("#type").val()))){
        $("#typeError").text("Please enter valid type");
        $("#type").css("border-color",  "red");
        return false;
    }else{
        $("#typeError").text("");
        $("#type").css("border-color",  "#644592");
    }

    if(color == ""){
        $("#colorError").text("Please enter item's color");
        $("#color").css("border-color",  "red");
        return false;
    } else if(!(regexColor.test($("#color").val()))){
        $("#colorError").text("Please enter valid color");
        $("#color").css("border-color",  "red");
        return false;
    }else{
        $("#colorError").text("");
        $("#color").css("border-color",  "#644592");
    }

    if(amount == ""){
        $("#amountError").text("Please enter costume amount");
        $("#amount").css("border-color",  "red");
        return false;
    } else if (!(regexamount.test($("#amount").val()))){
        $("#amountError").text("Please enter valid amount");
        $("#amount").css("border-color",  "red");
        return false;
    }else{
        $("#amountError").text("");
        $("#amount").css("border-color",  "#644592");
    }

    if(price == ""){
        $("#priceError").text("Please enter item's price");
        $("#price").css("border-color",  "red");
        return false;
    } else if (!(regexPrice.test($("#price").val()))){
        $("#priceError").text("Please enter valid price");
        $("#price").css("border-color",  "red");
        return false;
    }else{
        $("#priceError").text("");
        $("#price").css("border-color",  "#644592");
    }

    return true;
}


function fetchItems() {

    $.ajax({
        url: "http://localhost:8080/Dressy/item",
        type: "GET",
        headers: {"Content-Type": "application/json"},
        success: function(res) {
            console.log('Response:', res); // Log the response to verify it's an array
            buildItemTable(res);
            getNextItemId(res);
        },
        error: function(err) {
            console.error('Failed to fetch customers data:', err);
        }
    });
}


itemForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if(validateItemForm()){
        let costumeId =  document.getElementById("costumeId").value;
        let type =  document.getElementById("type").value;
        let color =  document.getElementById("color").value;
        let amount =  document.getElementById("amount").value;
        let price =  document.getElementById("price").value;   
        let imgInput =  document.getElementById("img"); 

        const itemData = {
            costume_id:costumeId,
            type:type,
            color:color,
            amount:amount,
            price:price
        };

        const itemJson = JSON.stringify(itemData);

        $.ajax({
            url: "http://localhost:8080/Dressy/item",
            type: "POST",
            data: itemJson,
            headers: {"Content-Type": "application/json"},
            success:(res) => {
                console.log(JSON.stringify(res));
                fetchItems();
            },
            Error: (res) => {
                console.error(res);
            }
        });

        itemForm.reset();
    }

});


function generateStars(rating) {
    let starsHtml = '';
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            starsHtml += '<span class="fa fa-star checked"></span>';
        } else {
            starsHtml += '<span class="fa fa-star"></span>';
        }
    }
    return starsHtml;
}

const container = document.getElementById('costumes-cards');

function renderCards() {
    container.innerHTML = ''; // Clear previous cards
    items.forEach(cardData => {
        const card = document.createElement('div');
        card.className = 'cos-card';

        card.innerHTML = `
            <div class="image">
                <img src="${cardData.img}" alt="${cardData.costumeId}" class="cos-img">
            </div>
            <div class="card-content">
                <h3>${cardData.type}</h3>
                <div class="color">
                    <div class="rating">
                        ${generateStars(5)} <!-- Assuming a default rating -->
                    </div>
                    <p>Color : ${cardData.color}</p>
                </div>
                <p>Amount: ${cardData.amount}</p>
                <p class="price">${cardData.price}</p>
            </div>
        `;

        container.appendChild(card);
    });
}


let items_table = document.getElementById('my-item-table')

function buildItemTable(allItems){

    if (!Array.isArray(allItems)) {
        console.error('Expected an array but got:', allItems);
        return;
    }

    itemTableBody.innerHTML = '';
    allItems.forEach(function (element) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${element.costume_id}</td>
            <td>${element.type}</td>
            <td>${element.color}</td>
            <td>${element.amount}</td>
            <td>${element.price}</td>
            <td class = "actionBtn">
                <button onclick="deleteItemData('${element.costume_id}')" class="btn btn-danger"><i class="fa fa-trash" aria-hidden="true"></i></button>
                <button onclick='populateItemForm(${JSON.stringify(element)})' class="btn btn-warning m-2"><i class="fa fa-pencil" aria-hidden="true"></i></button>
            </td>
        `;
        itemTableBody.appendChild(row);
    });

}

$(document).ready(fetchItems);


function deleteItemData(id) {
    // Ask for confirmation before proceeding with the delete
    if (confirm("Are you sure you want to delete this item?")) {
        $.ajax({
            url: `http://localhost:8080/Dressy/item?costume_id=${id}`,
            type: "DELETE",
            success: function(res) {
                console.log('Delete Response:', res);
                fetchItems();
            },
            error: function(err) {
                console.error('Failed to delete item:', err);
            }
        });
    } else {
        console.log('Delete action canceled');
    }
}



function populateItemForm(itm) {

    document.getElementById('costumeId').value = itm.costume_id;
    document.getElementById('type').value = itm.type;
    document.getElementById('color').value = itm.color;
    document.getElementById('amount').value = itm.amount;
    document.getElementById('price').value = itm.price;

    document.getElementById("item-update").style.display = "block"
    document.getElementById("item-add").style.display = "none"
}

document.querySelector('#item-update').onclick = function(){

    const itemData = {
        costume_id:document.getElementById('costumeId').value,
        type:document.getElementById('type').value,
        color:document.getElementById('color').value,
        amount:document.getElementById('amount').value,
        price:document.getElementById('price').value
    };

    const itemJson = JSON.stringify(itemData);

    $.ajax({
        url: "http://localhost:8080/Dressy/item",
        type: "PUT",
        data: itemJson,
        headers: {"Content-Type": "application/json"},
        success: function(res, status, xhr) {
            if (xhr.status === 204) { // No Content
                console.log('Update item successfully');
                fetchItems(); // Refresh the table after update
            } else {
                console.error('Failed to update item:', res);
            }
        },
        error: function(err) {
            console.error('Failed to update item:', err);
            if (err.responseText) {
                console.log('Error details:', err.responseText); // Log detailed error response
            }
        }
    });

    document.getElementById("item-update").style.display = "none"
    document.getElementById("item-add").style.display = "block"

    document.querySelector('#item-update').onclick = null;

    customerForm.reset();

}

$("#costumeId").keydown(function (e) {

    if(e.keyCode == 16) {

        let id = document.getElementById("costumeId").value;
        
        for (let i = 0; i < items.length; i++) {
            if(id === items[i].costumeId){

                console.log("id = "+id)

                document.getElementById("costumeId").value = items[i].costumeId;
                document.getElementById("type").value = items[i].type;
                document.getElementById("color").value = items[i].color;
                document.getElementById("amount").value = items[i].amount;
                document.getElementById("price").value = items[i].price;
                document.getElementById("img").innerHTML = items[i].img

            }
        }

        if(id == ""){
            itemForm.reset();
            // generateItemId();
        }
    }
    
})
