export function validation(tripSaved, cartButton) {
    if (tripSaved.stock === 0) {

       cartButton.classList.toggle("noStock");
       cartButton.setAttribute("disabled", "");
       cartButton.textContent = "Sin lugares disponibles";
    };
};
