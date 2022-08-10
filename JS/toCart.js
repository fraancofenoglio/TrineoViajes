import { toLocalStorage, filterCart } from "./app2.js";
import { updateStock } from "./updateStock.js";


export function toCart(cartButton){
    cartButton.addEventListener("click", () =>{
        updateStock()

        if (cartButton.classList.contains("cartButton")) {
            const selected = cartButton.parentElement;
            
            filterCart(selected, cartButton);
            
            toLocalStorage()
            // counter()
        }
    })
}