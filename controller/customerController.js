const customerForm = document.getElementById("customer-registration-form")
const customersTableBody = document.getElementById('customers-table').querySelector('tbody');

document.getElementById("cus-update").style.display = "none"

if(customers.length == 0){
    document.getElementById("cusId").value = 'C00-001';
}else{
    fetchCustomers();
}

function getNextCustomerId(customerData) {
    let maxIdNum = 0;
    customerData.forEach(customer => {
        let idNum = parseInt(customer.cus_id.split('-')[1]);
        if (idNum > maxIdNum) {
            maxIdNum = idNum;
        }
    });
    return generateCusId(maxIdNum + 1);
}

function generateCusId(idNum) {
    let idStr = idNum.toString().padStart(3, '0'); // Pad the number to 3 digits
    let newId = `C00-${idStr}`;
    $('#cusId').val(newId);
}


function validateForm(){
    let cusId =  document.getElementById("cusId").value;
    let fullName =  document.getElementById("fullName").value;
    let email =  document.getElementById("email").value;
    let address =  document.getElementById("address").value;
    let phone =  document.getElementById("phone").value;

    if(cusId == ""){
        $("#cusIdError").text("Please enter your ID");
        $("#cusId").css("border-color",  "red");
        return false;
    } else if (!(regexId.test($("#cusId").val()))){
        $("#cusIdError").text("Please enter valid ID");
        $("#cusId").css("border-color",  "red");
        return false;
    }else{
        $("#cusIdError").text("");
        $("#cusId").css("border-color",  "#644592");
    }

    if(fullName == ""){
        $("#fullNameError").text("Please enter your Full Name");
        $("#fullName").css("border-color",  "red");
        return false;
    } else if (!(regexName.test($("#fullName").val()))){
        $("#fullNameError").text("Please enter valid Full Name");
        $("#fullName").css("border-color",  "red");
        return false;
    }else{
        $("#fullNameError").text("");
        $("#fullName").css("border-color",  "#644592");
    }

    if(email == ""){
        $("#emailError").text("Please enter your Email");
        $("#email").css("border-color",  "red");
        return false;
    } else if(!(regexEmail.test($("#email").val()))){
        $("#emailError").text("Please enter valid Email");
        $("#email").css("border-color",  "red");
        return false;
    }else{
        $("#emailError").text("");
        $("#email").css("border-color",  "#644592");
    }

    if(address == ""){
        $("#addressError").text("Please enter your Address");
        $("#address").css("border-color",  "red");
        return false;
    } else if (!(regexAddress.test($("#address").val()))){
        $("#addressError").text("Please enter valid address");
        $("#address").css("border-color",  "red");
        return false;
    }else{
        $("#addressError").text("");
        $("#address").css("border-color",  "#644592");
    }

    if(phone == ""){
        $("#phoneError").text("Please enter your Phone Number");
        $("#phone").css("border-color",  "red");
        return false;
    } else if (!(regexTel.test($("#phone").val()))){
        $("#phoneError").text("Please enter valid Phone Number");
        $("#phone").css("border-color",  "red");
        return false;
    }else{
        $("#phoneError").text("");
        $("#phone").css("border-color",  "#644592");
    }

    return true;
}

function fetchCustomers() {
    $.ajax({
        url: "http://localhost:8080/Dressy/customer",
        type: "GET",
        headers: {"Content-Type": "application/json"},
        success: function(res) {
            console.log('Response:', res); // Log the response to verify it's an array
            buildTable(res);
            getNextCustomerId(res);
        },
        error: function(err) {
            console.error('Failed to fetch customers data:', err);
        }
    });
}


customerForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if(validateForm()){
        let cusId =  document.getElementById("cusId").value;
        let fullName =  document.getElementById("fullName").value;
        let email =  document.getElementById("email").value;
        let address =  document.getElementById("address").value;
        let phone =  document.getElementById("phone").value;    

        const cusData = {
            cus_id:cusId,
            name:fullName,
            email:email,
            address:address,
            phone:phone
        };

        const customerJson = JSON.stringify(cusData);

        $.ajax({
            url: "http://localhost:8080/Dressy/customer",
            type: "POST",
            data: customerJson,
            headers: {"Content-Type": "application/json"},
            success:(res) => {
                console.log(JSON.stringify(res));
                fetchCustomers()
            },
            Error: (res) => {
                console.error(res);
            }
        });

        customerForm.reset();
        fetchCustomers();

    }
    
});

function buildTable(customers) {
    if (!Array.isArray(customers)) {
        console.error('Expected an array but got:', customers);
        return;
    }

    customersTableBody.innerHTML = '';
    customers.forEach(function (element) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${element.cus_id}</td>
            <td>${element.name}</td>
            <td class="emailJs">${element.email}</td>
            <td>${element.address}</td>
            <td>${element.phone}</td>
            <td class="actionBtn">
                <button onclick="deleteData('${element.cus_id}')" class="btn btn-danger"><i class="fa fa-trash" aria-hidden="true"></i></button>
                <button onclick='populateForm(${JSON.stringify(element)})' class="btn btn-warning m-2"><i class="fa fa-pencil" aria-hidden="true"></i></button>
            </td>
        `;
        customersTableBody.appendChild(row);
    });
}


// Call fetchCustomers when the page loads or when you need to refresh the table
$(document).ready(fetchCustomers);

function deleteData(cusId){
    console.log(cusId)
    $.ajax({
        url: `http://localhost:8080/Dressy/customer?cus_id=${cusId}`,
        type: "DELETE",
        success: function(res) {
            console.log('Delete Response:', res);
            fetchCustomers()
        },
        error: function(err) {
            console.error('Failed to delete customer:', err);
        }
    });
    
}

function populateForm(cus) {
    document.getElementById('cusId').value = cus.cus_id;
    document.getElementById('fullName').value = cus.name;
    document.getElementById('email').value = cus.email;
    document.getElementById('address').value = cus.address;
    document.getElementById('phone').value = cus.phone;

    document.getElementById("cus-update").style.display = "block"
    document.getElementById("cus-add").style.display = "none"
}


document.querySelector('#cus-update').onclick = function(){

    const customerData = {
        cus_id:document.getElementById('cusId').value,
        name:document.getElementById('fullName').value,
        email:document.getElementById('email').value,
        address:document.getElementById('address').value,
        phone:document.getElementById('phone').value
    };

    const customerJson = JSON.stringify(customerData);

    console.log(JSON.stringify(customerData))

    $.ajax({
        url: "http://localhost:8080/Dressy/customer",
        type: "PUT",
        data: customerJson,
        headers: {"Content-Type": "application/json"},
        success: function(res, status, xhr) {
            if (xhr.status === 204) { // No Content
                console.log('Update customer successfully');
                fetchCustomers(); // Refresh the table after update
            } else {
                console.error('Failed to update customer:', res);
            }
        },
        error: function(err) {
            console.error('Failed to update customer:', err);
            if (err.responseText) {
                console.log('Error details:', err.responseText); // Log detailed error response
            }
        }
    });

    document.getElementById("cus-update").style.display = "none"
    document.getElementById("cus-add").style.display = "block"

    customerForm.reset();
    
}


$("#cusId").keydown(function (e) {

    if(e.keyCode == 16) {

        let id = document.getElementById("cusId").value;
        
        for (let i = 0; i < customers.length; i++) {
            if(id === customers[i].cusId){

                console.log("id = "+id)

                document.getElementById("cusId").value = customers[i].cusId;
                document.getElementById("fullName").value = customers[i].fullName;
                document.getElementById("email").value = customers[i].email;
                document.getElementById("address").value = customers[i].address;
                document.getElementById("phone").value = customers[i].phone;

            }
        }

        if(id == ""){
            customerForm.reset();
            generateId();
        }
    }
    
});  