
//Get all products

fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(json => console.log(json))

    // start

document.addEventListener('DOMContentLoaded', function () {
    const mainElement = document.querySelector('main');

    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(products => {
            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.innerHTML = `
                    <h3>${product.title}</h3>
                    <p>Price: $${product.price}</p>
                    <p>Category: ${product.category}</p>
                    <img src="${product.image}" alt="${product.title}">
                    <!-- Weitere Produktinformationen hier einfügen -->
                `;
                mainElement.appendChild(productDiv);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
});

