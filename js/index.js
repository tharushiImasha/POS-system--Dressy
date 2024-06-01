window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 0) {
            header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

document.getElementById("home-page").style.display = "block";
document.getElementById("customers-page").style.display = "none";
document.getElementById("items-page").style.display = "none";

document.getElementById("home").addEventListener("click", function(event){

    event.preventDefault();

    document.getElementById("home-page").style.display = "block";
    document.getElementById("customers-page").style.display = "none";
    document.getElementById("items-page").style.display = "none";
})

document.getElementById("items").addEventListener("click", function(){
    document.getElementById("home-page").style.display = "none";
    document.getElementById("customers-page").style.display = "none";
    document.getElementById("items-page").style.display = "block";
})

document.getElementById("customers").addEventListener("click", function(){
    document.getElementById("home-page").style.display = "none";
    document.getElementById("customers-page").style.display = "block";
    document.getElementById("items-page").style.display = "none";
})



