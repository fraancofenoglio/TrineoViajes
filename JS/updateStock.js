import { result } from "./app2.js";

export function updateStock (){
    // e.preventDefault();
    const getStock = document.querySelectorAll("#cart a")
    // if (result.length) {

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
    // }
}
