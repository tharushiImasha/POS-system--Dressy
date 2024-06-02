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

// loadCusIds();

console.log("Customers array:", customers);


var today = new Date().toISOString().split('T')[0];
document.getElementById('date').value = today;

function loadCusIds() {
    console.log("koooo")
    let optionCus = '';
    for (let i = 0; i < customers.length; i++) {
        optionCus += '<option value="' + customers[i].cusId + '">' + customers[i].cusId + '</option>';
        console.log(customers[i].cusId)
        console.log("awaaaa")
    }
    $('#customerIdOrder').append(optionCus);
}

document.addEventListener("DOMContentLoaded", function() {
    loadCusIds();
});



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