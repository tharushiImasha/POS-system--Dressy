const allOrderTableBody = document.getElementById('all-order-table').querySelector('tbody');

document.querySelector('#checkOrders').onclick = function() {
    $.ajax({
        url: "http://localhost:8080/Dressy/order",
        type: "GET",
        headers: {"Content-Type": "application/json"},
        success: function(res) {
            console.log('Response:', res); 
            buildAllOrderTable(res);
        },
        error: function(err) {
            console.error('Failed to fetch order data:', err);
        }
    });
}

function buildAllOrderTable(allOrders) {
    console.log("Received orders:", allOrders);

    allOrderTableBody.innerHTML = "";

    if (!Array.isArray(allOrders)) {
        console.error('Expected an array but got:', allOrders);
        return;
    }

    allOrders.forEach(function(element) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${element.order_id}</td>
            <td>${element.cus_id}</td>
            <td>${element.total}</td>
            <td>${element.date}</td>
        `;
        allOrderTableBody.appendChild(row);
    });
}


document.getElementById("search").addEventListener("keyup", function(){
    let search = this.value.toLowerCase();

    // Ensure the search string is compared properly, even if the fields are numbers
    newArr = orders.filter(function(val){
        return val.orderId.toLowerCase().includes(search) || 
               val.cusId.toLowerCase().includes(search) || 
               val.orderTotal.toString().toLowerCase().includes(search) || 
               val.date.toLowerCase().includes(search);
    });

    buildAllOrderTable(newArr);
});
