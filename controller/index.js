window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 0) {
            header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


window.addEventListener('scroll', function() {
    var section = document.querySelector('.order-top');
    var rect = section.getBoundingClientRect();
    
    if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
        section.classList.add('sticky');
    } else {
        section.classList.remove('sticky');
    }
});

document.getElementById("home-page").style.display = "block";
document.getElementById("customers-page").style.display = "none";
document.getElementById("items-page").style.display = "none";
document.getElementById("orders-page").style.display = "none";
document.getElementById("all-orders").style.display = "none";

document.getElementById("home").addEventListener("click", function(event){

    event.preventDefault();

    document.getElementById("home-page").style.display = "block";
    document.getElementById("customers-page").style.display = "none";
    document.getElementById("items-page").style.display = "none";
    document.getElementById("orders-page").style.display = "none";
    document.getElementById("all-orders").style.display = "none";
})

document.getElementById("items").addEventListener("click", function(){
    document.getElementById("home-page").style.display = "none";
    document.getElementById("customers-page").style.display = "none";
    document.getElementById("items-page").style.display = "block";
    document.getElementById("orders-page").style.display = "none";
    document.getElementById("all-orders").style.display = "none";
})

document.getElementById("customers").addEventListener("click", function(){
    document.getElementById("home-page").style.display = "none";
    document.getElementById("customers-page").style.display = "block";
    document.getElementById("items-page").style.display = "none";
    document.getElementById("orders-page").style.display = "none";
    document.getElementById("all-orders").style.display = "none";
})

document.getElementById("orders").addEventListener("click", function(){
    document.getElementById("home-page").style.display = "none";
    document.getElementById("customers-page").style.display = "none";
    document.getElementById("items-page").style.display = "none";
    document.getElementById("orders-page").style.display = "block";
    document.getElementById("all-orders").style.display = "none";
})

document.getElementById("checkOrders").addEventListener("click", function(){
    document.getElementById("home-page").style.display = "none";
    document.getElementById("customers-page").style.display = "none";
    document.getElementById("items-page").style.display = "none";
    document.getElementById("orders-page").style.display = "none";
    document.getElementById("all-orders").style.display = "block";
})



document.getElementById("items-m").addEventListener("click", function(){
    document.getElementById("home-page").style.display = "none";
    document.getElementById("customers-page").style.display = "none";
    document.getElementById("items-page").style.display = "block";
    document.getElementById("orders-page").style.display = "none";
    document.getElementById("all-orders").style.display = "none";
})

document.getElementById("customers-m").addEventListener("click", function(){
    document.getElementById("home-page").style.display = "none";
    document.getElementById("customers-page").style.display = "block";
    document.getElementById("items-page").style.display = "none";
    document.getElementById("orders-page").style.display = "none";
    document.getElementById("all-orders").style.display = "none";
})

document.getElementById("orders-m").addEventListener("click", function(){
    document.getElementById("home-page").style.display = "none";
    document.getElementById("customers-page").style.display = "none";
    document.getElementById("items-page").style.display = "none";
    document.getElementById("orders-page").style.display = "block";
    document.getElementById("all-orders").style.display = "none";
})

document.getElementById("checkOrders-m").addEventListener("click", function(){
    document.getElementById("home-page").style.display = "none";
    document.getElementById("customers-page").style.display = "none";
    document.getElementById("items-page").style.display = "none";
    document.getElementById("orders-page").style.display = "none";
    document.getElementById("all-orders").style.display = "block";
})

document.getElementById("home-m").addEventListener("click", function(event){

    event.preventDefault();

    document.getElementById("home-page").style.display = "block";
    document.getElementById("customers-page").style.display = "none";
    document.getElementById("items-page").style.display = "none";
    document.getElementById("orders-page").style.display = "none";
    document.getElementById("all-orders").style.display = "none";
})
