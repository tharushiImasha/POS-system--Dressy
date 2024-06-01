

///////////////////////////////////////////////////////

// const form = document.getElementById('registration-form');
// const customersTableBody = document.getElementById('customers-table').querySelector('tbody');
// const customers = [];

// form.addEventListener('submit', (event) => {
//     event.preventDefault();
        
//     const cusId = document.getElementById('cusId').value;
//     const firstName = document.getElementById('firstName').value;
//     const lastName = document.getElementById('lastName').value;
//     const address = document.getElementById('address').value;
//     const phone = document.getElementById('phone').value;

//     const customer = {
//         cusId,
//         firstName,
//         lastName,
//         address,
//         phone
//     };
//     customers.push(customer);
//     displayCustomers(customers, customersTableBody);
    
//     form.reset();
// });

// function displayCustomers(customers, tableBody) {
//     tableBody.innerHTML = '';
//     customers.forEach(customer => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${customer.cusId}</td>
//             <td>${customer.firstName}</td>
//             <td>${customer.lastName}</td>
//             <td>${customer.address}</td>
//             <td>${customer.phone}</td>
//         `;
//         tableBody.appendChild(row);
//     });
// }


const customerForm = document.getElementById("customer-registration-form")
const customersTableBody = document.getElementById('customers-table').querySelector('tbody');

const customers = []

customerForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let cusId =  document.getElementById("cusId").value;
    let firstName =  document.getElementById("firstName").value;
    let lastName =  document.getElementById("lastName").value;
    let address =  document.getElementById("address").value;
    let phone =  document.getElementById("phone").value;    

    const customer = {
        cusId, firstName, lastName, address, phone
    }

    customers.push(customer);

    buildTable(customers)

    customerForm.reset();
});

let table = document.getElementById('my-table')

function buildTable(){
    
    // let row = '';

    // const tableBody = document.querySelector('#my-table tbody');

    // for(let i = 0; i < customer.length; i++){

    //     console.log(customer[i])

    //     row = (`<tr>
    //                 <td>${customer[i].cusId}</td>
    //                 <td>${customer[i].firstName}</td>
    //                 <td>${customer[i].lastName}</td>
    //                 <td>${customer[i].address}</td>
    //                 <td>${customer[i].phone}</td>
    //                 <td><button type="button" onclick="removeRow(${[i]})">Remove</button></td>
    //             </tr>`)

    //     customersTableBody.appendChild(row)
    // }

    // table.innerHTML += row

    customersTableBody.innerHTML = '';
    customers.forEach(customer => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${customer.cusId}</td>
            <td>${customer.firstName}</td>
            <td>${customer.lastName}</td>
            <td>${customer.address}</td>
            <td>${customer.phone}</td>
            <td><button onclick="removeRow(${customer.cusId})">Remove</button></td>
        `;
        customersTableBody.appendChild(row);
    });

}

// function myFunction(x) {
// //   alert("Row index is: " + x.rowIndex);
// }

function removeRow(customerId){
    for(let i = 0; i < customers.length; i++){
        if(customerId == customers[i].cusId){
            customers.splice(i, 1)
        }
    }

    console.log(customers)

    clearTable();

    buildTable();
}

function clearTable(){
    let rowCount = table.rows.length;
    for(let i = rowCount-1; i > 0; i--){
        table.deleteRow(i);
    }
}


// =========================================== Item ===========================================

const itemForm = document.getElementById("item-registration-form")
const items = []

itemForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let costumeId =  document.getElementById("costumeId").value;
    let img =  document.getElementById("img").value;
    let type =  document.getElementById("type").value;
    let color =  document.getElementById("color").value;
    let amount =  document.getElementById("amount").value;
    let price =  document.getElementById("price").value;    

    const item = {
        costumeId, img, type, color, amount, price
    }

    items.push(item);

    console.log(items.length)

    itemForm.reset();
});


// let filt = customers.filter((a, i)=>{
//         if(cusIdRemove == a.cusId){
//             customers.splice(i, 1);
//             buildTable();
//         }
//     })