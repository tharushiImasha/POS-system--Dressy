const customerForm = document.getElementById("customer-registration-form")
const customersTableBody = document.getElementById('customers-table').querySelector('tbody');

document.getElementById("cus-update").style.display = "none"

if(customers.length == 0){
    document.getElementById("cusId").value = 'C00-001';
}else{
    generateId()
}

function generateId(){
    let currentId = customers[customers.length-1].cusId;
    let prefix = currentId.slice(0, 4); // get the prefix 'C00-'
    let numPart = parseInt(currentId.slice(4), 10); // get the numerical part, e.g., 1
    let newNumPart = (numPart + 1).toString().padStart(3, '0'); // increment and pad with zeros if necessary
    let newId = prefix + newNumPart;
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


customerForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if(validateForm()){
        let cusId =  document.getElementById("cusId").value;
        let fullName =  document.getElementById("fullName").value;
        let email =  document.getElementById("email").value;
        let address =  document.getElementById("address").value;
        let phone =  document.getElementById("phone").value;    

        customer = {
            cusId, fullName, email, address, phone
        }

        customers.push(customer);

        buildTable()

        customerForm.reset();
        generateId();
        loadCusIds();
    }

    
});

let table = document.getElementById('my-table')

function buildTable(){

    customersTableBody.innerHTML = '';
    customers.forEach(function (element, index) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${element.cusId}</td>
            <td>${element.fullName}</td>
            <td class = "emailJs">${element.email}</td>
            <td>${element.address}</td>
            <td>${element.phone}</td>
            <td class = "actionBtn">
                <button onclick="deleteData(${index})" class="btn btn-danger"><i class="fa fa-trash" aria-hidden="true"></i></button>
                <button onclick="updateData(${index})" class="btn btn-warning m-2"><i class="fa fa-pencil" aria-hidden="true"></i></button>
            </td>
        `;
        customersTableBody.appendChild(row);
    });

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