"use strict";

const products = [
    {
        id: 1,
        name: "iPhone 15",
        category: "Mobile",
        brand: "Apple",
        price: 79999,
        stock: 15,
        rating: 4.8,
        createdAt: "2026-07-01"
    },
    {
        id: 2,
        name: "Galaxy S25",
        category: "Mobile",
        brand: "Samsung",
        price: 72999,
        stock: 10,
        rating: 4.7,
        createdAt: "2026-06-20"
    },
    {
        id: 3,
        name: "MacBook Air M4",
        category: "Laptop",
        brand: "Apple",
        price: 114999,
        stock: 8,
        rating: 4.9,
        createdAt: "2026-05-15"
    },
    {
        id: 4,
        name: "Dell Inspiron 15",
        category: "Laptop",
        brand: "Dell",
        price: 58999,
        stock: 12,
        rating: 4.5
    },
    {
        id: 5,
        name: "Sony WH-1000XM6",
        category: "Headphone",
        brand: "Sony",
        price: 28999,
        stock: 20,
        rating: 4.8
    }
];

const state = {
    editingId: null,
    filters: {
        category: "all",
        brand: "all",
        stock: "all",
        minPrice: 0,
        maxPrice: Infinity
    },
    sortBy: ""
};

const productForm = document.getElementById("productForm");
const nameInput = document.getElementById("name");
const categoryInput = document.getElementById("category");
const brandInput = document.getElementById("brand");
const priceInput = document.getElementById("price");
const stockInput = document.getElementById("stock");
const ratingInput = document.getElementById("rating");

const categoryFilter = document.getElementById("categoryFilter");
const brandFilter = document.getElementById("brandFilter");
const stockFilter = document.getElementById("stockFilter");
const minPriceFilter = document.getElementById("minPrice");
const maxPriceFilter = document.getElementById("maxPrice");
const sortSelect = document.getElementById("sortBy");
const productList = document.getElementById("productList");
const resultsCount = document.getElementById("resultsCount");
const formTitle = document.getElementById("formTitle");
const submitBtn = document.getElementById("submitBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");
const resetFiltersBtn = document.getElementById("resetFilters");

function generateId() {
    if (products.length === 0) return 1;
    return Math.max(...products.map(product => product.id)) + 1;
}

function getProductById(id) {
    return products.find(product => product.id === id);
}

function getProductIndex(id) {
    return products.findIndex(product => product.id === id);
}

function addProduct(productData) {
    const newProduct = {
        id: generateId(),
        name: productData.name.trim(),
        category: productData.category.trim(),
        brand: productData.brand.trim(),
        price: Number(productData.price),
        stock: Number(productData.stock),
        rating: Number(productData.rating),
        createdAt: new Date().toISOString()
    };

    products.push(newProduct);
    return newProduct;
}

function updateProduct(id, productData) {
    const index = getProductIndex(id);
    if (index === -1) {
        return false;
    }

    products[index] = {
        ...products[index],
        name: productData.name.trim(),
        category: productData.category.trim(),
        brand: productData.brand.trim(),
        price: Number(productData.price),
        stock: Number(productData.stock),
        rating: Number(productData.rating)
    };

    return true;
}

function deleteProduct(id) {
    const updatedProducts = products.filter(product => product.id !== id);
    if (updatedProducts.length === products.length) {
        return false;
    }

    products.length = 0;
    products.push(...updatedProducts);
    return true;
}

function filterByCategory(productsToFilter) {
    if (state.filters.category === "all") {
        return productsToFilter;
    }

    return productsToFilter.filter(product => product.category === state.filters.category);
}

function filterByBrand(productsToFilter) {
    if (state.filters.brand === "all") {
        return productsToFilter;
    }

    return productsToFilter.filter(product => product.brand === state.filters.brand);
}

function filterByPrice(productsToFilter) {
    const minPrice = Number(state.filters.minPrice) || 0;
    const maxPrice = Number(state.filters.maxPrice) || Infinity;

    return productsToFilter.filter(product => product.price >= minPrice && product.price <= maxPrice);
}

function filterByStock(productsToFilter) {
    if (state.filters.stock === "all") {
        return productsToFilter;
    }

    if (state.filters.stock === "instock") {
        return productsToFilter.filter(product => product.stock > 0);
    }

    return productsToFilter.filter(product => product.stock === Number(state.filters.stock));
}

function applyFilters() {
    let filteredProducts = [...products];

    filteredProducts = filterByCategory(filteredProducts);
    filteredProducts = filterByBrand(filteredProducts);
    filteredProducts = filterByPrice(filteredProducts);
    filteredProducts = filterByStock(filteredProducts);

    return filteredProducts;
}

function applySorting(productsToSort) {
    const sortedProducts = [...productsToSort];

    switch (state.sortBy) {
        case "price-low-high":
            return sortedProducts.sort((a, b) => a.price - b.price);
        case "price-high-low":
            return sortedProducts.sort((a, b) => b.price - a.price);
        case "name-a-z":
            return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        case "name-z-a":
            return sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        case "rating-high-low":
            return sortedProducts.sort((a, b) => b.rating - a.rating);
        default:
            return sortedProducts;
    }
}

function createProductCard(product) {
    return `
        <article class="product-card" data-id="${product.id}">
            <h3>${product.name}</h3>
            <p><strong>Category:</strong> ${product.category}</p>
            <p><strong>Brand:</strong> ${product.brand}</p>
            <p><strong>Price:</strong> ₹${product.price.toLocaleString()}</p>
            <p><strong>Stock:</strong> ${product.stock}</p>
            <p><strong>Rating:</strong> ${product.rating}</p>
            <div class="card-actions">
                <button type="button" class="edit-btn">Edit</button>
                <button type="button" class="delete-btn">Delete</button>
            </div>
        </article>
    `;
}

function renderProducts() {
    const visibleProducts = applySorting(applyFilters());

    productList.innerHTML = "";
    resultsCount.textContent = `${visibleProducts.length} product${visibleProducts.length === 1 ? "" : "s"} shown`;

    if (visibleProducts.length === 0) {
        productList.innerHTML = "<div class=\"empty-state\">No products match these filters.</div>";
        return;
    }

    visibleProducts.forEach(product => {
        productList.insertAdjacentHTML("beforeend", createProductCard(product));
    });
}

function populateFilterOptions() {
    const categories = ["all", ...new Set(products.map(product => product.category))];
    const brands = ["all", ...new Set(products.map(product => product.brand))];

    categoryFilter.innerHTML = categories.map(category => `<option value="${category}">${category}</option>`).join("");
    brandFilter.innerHTML = brands.map(brand => `<option value="${brand}">${brand}</option>`).join("");
}

function getFormData() {
    return {
        name: nameInput.value,
        category: categoryInput.value,
        brand: brandInput.value,
        price: priceInput.value,
        stock: stockInput.value,
        rating: ratingInput.value
    };
}

function setFormMode(isEditing) {
    formTitle.textContent = isEditing ? "Edit Product" : "Add Product";
    submitBtn.textContent = isEditing ? "Update Product" : "Add Product";
    cancelEditBtn.classList.toggle("hidden", !isEditing);
}

function resetForm() {
    productForm.reset();
    state.editingId = null;
    setFormMode(false);
}

function fillForm(product) {
    nameInput.value = product.name;
    categoryInput.value = product.category;
    brandInput.value = product.brand;
    priceInput.value = product.price;
    stockInput.value = product.stock;
    ratingInput.value = product.rating;
}

function updateFilterState() {
    state.filters.category = categoryFilter.value;
    state.filters.brand = brandFilter.value;
    state.filters.stock = stockFilter.value;
    state.filters.minPrice = minPriceFilter.value === "" ? 0 : Number(minPriceFilter.value);
    state.filters.maxPrice = maxPriceFilter.value === "" ? Infinity : Number(maxPriceFilter.value);
    renderProducts();
}

function resetFilters() {
    categoryFilter.value = "all";
    brandFilter.value = "all";
    stockFilter.value = "all";
    minPriceFilter.value = "";
    maxPriceFilter.value = "";
    sortSelect.value = "";
    state.filters = {
        category: "all",
        brand: "all",
        stock: "all",
        minPrice: 0,
        maxPrice: Infinity
    };
    state.sortBy = "";
    renderProducts();
}

function handleSubmit(event) {
    event.preventDefault();

    const formData = getFormData();
    if (!formData.name.trim() || !formData.category.trim() || !formData.brand.trim() || !formData.price || !formData.stock || !formData.rating) {
        alert("Please fill all required fields.");
        return;
    }

    if (state.editingId) {
        updateProduct(state.editingId, formData);
    } else {
        addProduct(formData);
    }

    populateFilterOptions();
    resetForm();
    renderProducts();
}

function handleProductListClick(event) {
    const editButton = event.target.closest(".edit-btn");
    const deleteButton = event.target.closest(".delete-btn");
    const card = event.target.closest(".product-card");

    if (!card) {
        return;
    }

    const productId = Number(card.dataset.id);

    if (editButton) {
        const product = getProductById(productId);
        if (product) {
            fillForm(product);
            state.editingId = product.id;
            setFormMode(true);
        }
    }

    if (deleteButton) {
        const confirmed = confirm("Are you sure you want to delete this product?");
        if (!confirmed) {
            return;
        }

        deleteProduct(productId);
        populateFilterOptions();
        if (state.editingId === productId) {
            resetForm();
        }
        renderProducts();
    }
}

function bindEvents() {
    productForm.addEventListener("submit", handleSubmit);
    cancelEditBtn.addEventListener("click", resetForm);

    [categoryFilter, brandFilter, stockFilter, minPriceFilter, maxPriceFilter].forEach(element => {
        element.addEventListener("change", updateFilterState);
        element.addEventListener("input", updateFilterState);
    });

    sortSelect.addEventListener("change", event => {
        state.sortBy = event.target.value;
        renderProducts();
    });

    resetFiltersBtn.addEventListener("click", resetFilters);
    productList.addEventListener("click", handleProductListClick);
}

function init() {
    populateFilterOptions();
    bindEvents();
    resetForm();
    renderProducts();
}

document.addEventListener("DOMContentLoaded", init);