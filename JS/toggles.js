window.addEventListener("DOMContentLoaded", () =>{

    const btnCart = document.querySelector(".showCart img");
    const cart1 = document.querySelector(".cart");
    const nav = document.querySelector("#main-container-hamburguer");
    const span = document.querySelector(".span");
    const span1 = document.querySelector(".span1");
    const span2 = document.querySelector(".span2");
    const hbBtn = document.getElementById('hb-btn');
    const menu = document.getElementById('menu');
                   
    hbBtn.addEventListener('click', () => {
        hbBtn.classList.toggle('open');
    });
             
    hbBtn.addEventListener('click', () => {
        menu.classList.toggle('mostrarMenu');
    });
    
    btnCart.addEventListener("click", () => {
        cart1.classList.toggle("open-cart");
        nav.classList.toggle("over");
        span.classList.toggle("over2");
        span1.classList.toggle("over2");
        span2.classList.toggle("over2");
        menu.classList.toggle("over2");
    });
});
