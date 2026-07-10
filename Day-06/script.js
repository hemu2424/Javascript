"use strict";


const state = {
    products: [],
    filteredProducts: [],
    loading: false,
    error: null
};


const dom = {
    searchInput: null,
    searchButton: null,
    productContainer: null,
    loading: null,
    error: null
};


const API_URL = "https://fakestoreapi.com/products";






function showLoading() {

    state.loading = true;

    if (dom.loading) {
        dom.loading.style.display = "block";
    }

}

function hideLoading() {

    state.loading = false;

    if (dom.loading) {
        dom.loading.style.display = "none";
    }

}
function showError(message) {

    state.error = message;

    console.error(message);

    if (dom.error) {
        dom.error.textContent = message;
        dom.error.style.display = "block";
    }

}



function saveProducts(products) {

    state.products = products;

    state.filteredProducts = [...products];

}



function request(url, onSuccess, onError) {

    showLoading();

    fetch(url)

        .then(response => {

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }

            return response.json();

        })

        .then(data => {

            onSuccess(data);

        })

        .catch(error => {

            onError(error.message);

        })

        .finally(() => {

            hideLoading();

        });

}



function handleProductsSuccess(products) {

    saveProducts(products);

    renderProducts(state.filteredProducts);

}




function handleProductsError(message) {

    showError(message);

}



function fetchProducts() {

    request(
        API_URL,
        handleProductsSuccess,
        handleProductsError
    );

}



function createProductCard(product) {

    return `
        <div class="card">
            <img src="${product.image}" alt="${product.title}">

            <h3>${product.title}</h3>

            <p>$${product.price}</p>

            <p>${product.category}</p>
        </div>
    `;

}


function renderProducts(products) {

    if (!dom.productContainer) {
        console.log(products);
        return;
    }

    let html = "";

    products.forEach(product => {

        html += createProductCard(product);

    });

    dom.productContainer.innerHTML = html;

}


function searchProducts(searchText) {

    const query = searchText.trim().toLowerCase();

    if (query === "") {

        state.filteredProducts = [...state.products];

    } else {

        state.filteredProducts = state.products.filter(product => {

            return product.title.toLowerCase().includes(query);

        });

    }

    renderProducts(state.filteredProducts);

}



function initializeDOM() {

    dom.searchInput = document.getElementById("searchInput");
    dom.searchButton = document.getElementById("searchButton");
    dom.productContainer = document.getElementById("productContainer");
    dom.loading = document.getElementById("loading");
    dom.error = document.getElementById("error");

}



function addEventListeners() {

    if (!dom.searchButton || !dom.searchInput) {
        return;
    }

    dom.searchButton.addEventListener("click", function () {

        searchProducts(dom.searchInput.value);

    });

    dom.searchInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            searchProducts(dom.searchInput.value);

        }

    });

}



function initializeApp() {

    initializeDOM();

    addEventListeners();

    fetchProducts();

}

initializeApp();

