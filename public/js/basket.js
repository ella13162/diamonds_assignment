// JavaScript for managing the basket
let basket = [];
let total = 0;

function addToBasket(productName, price) {
    basket.push({ productName, price });
    total += price;
    updateBasket();
}

function updateBasket() {
    const basketItems = document.getElementById('basket-items');
    const basketTotal = document.getElementById('basket-total');
    basketItems.innerHTML = '';
    basket.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.productName}: $${item.price.toFixed(2)}`;
        basketItems.appendChild(listItem);
    });
    basketTotal.textContent = total.toFixed(2);
}