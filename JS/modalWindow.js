import {modalContainer, body, close } from "./variables.js";
import { emptyCart } from "./app2.js";

export function modalWindow(title, text, type) {
    close.setAttribute("id", "close");
    close.setAttribute("type", "button");
    close.textContent = "Aceptar";

    modalContainer.classList.add("modal-container");
    modalContainer.innerHTML = `
    <div class="${type}">
        <h3>${title}</h3>
    
        <p>
            ${text} 
        </p>
    </div>
    `
    if (type === "modal-message") {
        modalContainer.lastElementChild.appendChild(close);
    }

    body.appendChild(modalContainer);

    if (type === "modal-error") {
        setTimeout(() => {

            body.removeChild(body.lastChild)
    }, 3000);
    }

    const closeButton = document.getElementById("close");

    closeButton.addEventListener("click", () =>{
        body.removeChild(body.lastChild)
        if (title === "¡Felicitaciones!") {
            
            emptyCart()
        }
    })
}