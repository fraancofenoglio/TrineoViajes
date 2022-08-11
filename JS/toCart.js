import { toLocalStorage, filterCart } from "./app.js";
import { updateStock } from "./updateStock.js";
//función para agregar al carrito
export function toCart(cartButton){
    cartButton.addEventListener("click", () =>{
        updateStock();

        if (cartButton.classList.contains("cartButton")) {
            const selected = cartButton.parentElement;
            
            filterCart(selected, cartButton);
            toLocalStorage();
        };
    })
};