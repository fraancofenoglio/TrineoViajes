import { tableBody } from "./variables.js";

export function showCart(cart) {
    tableBody.innerHTML = "";
    cart.map(element => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td><img style="width: 50px; height: 50px" src="${element.image}"></td>
        <td> ${element.title}</td>
        <td> $${(element.price)*(element.quantity)}</td>
        <td> ${element.quantity}</td>
        <td> <a class="delete-element" href="#" stock="${element.stock}" data-id="${element.id}">X</a></td>
        `
        row.setAttribute("quantity-counter", (element.quantity));
        tableBody.appendChild(row)
    })
}