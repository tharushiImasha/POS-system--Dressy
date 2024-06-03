if(customers.length == 0){
    document.getElementById("orderId").value = 'O00-001';
}else{
    generateOrderId()
}

function generateOrderId(){
    let currentId = orders[orders.length-1].orderId;
    let prefix = currentId.slice(0, 4); 
    let numPart = parseInt(currentId.slice(4), 10); // get the numerical part, e.g., 1
    let newNumPart = (numPart + 1).toString().padStart(3, '0'); // increment and pad with zeros if necessary
    let newId = prefix + newNumPart;
    $('#orderId').val(newId);
}


var today = new Date().toISOString().split('T')[0];
document.getElementById('date').value = today;


function loadCusIds() {

    const select = document.getElementById('customerIdOrder')
    
    select.innerHTML = '<option selected></option>';

    let optionCus = '';

    for (let i = 0; i < customers.length; i++) {
        optionCus += '<option value="' + customers[i].cusId + '">' + customers[i].cusId + '</option>';
        console.log(customers[i].cusId)
    }

    $('#customerIdOrder').append(optionCus);
}


document.getElementById('customerIdOrder').addEventListener('change', function() {
    let selectedId = this.value;
    console.log(selectedId);

    for(let i = 0; i < customers.length; i++){
        if(customers[i].cusId === selectedId){
            document.getElementById('cusPhone').value = customers[i].phone;
            document.getElementById('cusAddress').value = customers[i].address;
            document.getElementById('cusName').value = customers[i].fullName;
        }
    }
});


function loadItemIds() {

    const selectItem = document.getElementById('itemIdOrder')
    
    selectItem.innerHTML = '<option selected></option>';

    let optionItem = '';

    for (let i = 0; i < items.length; i++) {
        optionItem += '<option value="' + items[i].costumeId + '">' + items[i].costumeId + '</option>';
        console.log(items[i].costumeId)
    }

    $('#itemIdOrder').append(optionItem);
}


document.getElementById('itemIdOrder').addEventListener('change', function() {
    let selectedItemId = this.value;

    for(let i = 0; i < items.length; i++){
        if(items[i].costumeId === selectedItemId){
            document.getElementById('itemName').value = items[i].type;
            document.getElementById('itemColor').value = items[i].color;
            document.getElementById('itemPrice').value = items[i].price;
            document.getElementById('itemQtyOnHand').value = items[i].amount;
        }
    }
});


function validateOrderForm(){
    let qty =  document.getElementById("orderQty").value;

    if(qty == ""){
        $("#orderQtyError").text("Please enter order quantity");
        $("#orderQty").css("border-color",  "red");
        return false;
    } else if (!(regexamount.test($("#orderQty").val()))){
        $("#orderQtyError").text("Please enter valid quantity");
        $("#orderQty").css("border-color",  "red");
        return false;
    }else{
        $("#orderQtyError").text("");
        $("#orderQty").css("border-color",  "#644592");
    }
}


const orderItemForm = document.getElementById("item-select-form")
const orderInvoiceDetForm = document.getElementById("invoice-details-form")
const orderInvoiceForm = document.getElementById("invoice-form")
const orderTableBody = document.getElementById('order-table').querySelector('tbody');

// document.getElementById("cus-update").style.display = "none"


document.querySelector('#addItem').onclick = function(){

    validateOrderForm();

    if(validateOrderForm){
        buildOrderTable()
        orderItemForm.reset();
        generateOrderId;
        console.log('weda')
    }
    
}

let ordertable = document.getElementById('my-order-table')

function buildOrderTable(){

    const itemIdOrder = $('#itemIdOrder').val();
    const itemName = $('#itemName').val();
    const itemPrice = $('#itemPrice').val();
    const orderQty = $('#orderQty').val();
    const orderTotal = $('#orderTotal').val();

    orderTableBody.innerHTML = '';
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${itemIdOrder}</td>
        <td>${itemName}</td>
        <td>${itemPrice}</td>
        <td>${orderQty}</td>
        <td>${orderTotal}</td>
        <td>
            <button onclick="deleteRow(this)" class="btn btn-danger">Delete</button>
            <button onclick="editRow(this)" class="btn btn-warning m-2">Edit</button>
        </td>
    `;
    orderTableBody.appendChild(row);

}

function deleteRow(button) {
    const row = button.closest('tr');
    row.parentNode.removeChild(row);
}

function editRow(button) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');

    document.getElementById('itemIdOrder').value = cells[0].textContent;
    document.getElementById('itemName').value = cells[1].textContent;
    document.getElementById('itemPrice').value = cells[2].textContent;
    document.getElementById('orderQty').value = cells[3].textContent;
    document.getElementById('orderTotal').value = cells[4].textContent;
    // document.getElementById('itemColor').value = ''
    // document.getElementById('itemQtyOnHand').value = ''

    deleteRow(button);
}

function deleteData(index){
    customers.splice(index, 1);
    buildTable();
}


function updateData(index){
    document.getElementById("cus-update").style.display = "block"
    document.getElementById("cus-add").style.display = "none"

    document.getElementById("cusId").value = customers[index].cusId;
    document.getElementById("fullName").value = customers[index].fullName;
    document.getElementById("email").value = customers[index].email;
    document.getElementById("address").value = customers[index].address;
    document.getElementById("phone").value = customers[index].phone;

    document.querySelector('#cus-update').onclick = function(){

        if(validateForm()){
            customers[index].cusId = document.getElementById("cusId").value;
            customers[index].fullName = document.getElementById("fullName").value;
            customers[index].email = document.getElementById("email").value;
            customers[index].address = document.getElementById("address").value;
            customers[index].phone = document.getElementById("phone").value;

            buildTable();
            customerForm.reset();

            generateId();

            document.getElementById("cus-update").style.display = "none"
            document.getElementById("cus-add").style.display = "block"

            document.querySelector('#cus-update').onclick = null;
        }

    }
}




$('#purchase').click(function (){

    let orderId =  document.getElementById("orderId").value;
    let fullName =  document.getElementById("fullName").value;
    let email =  document.getElementById("email").value;
    let address =  document.getElementById("address").value;
    let phone =  document.getElementById("phone").value;    
    order = {
        orderId, fullName, email, address, phone
    }

    orders.push(order);
    buildTable(customers)
    customerForm.reset();
    generateOrderId;

});