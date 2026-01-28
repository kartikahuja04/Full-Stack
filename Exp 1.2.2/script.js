const products = [
    {
        id: 1,
        name: "Wireless Mouse",
        price: 499,
        image:
            "https://www.portronics.com/cdn/shop/files/Toad_8_Wireless_Mouse_for_Laptop_1440x.jpg?v=1732528723",
    },
    {
        id: 2,
        name: "Bluetooth Headphones",
        price: 1299,
        image:
            "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:450/boat/494623560/0/1bmWNfO8OE-SooOwpW0L8-boAt-Bluetooth-Wireless-Headphone-494623560-i-1-1200Wx1200H.jpeg",
    },
    {
        id: 3,
        name: "Mechanical Keyboard",
        price: 2499,
        image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc-VkgGIxihgGAq-xCIKdLuLs8DUyseeMioA&s",
    },
    {
        id: 4,
        name: "Portable SSD",
        price: 3499,
        image:
            "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:450/sandisk/493839058/0/Gu3mN0kMkO-hNRTCpSj41-Sandisk-USB-SSD-493839058-i-1-1200Wx1200H.jpeg",
    },
    {
        id: 5,
        name: "Smartwatch",
        price: 3999,
        image:
            "https://www.gonoise.com/cdn/shop/files/Artboard2-min.png?v=1713344000",
    },
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
