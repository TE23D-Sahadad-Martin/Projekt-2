// Skapa en tom varukorg eller hämta från localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Funktion för att lägga till en produkt i varukorgen
function addToCart(productName, productPrice) {
    cart.push({ name: productName, price: productPrice });
    localStorage.setItem('cart', JSON.stringify(cart)); // Spara i localStorage
    updateCartDisplay();
}

// Funktion för att uppdatera varukorgen
function updateCartDisplay() {
    const cartList = document.getElementById('cart-list');
    const totalPrice = document.getElementById('total-price');
    const cartCount = document.getElementById('cart-count');
    
    if (!cartList || !totalPrice) return;

    // Töm varukorgens innehåll innan vi uppdaterar den
    cartList.innerHTML = '';

    // Lägg till varje produkt i varukorgen
    cart.forEach((product, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${product.name} - ${product.price}kr 
            <button class="remove-btn" onclick="removeFromCart(${index})">❌</button>
        `;
        cartList.appendChild(listItem);
    });

    // Räkna ut det totala priset
    const total = cart.reduce((sum, product) => sum + product.price, 0);
    totalPrice.textContent = `Totalt: ${total}kr`;

    // Uppdatera varukorgens räknare
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Funktion för att ta bort en produkt från varukorgen
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart)); // Uppdatera localStorage
    updateCartDisplay();
}

// Funktion för att visa/dölja varukorgen
function toggleCart() {
    const cartContainer = document.getElementById('cart-container');
    if (cartContainer) {
        cartContainer.classList.toggle('show');
    }
}

// Funktion för att koppla knappar till "Lägg till i varukorg"
function setupAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const productName = event.target.getAttribute('data-product-name');
            const productPrice = parseFloat(event.target.getAttribute('data-product-price'));
            if (productName && !isNaN(productPrice)) {
                addToCart(productName, productPrice);
            }
        });
    });
}

// Kör setup-funktion när sidan är laddad
document.addEventListener('DOMContentLoaded', () => {
    setupAddToCartButtons();
    updateCartDisplay(); // Uppdatera varukorgen vid sidladdning
});
