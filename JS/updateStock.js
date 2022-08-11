//función para actualizar los botones
export function updateStock (){
    const getStock = document.querySelectorAll("#cart a");

    getStock.forEach(st => {
        const stID = st.getAttribute("data-id");
        const getCard = document.getElementById(`${stID}`);
        const stST = st.getAttribute("stock");

        if(st.classList.contains("delete-element")){
    
            if (getCard) {

                if (stST == 0) {

                    if (stID === (getCard.getAttribute("data-id"))) {

                        const getCardBTN = getCard.querySelector(".cartButton");
                        getCardBTN.setAttribute("disabled", "");
                        getCardBTN.classList.add("noStock");
                        getCardBTN.textContent = "Sin lugares disponibles";
                        }
                    }
                }
            } 
    })
}
