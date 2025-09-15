// Produkte für digitale Grabkerzen
const products = [
    {
        id: 1,
        name: "Klassische Grabkerze",
        price: 2.00,
        image: "https://cdn.pixabay.com/photo/2017/01/06/19/15/candle-1958637_1280.png"
    },
    {
        id: 2,
        name: "Rote Herzkerze",
        price: 2.50,
        image: "https://cdn.pixabay.com/photo/2012/04/01/19/28/candle-23799_1280.png"
    },
    {
        id: 3,
        name: "Gedenkkerze Gold",
        price: 3.00,
        image: "https://cdn.pixabay.com/photo/2014/04/02/11/00/candle-304473_1280.png"
    }
];

let cart = [];

// Produkte anzeigen
function renderProducts() {
    const productsDiv = document.getElementById('products');
    productsDiv.innerHTML = "";
    products.forEach(product => {
        const div = document.createElement('div');
        div.className = "product";
        div.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price.toFixed(2)} €</p>
            <button onclick="addToCart(${product.id})">In den Warenkorb</button>
        `;
        productsDiv.appendChild(div);
    });
}

// Warenkorb anzeigen
function renderCart() {
    const cartDiv = document.getElementById('cart');
    if (cart.length === 0) {
        cartDiv.innerHTML = "<i>Der Warenkorb ist leer.</i>";
        return;
    }
    let html = "<ul>";
    let sum = 0;
    cart.forEach(item => {
        html += `<li>${item.name} (${item.price.toFixed(2)} €) 
        <button onclick="removeFromCart(${item.id})">Entfernen</button>
        </li>`;
        sum += item.price;
    });
    html += `</ul><strong>Gesamt: ${sum.toFixed(2)} €</strong>`;
    cartDiv.innerHTML = html;
}

window.addToCart = function(id) {
    const prod = products.find(p => p.id === id);
    if (prod) {
        cart.push(prod);
        renderCart();
    }
}

window.removeFromCart = function(id) {
    cart = cart.filter(item => item.id !== id);
    renderCart();
}

// Bestellung abschicken (nur Demo, keine echte Bezahlung!)
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    if (cart.length === 0) {
        document.getElementById('orderResult').innerHTML = "<b>Bitte lege mindestens eine Kerze in den Warenkorb!</b>";
        return;
    }
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    document.getElementById('orderResult').innerHTML = `
        <b>Vielen Dank, ${name}!</b><br>
        Du hast ${cart.length} Kerze(n) bestellt.<br>
        Eine Bestätigung wird an <b>${email}</b> gesendet.<br>
        (Dies ist nur eine Demo – keine echte Bestellung)
    `;
    cart = [];
    renderCart();
    document.getElementById('orderForm').reset();
});

// Initial render
renderProducts();
renderCart();