let name = document.getElementById("name");
let address = document.getElementById("address");
let products = [
    { name: productName1, quantity: productQuantity1, price: productPrice1 },
    { name: productName2, quantity: productQuantity2, price: productPrice2 },
    { name: productName3, quantity: productQuantity3, price: productPrice3 },
    { name: productName4, quantity: productQuantity4, price: productPrice4 },
    { name: productName5, quantity: productQuantity5, price: productPrice5 },
    { name: productName6, quantity: productQuantity6, price: productPrice6 },
    { name: productName7, quantity: productQuantity7, price: productPrice7 },
    { name: productName8, quantity: productQuantity8, price: productPrice8 },
    { name: productName9, quantity: productQuantity9, price: productPrice9 }
];

// Load saved cart from localStorage
function loadSavedCart() {
    let savedCart = localStorage.getItem('savedCart');
    let savedTotal = localStorage.getItem('savedTotal');
    let savedName = localStorage.getItem('savedName');
    let savedAddress = localStorage.getItem('savedAddress');
    
    if (savedCart) carts.textContent = savedCart;
    if (savedTotal) total.value = savedTotal;
    if (savedName) name.value = savedName;
    if (savedAddress) address.value = savedAddress;

    // Load product quantities
    products.forEach((product, index) => {
        let savedQuantity = localStorage.getItem(`productQuantity${index + 1}`);
        if (savedQuantity) product.quantity.value = savedQuantity;
    });
}

// Save cart, total, and details to localStorage
function saveCart() {
    localStorage.setItem('savedCart', carts.textContent);
    localStorage.setItem('savedTotal', total.value);
    localStorage.setItem('savedName', name.value);
    localStorage.setItem('savedAddress', address.value);

    // Save product quantities
    products.forEach((product, index) => {
        localStorage.setItem(`productQuantity${index + 1}`, product.quantity.value);
    });
}

function addOrder() {
    carts.textContent = "";
    let totalPrice = 0;

    products.forEach((product) => {
        let quantity = parseFloat(product.quantity.value);
        if (quantity > 0) {
            let order = `${product.name.textContent} ${quantity} pc/s - ₱${(quantity * parseFloat(product.price.textContent)).toFixed(2)}\n`;
            carts.textContent += order;
            totalPrice += quantity * parseFloat(product.price.textContent);
        }
    });

    total.value = '₱ ' + totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    calculateChange();
    saveCart(); // Save cart details to localStorage
}

function calculateChange() {
    let totalPrice = parseFloat(total.value.replace('₱ ', '').replace(/,/g, ''));
    let cashTendered = parseFloat(cash.value);
    if (cashTendered >= totalPrice) {
        let changeAmount = cashTendered - totalPrice;
        change.value = '₱ ' + changeAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
}

function displayReceipt() {
    if (carts.textContent.trim() === '') {
        alert("No orders found. Please add items to your cart.");
        return;
    }
    if (parseFloat(change.value.replace('₱ ', '').replace(/,/g, '')) >= 0) {
        let receipt = `Receipt:\n\n${carts.textContent}\nTotal: ${total.value}\nCash Tendered: ₱ ${cash.value}\nChange: ${change.value}\n\nThank you for your purchase, ${name.value}!\nWe will ship to: ${address.value}!\tRide Safe GARRR!`;
        alert(receipt);

        // Clear form and cart
        [carts.textContent, total.value, cash.value, change.value, name.value, address.value] = ["", "", "", "", "", ""];
        products.forEach(product => product.quantity.value = "");
        localStorage.clear(); // Clear localStorage after successful purchase
    } else {
        alert("Please enter cash amount.");
    }
}

// Add event listeners
products.forEach(product => {
    product.quantity.addEventListener("keyup", addOrder);
    product.quantity.addEventListener("click", addOrder);
});

cash.addEventListener("keyup", calculateChange);
document.getElementById('checkoutBtn').addEventListener('click', displayReceipt);

// Load saved cart on page load
window.onload = loadSavedCart;
