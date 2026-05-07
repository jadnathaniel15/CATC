import { products } from "./final.js";

let cart = []; // store cart items

function renderProducts() {
    let html = "";
    products.forEach((p) => {
        let inCart = cart.find(item => item.productName === p.productName);

        html += `
            <div>
                <img src="${p.image}" alt="${p.productName}" width="100">
                <p>${p.productName}</p>
                <p>${p.currency} ${p.price}</p>
                <p>${p.isAvailable ? "Available" : "Sold Out"}</p>
                <button class="add-button" data-name="${p.productName}" ${inCart ? "disabled" : ""}>
                    ${inCart ? "Already in cart" : "Add to Cart"}
                </button>
            </div>
        `;
    });

    document.getElementById("product-parent").innerHTML = html;

    // connect buttons to addtocart
    document.querySelectorAll(".add-button").forEach(btn => {
        btn.addEventListener("click", addtocart);
    });
}

function renderCart() {
    let html = "";
    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        html = "<p>Cart is empty</p>";
    } else {
        cart.forEach((item, index) => {
            let subtotal = item.price * item.quantity;
            total += subtotal;
            count += item.quantity;

            html += `
                <div>
                    <p>${item.productName} - ${item.currency} ${item.price} x ${item.quantity} = ${item.currency} ${subtotal}</p>
                    <button onclick="increase(${index})">+</button>
                    <button onclick="decrease(${index})">-</button>
                    <button onclick="removeItem(${index})">Remove</button>
                </div>
            `;
        });
    }

    document.getElementById("cart-items").innerHTML = html;
    document.getElementById("cart-total").innerText = "Total: PHP " + total;
    document.getElementById("cart-quantity").innerText = "Items: " + count;
}

function addtocart(e) {
    let name = e.target.dataset.name;
    let product = products.find(p => p.productName === name);

    if (!product.isAvailable) {
        alert(product.productName + " is sold out and cannot be added.");
        return;
    }

    let existing = cart.find(item => item.productName === name);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    renderCart();
    renderProducts();
}

window.increase = function(index) {
    cart[index].quantity++;
    renderCart();
};

window.decrease = function(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }
    renderCart();
};

window.removeItem = function(index) {
    cart.splice(index, 1);
    renderCart();
};

document.getElementById("clear-cart").addEventListener("click", function() {
    cart = [];
    renderCart();
    renderProducts();
});

renderProducts();
renderCart();