import { toLocalStorage, filterCart } from "./app.js";
//función para agregar al carrito
export function toCart(cartButton){
    cartButton.addEventListener("click", () =>{

        if (cartButton.classList.contains("cartButton")) {
            const selected = cartButton.parentElement;
            filterCart(selected, cartButton);
            toLocalStorage();
        };
    })
};