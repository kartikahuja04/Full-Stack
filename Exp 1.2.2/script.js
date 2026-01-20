// Sample product data
const products = [
    { id: 1, name: "Wireless Mouse", price: 499, image: "https://via.placeholder.com/100?text=Mouse" },
    { id: 2, name: "Bluetooth Headphones", price: 1299, image: "https://via.placeholder.com/100?text=Headphones" },
    { id: 3, name: "USB-C Charger", price: 699, image: "https://via.placeholder.com/100?text=Charger" },
    { id: 4, name: "Laptop Stand", price: 899, image: "https://via.placeholder.com/100?text=Stand" },
    { id: 5, name: "Webcam", price: 999, image: "https://via.placeholder.com/100?text=Webcam" },
    { id: 6, name: "Mechanical Keyboard", price: 2499, image: "https://via.placeholder.com/100?text=Keyboard" },
    { id: 7, name: "Portable SSD", price: 3499, image: "https://via.placeholder.com/100?text=SSD" },
    { id: 8, name: "Smartwatch", price: 3999, image: "https://via.placeholder.com/100?text=Watch" }
];

const productList = document.getElementById('product-list');
const sortSelect = document.getElementById('sort');

function renderProducts(items) {
    productList.innerHTML = '';
    items.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <div class="price">₹${product.price}</div>
        `;
        productList.appendChild(card);
    });
}

function sortProducts(products, sortBy) {
    let sorted = [...products];
    switch (sortBy) {
        case 'price-asc':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            sorted.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            sorted.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            sorted.sort((a, b) => b.name.localeCompare(a.name));
            break;
        default:
            // No sorting
            break;
    }
    return sorted;
}

sortSelect.addEventListener('change', function() {
    const sorted = sortProducts(products, sortSelect.value);
    // Animate fade out
    productList.style.opacity = 0;
    setTimeout(() => {
        renderProducts(sorted);
        productList.style.opacity = 1;
    }, 200);
});

// Initial render
renderProducts(products);
