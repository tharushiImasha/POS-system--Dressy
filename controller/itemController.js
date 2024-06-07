const itemForm = document.getElementById("item-registration-form")
const itemTableBody = document.getElementById('item-table').querySelector('tbody');

document.getElementById("item-update").style.display = "none"

if(items.length == 0){
    document.getElementById("costumeId").value = 'I00-001';
}else{
    generateItemId()
}

function generateItemId(){
    let currentItemId = items[items.length-1].costumeId;
    let prefixItem = currentItemId.slice(0, 4); // get the prefix 'C00-'
    let itemNumPart = parseInt(currentItemId.slice(4), 10); // get the numerical part, e.g., 1
    let newitemNumPart = (itemNumPart + 1).toString().padStart(3, '0'); // increment and pad with zeros if necessary
    let newItemId = prefixItem + newitemNumPart;
    $('#costumeId').val(newItemId);
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


itemForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if(validateItemForm()){
        let costumeId =  document.getElementById("costumeId").value;
        let type =  document.getElementById("type").value;
        let color =  document.getElementById("color").value;
        let amount =  document.getElementById("amount").value;
        let price =  document.getElementById("price").value;    

        item = {
            costumeId, type, color, amount, price
        }

        items.push(item);

        buildItemTable()

        itemForm.reset();
        generateItemId();
        loadItemIds();
    }

    
});

let items_table = document.getElementById('my-item-table')

function buildItemTable(){

    itemTableBody.innerHTML = '';
    items.forEach(function (element, index) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${element.costumeId}</td>
            <td>${element.type}</td>
            <td>${element.color}</td>
            <td>${element.amount}</td>
            <td>${element.price}</td>
            <td class = "actionBtn">
                <button onclick="deleteItemData(${index})" class="btn btn-danger"><i class="fa fa-trash" aria-hidden="true"></i></button>
                <button onclick="updateItemData(${index})" class="btn btn-warning m-2"><i class="fa fa-pencil" aria-hidden="true"></i></button>
            </td>
        `;
        itemTableBody.appendChild(row);
    });

}

function deleteItemData(index){
    items.splice(index, 1);
    buildItemTable();
}


function updateItemData(index){
    document.getElementById("item-update").style.display = "block"
    document.getElementById("item-add").style.display = "none"

    document.getElementById("costumeId").value = items[index].costumeId;
    document.getElementById("type").value = items[index].type;
    document.getElementById("color").value = items[index].color;
    document.getElementById("amount").value = items[index].amount;
    document.getElementById("price").value = items[index].price;

    document.querySelector('#item-update').onclick = function(){

        if(validateItemForm()){
            items[index].costumeId = document.getElementById("costumeId").value;
            items[index].type = document.getElementById("type").value;
            items[index].color = document.getElementById("color").value;
            items[index].amount = document.getElementById("amount").value;
            items[index].price = document.getElementById("price").value;

            buildItemTable();
            itemForm.reset();

            generateItemId();

            document.getElementById("item-update").style.display = "none"
            document.getElementById("item-add").style.display = "block"

            document.querySelector('#item-update').onclick = null;
        }

    }
}