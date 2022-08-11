import { trip } from "./db.js";
import { showTrip } from "./show.js";
import { validation } from "./validation.js";
import { showCart } from "./showCart.js";
import { updateStock } from "./updateStock.js";
import { modalWindow } from "./modalWindow.js";
import { showInfo } from "./showInfo.js";
import { emptyBTN, searchResult, buyButton, formSearch, inputSearch, inputSearch2, inputSearch3, inputSearch4, btnSearch, cartContainer, showAllBTN, body } from "./variables.js";

window.addEventListener("DOMContentLoaded", () =>{
    checkLocalStorage();
    
    emptyBTN.addEventListener("click", emptyCart);

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

    if (searchResult) {
        searchResult.addEventListener("click", showInfo);
    }

    cartContainer.addEventListener("click", deleteElement);

    buyButton.addEventListener("click", buyCart);
    updateStock();
}
);  

//array vacios de carrito y resultado de búsquedas
export let result = [];
export let cart = [];

const obj = {
    location: "",
    transport: "",
    priceMax: 0,
    priceMin: 0
};
//filtros de búsqueda
function searchTrip() {

    obj.location = inputSearch.value.toLowerCase();
    obj.transport = inputSearch2.value.toLowerCase();
    obj.priceMax = inputSearch3.value;
    obj.priceMin = inputSearch4.value;
        
    result = trip.filter(locationFilter).filter(transportFilter).filter(priceMax).filter(priceMin);
    if (result.length) {
        showTrip(result);

    } else {
        modalWindow("Lo sentimos", "No hay viajes que coincidan con tu búsqueda :(", "modal-error");         
    }
};

//funciones de filtros

function locationFilter(res) {
    if (obj.location) {
        return (res.country.toLowerCase() === obj.location) || (res.province.toLowerCase() === obj.location) || (res.city.toLowerCase() === obj.location)
    }
    return res
};

function transportFilter(res) {
    if(obj.transport){
        return res.transport.toLowerCase() === obj.transport
    } 
    return res
};

function priceMax(res) {
    if(obj.priceMax){
        return res.price <= obj.priceMax
    }
    return res
};
function priceMin(res) {
    if(obj.priceMin){
        return res.price >= obj.priceMin
    }
    return res
};

//esta funcion crea un objeto vacio y lo agrega al array cart
export function filterCart(selTrip, cartButton) {
    const tripCart = {
        image: selTrip.querySelector("img").src,
        title: selTrip.querySelector("h2").getAttribute("city"),
        price: selTrip.getAttribute("price"),
        quantity: 1,
        id: selTrip.getAttribute("data-id"),
        stock: selTrip.getAttribute("stock")-1
    };
    
    //esta funciona valida si ya existe un viaje en el carrito, le suma la cantidad
    //y le resta el stock
    const present = cart.some(presTrip => presTrip.id === tripCart.id);
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

// funcion para eliminar elementos del carrito
export function deleteElement(e) {
    e.preventDefault();
    const deleteEl = e.target.matches(".delete-element");

    if (deleteEl) {
        const tripID = e.target.getAttribute("data-id");

        cart = cart.filter(trip => trip.id !== tripID);
        const prueba = document.getElementById(`${tripID}`);
        if (prueba) {
            
            if (tripID === prueba.getAttribute("data-id")) {
                const btnCart = prueba.querySelector(".cartButton");
                btnCart.classList.toggle("noStock");
                btnCart.removeAttribute("disabled");
                btnCart.textContent = "Agregar al carrito";
            };
        };
        toLocalStorage();
        showCart(cart);
    };
};
//funcion para setear el carrito en localstorage
export function toLocalStorage () {
    localStorage.setItem("Cart", JSON.stringify(cart));
}
//funcion que trae el carrito del localstorage y si existe lo muestra en el HTML
function checkLocalStorage() {
    const LSCart = JSON.parse(localStorage.getItem("Cart"));
    if (LSCart) {
        cart = LSCart;
        showCart(cart);
    };
};
//funcion para vaciar el carrito
export function emptyCart() {
    cart = [];
    toLocalStorage();
    showCart(cart);
    window.location.reload();
};
//funcion para comprar el carrito
function buyCart() {
    if (cart.length) {
        modalWindow("¡Felicitaciones!", "¡Compra realizada con éxito!", "modal-message");
    } else {
        modalWindow("Error", "Debes agregar al carrito primero", "modal-error");
    }
};