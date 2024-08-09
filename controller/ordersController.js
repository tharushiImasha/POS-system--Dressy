if(customers.length == 0){
    document.getElementById("orderId").value = 'O00-001';
}else{
    fetchOrders()
}

function getNextOrderId(orderData) {
    let maxIdNum = 0;
    orderData.forEach(order => {
        let idNum = parseInt(order.order_id.split('-')[1]);
        if (idNum > maxIdNum) {
            maxIdNum = idNum;
        }
    });
    return generateOrderId(maxIdNum + 1);
}

function generateOrderId(idNum) {
    let idStr = idNum.toString().padStart(3, '0'); // Pad the number to 3 digits
    let newId = `O00-${idStr}`;
    $('#orderId').val(newId);
}
function fetchOrders() {
    $.ajax({
        url: "http://localhost:8080/Dressy/order",
        type: "GET",
        headers: {"Content-Type": "application/json"},
        success: function(res) {
            console.log('Response:', res); 
            getNextOrderId(res)
        },
        error: function(err) {
            console.error('Failed to fetch order data:', err);
        }
    });
}

$(document).ready(fetchOrders);

var today = new Date().toISOString().split('T')[0];
document.getElementById('date').value = today;

function getDate(){
    var today = new Date().toISOString().split('T')[0];
    document.getElementById('date').value = today;
}

function fetchCustomers() {
    $.ajax({
        url: "http://localhost:8080/Dressy/customer",
        type: "GET",
        headers: {"Content-Type": "application/json"},
        success: function(res) {
            console.log('Response:', res); // Log the response to verify it's an array
            loadCusIds(res)
        },
        error: function(err) {
            console.error('Failed to fetch customers data:', err);
        }
    });
}

$(document).ready(fetchCustomers);


function loadCusIds(cust) {

    const selectCus = document.getElementById('customerIdOrder');
    selectCus.innerHTML = '<option selected></option>'; // Clear existing options

    cust.forEach(cust => {
        const option = document.createElement('option');
        option.value = cust.cus_id;
        option.textContent = cust.cus_id;
        selectCus.appendChild(option);
        console.log(cust.cus_id); // Log the costumeId
    });

    $('#customerIdOrder').select2({
        placeholder: "Select a customer",
        allowClear: true
    });

    $('#customerIdOrder').on('change', function() {
        let selectedcusId = $(this).val();
        console.log('Selected item ID:', selectedcusId);

        let cusFound = false;
        cust.forEach(getCus => {
            if (getCus.cus_id === selectedcusId) {  
                document.getElementById('cusPhone').value = getCus.phone;
                document.getElementById('cusAddress').value = getCus.address;
                document.getElementById('cusName').value = getCus.name;
                console.log('Item found:', getCus);
                cusFound = true;
            }
        });
    });
}

$(document).ready(fetchItems);

function fetchItems() {

    $.ajax({
        url: "http://localhost:8080/Dressy/item",
        type: "GET",
        headers: {"Content-Type": "application/json"},
        success: function(res) {
            console.log('Response:', res);
            loadItemIds(res);
        },
        error: function(err) {
            console.error('Failed to fetch customers data:', err);
        }
    });
}


function loadItemIds(items) {
    const selectItem = document.getElementById('itemIdOrder');
    selectItem.innerHTML = '<option selected></option>'; // Clear existing options

    items.forEach(item => {
        const option = document.createElement('option');
        option.value = item.costume_id;
        option.textContent = item.costume_id;
        selectItem.appendChild(option);
        console.log(item.costume_id); // Log the costumeId
    });

    $('#itemIdOrder').select2({
        placeholder: "Select an item",
        allowClear: true
    });

    $('#itemIdOrder').on('change', function() {
        let selectedItemId = $(this).val();
        console.log('Selected item ID:', selectedItemId);

        let itemFound = false;
        items.forEach(getItem => {
            if (getItem.costume_id === selectedItemId) {  
                document.getElementById('itemName').value = getItem.type;
                document.getElementById('itemColor').value = getItem.color;
                document.getElementById('itemPrice').value = getItem.price;
                document.getElementById('itemQtyOnHand').value = getItem.amount;
                console.log('Item found:', getItem);
                itemFound = true;
            }
        });
    });
}

$(document).ready(function() {
    $('#itemIdOrder').select2({
        placeholder: "Select an item",
        allowClear: true
    });

    $('#itemIdOrder').on('change', function() {
        let selectedItemId = $(this).val();
        
        for(let i = 0; i < items.length; i++){
            if(items[i].costumeId === selectedItemId){
                document.getElementById('itemName').value = items[i].type;
                document.getElementById('itemColor').value = items[i].color;
                document.getElementById('itemPrice').value = items[i].price;
                document.getElementById('itemQtyOnHand').value = items[i].amount;
            }
        }
    });

});

function validateOrderForm(){
    let qty =  document.getElementById("orderQty").value;
    let itemCode =  document.getElementById("itemIdOrder").value;

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

    if(itemCode == ""){
        $("#itemCodeError").text("Please enter Item");
        $("#itemIdOrder").css("border-color",  "red");
        return false;
    }else{
        $("#itemCodeError").text("");
        $("#itemIdOrder").css("border-color",  "#644592");
    }

    return true;
}

function checkAmount(){

    let qty =  document.getElementById("orderQty").value;
    let itemQtyOnHand = document.getElementById('itemQtyOnHand').value 

    if (itemQtyOnHand < qty){
        $("#orderQtyError").text("Not Enough stock");
        $("#orderQty").css("border-color",  "red");
        return false;
    }else{
        $("#orderQtyError").text("");
        $("#orderQty").css("border-color",  "#644592");
        return true;
    }
}


const orderItemForm = document.getElementById("item-select-form")
const orderInvoiceDetForm = document.getElementById("invoice-details-form")
const orderInvoiceForm = document.getElementById("invoice-form")
const orderTableBody = document.getElementById('order-table').querySelector('tbody');

document.getElementById("cus-update").style.display = "none"

document.querySelector('#addItem').onclick = function(){

    if(validateOrderForm() && checkAmount()){
        buildOrderTable();

        let quantity = document.getElementById("orderQty").value;
        let order_id = document.getElementById("orderId").value;
        let costume_id = document.getElementById("itemIdOrder").value;

        orderDet = {
            order_id,
            costume_id,
            quantity
        };

        orderDetails.push(orderDet);
        console.log(orderDetails);

        let selectedItemId =  $('#itemIdOrder').val();

        for(let i = 0; i < items.length; i++){
            console.log("id :" +items[i].costumeId)
            console.log("check :" +selectedItemId)

            if(items[i].costumeId === selectedItemId){
                let qtyOH = document.getElementById('itemQtyOnHand').value;
                items[i].amount = qtyOH - quantity;
            }
        }

        getItemTotal();
        getTotalColumnSum();
        orderItemForm.reset();
        generateOrderId;
    }
    
}



let total = "";

function getItemTotal(){
    let qty =  document.getElementById("orderQty").value;
    let unitPrice = document.getElementById('itemPrice').value

    total = qty*unitPrice;

    return total;

    // document.getElementById('orderTotal').value = parseInt(total);

}


function buildOrderTable(){

    const itemIdOrder = $('#itemIdOrder').val();
    const itemName = $('#itemName').val();
    const itemPrice = $('#itemPrice').val();
    const orderQty = $('#orderQty').val();
    const orderTotal = getItemTotal();

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${itemIdOrder}</td>
        <td>${itemName}</td>
        <td>${itemPrice}</td>
        <td>${orderQty}</td>
        <td>${orderTotal}</td>
        <td>
            <button onclick="deleteRow(this)" class="btn btn-danger"><i class="fa fa-trash" aria-hidden="true"></i></button>
            <button onclick="editRow(this)" class="btn btn-warning m-2"><i class="fa fa-pencil" aria-hidden="true"></i></button>
        </td>
    `;
    orderTableBody.appendChild(row);

}

function deleteRow(button) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');

    let orderQuntity = cells[3].textContent;

    let selectedItemId = cells[0].textContent;

    for(let i = 0; i < items.length; i++){
        if(items[i].costumeId === selectedItemId){            
            items[i].amount = parseInt(items[i].amount) + parseInt(orderQuntity);
        }
    }

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

    let selectedItemId =  $('#itemIdOrder').val();
    let orderQuntity = document.getElementById("orderQty").value;

    for(let i = 0; i < items.length; i++){
        if(items[i].costumeId === selectedItemId){
            document.getElementById('itemColor').value = items[i].color;

            items[i].amount = parseInt(items[i].amount) + parseInt(orderQuntity);
            
            document.getElementById('itemQtyOnHand').value = items[i].amount;
        }
    }

    row.parentNode.removeChild(row);    
}


function getTotalColumnSum() {
    const orderTable = document.getElementById('order-table');
    const rows = orderTable.getElementsByTagName('tr');
    let totalSum = 0;

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const totalCell = cells[4]; // Assuming the total is in the 5th column (index 4)
        
        if (totalCell) {
            const cellValue = parseFloat(totalCell.textContent);
            if (!isNaN(cellValue)) {
                totalSum += cellValue;
            }
        }
    }

    console.log("Total Sum: " + totalSum);

    document.getElementById('orderTotal').innerHTML = "Rs. " +totalSum.toFixed(2);

    return totalSum;
}



function validateInvoiceForm(){
    let cash =  document.getElementById("cash").value;
    let discount =  document.getElementById("discount").value;

    if(cash == ""){
        $("#cashError").text("Please enter cash amount");
        $("#cash").css("border-color",  "red");
        return false;
    } else if (!(regexPrice.test($("#cash").val()))){
        $("#cashError").text("Please enter valid price");
        $("#cash").css("border-color",  "red");
        return false;
    }else{
        $("#orderQtyError").text("");
        $("#orderQty").css("border-color",  "#644592");
    }

    if(discount == ""){
        discount.value = "0%";
    }else if (!(regexPercentage.test($("#discount").val()))){
        $("#discountError").text("Please enter valid discount");
        $("#discount").css("border-color",  "red");
        return false;
    }else{
        $("#discountError").text("");
        $("#discount").css("border-color",  "#644592");
    }

    return true;
}


$("#discount").keydown(function (e) {
    if(e.keyCode == 13) {
        
        const discount = document.getElementById('discount').value;

        const totalSum = getTotalColumnSum(); // Get the total sum of the order
        const discountedTotal = applyDiscount(totalSum, discount);
        document.getElementById('subTotal').innerHTML = "Rs. " +discountedTotal.toFixed(2); // Update the subtotal field
    }
    
});

function applyDiscount(totalSum, discount){
    discountValue = parseFloat(discount) / 100;

    let subtotal = totalSum - (totalSum * discountValue)

    return subtotal;
}

function checkCash(){
    let cash = parseFloat(document.getElementById('cash').value);
    console.log("cash :"+ cash)

    let subTotalString = document.getElementById('subTotal').innerHTML;
    let subTotal = parseFloat(subTotalString.split("Rs. ")[1]);
    console.log("discount :"+ subTotal)

    if (isNaN(cash) || isNaN(subTotal) || cash < subTotal){
        $("#cashError").text("Not enough cash amount");
        $("#cash").css("border-color",  "red");
        console.log("nhhhh")
        return false;
    }else{
        $("#cashError").text("");
        $("#cash").css("border-color",  "#644592");
    }

    return true;
   
}


$("#cash").keydown(function (e){

    let cash = document.getElementById('cash').value

    let subTotalString = document.getElementById('subTotal').innerHTML;
    let subTotal = parseFloat(subTotalString.split("Rs. ")[1]);

    if(e.keyCode == 13) {
        if(checkCash()){
            let balance = cash - subTotal;
            document.getElementById('balance').value = balance;
        }
    }
});


document.querySelector('#purchase').onclick = function(){

    if(validateInvoiceForm){
        
        let orderId =  document.getElementById("orderId").value;
        let date =  document.getElementById("date").value;
        let cusId =  document.getElementById("customerIdOrder").value;
        
        // Get the innerHTML value of the element
        let orderTotalString = document.getElementById("subTotal").innerHTML;

        // Trim any leading or trailing whitespace
        orderTotalString = orderTotalString.trim();

        // Use a regular expression to match only the numeric value with optional decimal part
        let match = orderTotalString.match(/(\d+(\.\d+)?)/);
        let orderTotalCleaned = match ? match[0] : '0';

        // Convert the cleaned string to a double (number)
        let orderTotal = parseFloat(orderTotalCleaned);

        order = {
            orderId, cusId, orderTotal, date
        }

        orders.push(order);

        console.log("total"+orderTotal);
        console.log("date"+date);

        const orderData = {
            order_id:orderId,
            cus_id:cusId,
            total:orderTotal,
            date:date,
            order_details:orderDetails
        };

        const orderJson = JSON.stringify(orderData);

        $.ajax({
            url: "http://localhost:8080/Dressy/order",
            type: "POST",
            data: orderJson,
            headers: {"Content-Type": "application/json"},
            success:(res) => {
                console.log(JSON.stringify(res));
                fetchItems();
            },
            Error: (res) => {
                console.error(res);
            }
        });

        orderInvoiceDetForm.reset();
        orderInvoiceForm.reset();
        orderTableBody.innerHTML = "";
        document.getElementById('subTotal').innerHTML = "Rs.0.00";
        document.getElementById('orderTotal').innerHTML = "Rs.0.00";

        generateOrderId();
        buildAllOrderTable(orders);
        getDate();
    }

}