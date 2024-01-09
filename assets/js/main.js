
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

    let enterKeyPressed = false; // Variable, um zu überprüfen, ob Enter-Taste gedrückt wurde

    // Funktion zum Sortieren der Produkte nach Preis
    const sortProducts = (products, sortBy) => {
        if (sortBy === 'lowToHigh') {
            return products.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'highToLow') {
            return products.sort((a, b) => b.price - a.price);
        } else {
            return products; // Standard: unveränderte Reihenfolge
        }
    };

    // Funktion zum Filtern der Produkte nach Suchbegriff
    const filterProducts = (products, searchTerm) => {
        if (searchTerm.trim() === '' || !enterKeyPressed) {
            return products; // Wenn die Suche leer ist oder Enter-Taste nicht gedrückt wurde, zeige alle Produkte
        }

        const lowerCaseSearchTerms = searchTerm.toLowerCase().split(' ');

        return products.filter(product => {
            // Überprüfe, ob jedes Suchwort in der Beschreibung oder Kategorie enthalten ist
            return lowerCaseSearchTerms.some(searchTerm =>
                product.description.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm)
            );
        });
    };

    // Funktion zum Filtern der Produkte nach Kategorie
    const filterProductsByCategory = (products, category) => {
        return products.filter(product => product.category.toLowerCase() === category.toLowerCase());
    };

    // API-Aufruf zur fakestoreapi.com
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(products => {
            // Produkte nach Standardreihenfolge einfügen
            displayProducts(products);

            // Änderungen im Select-Element überwachen
            selectElement.addEventListener('change', () => {
                const selectedSortOption = selectElement.value;
                const sortedProducts = sortProducts(products, selectedSortOption);
                // Produkte neu anzeigen, nachdem sie sortiert wurden
                displayProducts(sortedProducts);
            });

            // Änderungen im Suchfeld überwachen
            searchInput.addEventListener('input', () => {
                enterKeyPressed = false; // Zurücksetzen der Enter-Taste-Variable
                const searchTerm = searchInput.value;
                const filteredProducts = filterProducts(products, searchTerm);
                // Produkte neu anzeigen, nachdem sie gefiltert wurden
                displayProducts(filteredProducts);
            });

            // Event Listener für Enter-Taste im Suchfeld
            searchInput.addEventListener('keyup', (event) => {
                if (event.key === 'Enter') {
                    enterKeyPressed = true; // Setzen der Enter-Taste-Variable
                    const searchTerm = searchInput.value;
                    const filteredProducts = filterProducts(products, searchTerm);
                    // Produkte neu anzeigen, nachdem sie gefiltert wurden
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
        mainElement.innerHTML = ''; // main-Bereich leeren

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
