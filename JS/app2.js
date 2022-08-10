import { trip } from "./db.js";
import { showTrip } from "./show.js";
import { validation } from "./validation.js";
import { showCart } from "./showCart.js";
import { updateStock } from "./updateStock.js";
import { modalWindow } from "./modalWindow.js";


const emptyBTN = document.querySelector("#empty-cart")

const buyButton = document.getElementById("buy-cart");
export const modalContainer = document.createElement("div");
export const body = document.querySelector("body");
// const cartCounter = document.querySelector(".cart-counter");


const formSearch = document.getElementById("formSearch");
const inputSearch = document.getElementById("search");
const inputSearch2 = document.getElementById("search2");
const inputSearch3 = document.getElementById("search3");
const inputSearch4 = document.getElementById("search4");
const btnSearch = document.querySelector(".btn-search");
// const tableBody = document.querySelector("#cart-list tbody");
const cartContainer = document.querySelector("#cart");
const showAllBTN = document.getElementById("btn-show-all")

window.addEventListener("DOMContentLoaded", () =>{
    checkLocalStorage()

    emptyBTN.addEventListener("click", emptyCart)

    if (formSearch) {  
        formSearch.addEventListener("submit", e => e.preventDefault());
        btnSearch.addEventListener("click", searchTrip);
        btnSearch.addEventListener("click", updateStock);   
        showAllBTN.addEventListener("click", () =>{
            showTrip(trip);
            updateStock();
        });  
        inputSearch.addEventListener("blur", searchTrip);
        inputSearch2.addEventListener("change", searchTrip);
        inputSearch3.addEventListener("blur", searchTrip);
        inputSearch4.addEventListener("blur", searchTrip);
        showTrip(trip);
    }
    
    // counter()
    buyButton.addEventListener("click", buyCart);
    updateStock();
}
);  

//resultado de los filtros ↓

export let result = []
export let cart = []
//click para filtrar los resultados de la busqueda
const obj = {
    location: "",
    transport: "",
    priceMax: 0,
    priceMin: 0
}
function searchTrip() {

    obj.location = inputSearch.value.toLowerCase();
    obj.transport = inputSearch2.value.toLowerCase();
    obj.priceMax = inputSearch3.value;
    obj.priceMin = inputSearch4.value;

    // if (inputValue != "") {
        
        result = trip.filter(locationFilter).filter(transportFilter).filter(priceMax).filter(priceMin)
        if (result.length) {

            showTrip(result)

        } else {
            modalWindow("Lo sentimos", "No hay viajes que coincidan con tu búsqueda :(", "modal-error");
            
        }
    // } else {
    //     modalWindow("Error", "Debes completar los campos obligatorios", "modal-error");
    // }

    // formSearch.reset()
}

//filtros


// function locationFilter(res) {
//     if (inputSearch.value.toLowerCase()) {
//         return (res.country.toLowerCase() === inputSearch.value.toLowerCase()) || (res.province.toLowerCase() === inputSearch.value.toLowerCase()) || (res.city.toLowerCase() === inputSearch.value.toLowerCase())
//     }
//     return res
// }
function locationFilter(res) {
    if (obj.location) {
        return (res.country.toLowerCase() === obj.location) || (res.province.toLowerCase() === obj.location) || (res.city.toLowerCase() === obj.location)
    }
    return res
}

function transportFilter(res) {
    if(obj.transport){
        return res.transport.toLowerCase() === obj.transport
    } 
    return res
}

function priceMax(res) {
    if(obj.priceMax){
        return res.price <= obj.priceMax
    }
    return res
}
function priceMin(res) {
    if(obj.priceMin){
        return res.price >= obj.priceMin
    }
    return res
}


//esta funcion crea un objeto vacio y lo agrega a un array llamado cart
export function filterCart(selTrip, cartButton) {
    const tripCart = {
        image: selTrip.querySelector("img").src,
        title: selTrip.querySelector("h2").getAttribute("city"),
        price: selTrip.getAttribute("price"),
        quantity: 1,
        id: selTrip.getAttribute("data-id"),
        stock: selTrip.getAttribute("stock")-1
    }
    
    //esta funciona valida si ya existe un viaje en el carrito, le suma la cantidad
    //y le resta el stock
    const present = cart.some(presTrip => presTrip.id === tripCart.id)
    if (present) {
        cart.map(tripSaved => {
            if (tripSaved.id === tripCart.id) {
                tripSaved.quantity++;
                tripSaved.stock--;
                validation(tripSaved, cartButton);
                return;
            }
        })
    } else {
        cart = [...cart, tripCart];
    }
    showCart(cart);
}

cartContainer.addEventListener("click", deleteElement);
// funcion para eliminar elementos del carrito
export function deleteElement(e) {
    e.preventDefault();
    
    const deleteEl = e.target.matches(".delete-element");

    if (deleteEl) {
        const tripID = e.target.getAttribute("data-id");

        cart = cart.filter(trip => trip.id !== tripID);
        const prueba = document.getElementById(`${tripID}`)
        if (prueba) {
            
            if (tripID === prueba.getAttribute("data-id")) {
                const btnCart = prueba.querySelector(".cartButton");
                btnCart.classList.toggle("noStock");
                btnCart.removeAttribute("disabled");
                btnCart.textContent = "Agregar al carrito"
            }
        }
        toLocalStorage();
        showCart(cart);
    }
}

export function toLocalStorage () {
    localStorage.setItem("Cart", JSON.stringify(cart));
}

function checkLocalStorage() {
    const LSCart = JSON.parse(localStorage.getItem("Cart"));
    if (LSCart) {
        cart = LSCart;
        showCart(cart);
    }
}

export function emptyCart() {
    cart = []
    toLocalStorage();
    showCart(cart);
    window.location.reload();
}
  
export const close = document.createElement("button");

function buyCart() {
    if (cart.length) {

        modalWindow("¡Felicitaciones!", "¡Compra realizada con éxito!", "modal-message")

        // modalContainer.lastElementChild.appendChild(close);

        // const closeButton = document.getElementById("close");
        // closeButton.addEventListener("click", () =>{
        //     body.removeChild(body.lastChild)
        //     emptyCart()
        // })

    } else {
        modalWindow("Error", "Debes agregar al carrito primero", "modal-error")
    }
}

window.addEventListener("load", () => {

    const infoBTN = document.querySelectorAll(".infoButton");

    const cardInfo = infoBTN.forEach(i => {
        i.addEventListener("click", () =>{
            const par = (i.parentElement.querySelector("p").textContent);
            const tt = (i.parentElement.querySelector("h2").textContent);
            modalWindow(tt , par, "modal-message")
                //aca tengo que capturar lo que hay en el parrafo y mandarlo a la funcion modal
        }) //agregar boton a la funcion modalWIndow
    
    });

    
})

// export function counter() {
//     const tr = body.querySelectorAll("#cart-list tbody tr");
//     tr.forEach(t => {
//        const quan = t.getAttribute("quantity-counter");
//        console.log(quan);
//     //    quan.reduce()
        
//     });
//     if (cart.length !== 0){
//         cartCounter.classList.toggle("cart-counter-item")
//         cartCounter.textContent = cart.length
//     }
// }
