const allOrderTableBody = document.getElementById('all-order-table').querySelector('tbody');

// function buildAllOrderTable(){

//     allOrderTableBody.innerHTML = '';
//     orders.forEach(function (element, index) {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${element.orderId}</td>
//             <td>${element.cusId}</td>
//             <td>${element.orderTotal}</td>
//             <td>${element.date}</td>
//         `;
//         allOrderTableBody.appendChild(row);
//     });

// }

function buildAllOrderTable(currentArr){

    allOrderTableBody.innerHTML = "";

    for(let i = 0; i < currentArr.length; i++){
        allOrderTableBody.innerHTML += `<tr> 
            <td>${currentArr[i].orderId}</td>
            <td>${currentArr[i].cusId}</td>
            <td>${currentArr[i].orderTotal}</td>
            <td>${currentArr[i].date}</td>
        </tr>`
        
    }    

}



document.getElementById("search").addEventListener("keyup", function(){
    let search = this.value.toLowerCase();

    newArr = orders.filter(function(val){
        if(val.orderId.includes(search) || val.cusId.includes(search) || val.orderTotal.includes(search) || val.date.includes(search)){
            let newObj = {orderId : val.orderId, cusId : val.cusId, orderTotal : val.orderTotal, date : val.date}
            return newObj;
        }
    })

    buildAllOrderTable(newArr);
})