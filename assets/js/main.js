
//Get all products sample

fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(json => console.log(json))

// main.js

document.addEventListener('DOMContentLoaded', function () {
    const mainElement = document.querySelector('main');
    const selectElement = document.querySelector('select');
    const searchInput = document.getElementById('search');
    const electronicsBtn = document.getElementById('electronicsBtn');
    const jewelryBtn = document.getElementById('jewelryBtn');
    const mensClothingBtn = document.getElementById('mensClothingBtn');
    const womensClothingBtn = document.getElementById('womensClothingBtn');

    let enterKeyPressed = false; 

    // Funktion zum Sortieren 
    const sortProducts = (products, sortBy) => {
        if (sortBy === 'lowToHigh') {
            return products.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'highToLow') {
            return products.sort((a, b) => b.price - a.price);
        } else {
            return products; 
        }
    };

    // Funktion zum Filtern nach Suchbegriff
    const filterProducts = (products, searchTerm) => {
        if (searchTerm.trim() === '' || !enterKeyPressed) {
            return products; 
        }

        const lowerCaseSearchTerms = searchTerm.toLowerCase().split(' ');

        return products.filter(product => {
            
            return lowerCaseSearchTerms.some(searchTerm =>
                product.description.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm)
            );
        });
    };

    // Funktion zum Filtern nach Kategorie
    const filterProductsByCategory = (products, category) => {
        return products.filter(product => product.category.toLowerCase() === category.toLowerCase());
    };

    // API-Aufruf zur fakestoreapi.com
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(products => {
            displayProducts(products);


            selectElement.addEventListener('change', () => {
                const selectedSortOption = selectElement.value;
                const sortedProducts = sortProducts(products, selectedSortOption);

                displayProducts(sortedProducts);
            });

            // Änderungen im Suchfeld überwachen
            searchInput.addEventListener('input', () => {
                enterKeyPressed = false;
                const searchTerm = searchInput.value;
                const filteredProducts = filterProducts(products, searchTerm);

                displayProducts(filteredProducts);
            });

            // Event Listener für Enter-Taste im Suchfeld
            searchInput.addEventListener('keyup', (event) => {
                if (event.key === 'Enter') {
                    enterKeyPressed = true; 
                    const searchTerm = searchInput.value;
                    const filteredProducts = filterProducts(products, searchTerm);

                    displayProducts(filteredProducts);
                }
            });

            // Event Listener für Kategorie-Buttons
            electronicsBtn.addEventListener('click', () => {
                const filteredProducts = filterProductsByCategory(products, 'electronics');
                displayProducts(filteredProducts);
            });

            jewelryBtn.addEventListener('click', () => {
                const filteredProducts = filterProductsByCategory(products, 'jewelery');
                displayProducts(filteredProducts);
            });

            mensClothingBtn.addEventListener('click', () => {
                const filteredProducts = filterProductsByCategory(products, "men's clothing");
                displayProducts(filteredProducts);
            });

            womensClothingBtn.addEventListener('click', () => {
                const filteredProducts = filterProductsByCategory(products, "women's clothing");
                displayProducts(filteredProducts);
            });
        })
        .catch(error => console.error('Error fetching products:', error));

    // Funktion zum Anzeigen der Produkte im main-Bereich
    const displayProducts = (products) => {
        mainElement.innerHTML = '';

        // Produkte in den main-Bereich einfügen
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <div class="PriceDiv"><p>$ ${product.price}</p><button id="addBtn">Add to cart</button></div>
                <!-- Weitere Produktinformationen hier einfügen -->
            `;
            mainElement.appendChild(productDiv);
        });
    };
});
