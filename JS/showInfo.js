import { modalWindow } from "./modalWindow.js";

export function showInfo(e) {
    e.preventDefault()
    const infoclick = e.target.matches(".infoButton");
    if (infoclick) {
        
        const par = (e.target.parentElement.querySelector("p").textContent);
        const tt = (e.target.parentElement.querySelector("h2").textContent);
        modalWindow(tt , par, "modal-message");
    };
};