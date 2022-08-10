import { toCart } from "./toCart.js";

export function showTrip(result) {
    cleanHTML()
    result.map((tr) => {
    const title = document.createElement("h2");
    const img = document.createElement("img");
    const price = document.createElement("h3");
    const info = document.createElement("div");
    const transport = document.createElement("img");
    const days = document.createElement("h4");
    const divDay = document.createElement("div");
    const divNight = document.createElement("div");
    const dayIcon = document.createElement("img");
    const nightIcon = document.createElement("img");
    const nights = document.createElement("h4");
    const card = document.createElement("div");
    const searchResult = document.querySelector(".search-trip");
    const cartButton = document.createElement("button");
    const infoLink = document.createElement("button");
    const description = document.createElement("p");

    title.textContent += tr.title;
    title.setAttribute("city", tr.city)
    card.appendChild(title);

    img.src += tr.img;
    card.appendChild(img);

    days.textContent += `${tr.days}`;
    dayIcon.src += tr.icons.sun;
    dayIcon.style = "width: 30px; height: 30px";
    divDay.appendChild(days);
    divDay.appendChild(dayIcon);
    info.appendChild(divDay);

    nights.textContent += `${tr.nights}`;
    nightIcon.src += tr.icons.moon;
    nightIcon.style = "width: 20px; height: 20px";
    divNight.appendChild(nights);
    divNight.appendChild(nightIcon);
    info.appendChild(divNight);

    transport.src += tr.icons.transport;
    transport.style = "width: 28px; height: 28px"
    info.appendChild(transport);
    divDay.classList.add("divDays");
    divNight.classList.add("divDays");

    info.classList.add("info");
    card.appendChild(info);

    price.textContent += `$${tr.price}`;
    card.appendChild(price);

    infoLink.textContent = "+ info";
    infoLink.setAttribute("href", " ");
    infoLink.classList.add("infoButton");
    card.appendChild(infoLink);

    description.textContent = tr.info;
    description.classList.add("info-display-none");
    card.appendChild(description);

    
    cartButton.textContent = "Agregar al carrito";
    if (tr.stock !== 0) {
        cartButton.classList.add("cartButton");
    } else {
        cartButton.textContent = "Sin lugares disponibles";
        cartButton.classList.add("noStock");
        cartButton.setAttribute("disabled", "")
    }
    card.appendChild(cartButton);

    toCart(cartButton);
 //agrego atributos para armar el objeto luego
    card.classList.add("card");
    card.setAttribute("data-id", tr.id);
    card.setAttribute("id", tr.id);
    card.setAttribute("stock", tr.stock);
    card.setAttribute("price", tr.price);
    searchResult.appendChild(card);
    
    })
}

function cleanHTML() {
    const container = document.querySelector(".search-trip");
    while(container.lastChild){
        container.removeChild(container.lastChild)
    }
}