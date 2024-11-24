function collectData() {
    const productName = document.getElementById(`productName`).value;
    const productPrice = document.getElementById(`productPrice`).value;
    const productCategory = document.getElementById(`productCategory`).value;
    const imageURL = document.getElementById(`imageURL`).value;

    return {
        productName: productName,
        productPrice: productPrice,
        productCategory: productCategory,
        imageURL: imageURL
    }   
}

function generateHTML(productData, index) {
    const newHTML = `
    <tr>
                    <td>${productData.productName}</td>
                    <td>${productData.productPrice} $</td>
                    <td>${productData.productCategory}</td>
                    <td><img src="${productData.imageURL}"></td>
                    <td><button onclick="deleteProduct(${index})" class="btn btn-primary">Delete Item</button></td>
                </tr>
    `
    return newHTML;
}

function deleteProduct(index) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    document.getElementById('productBodyTable').innerHTML = '';

    let i = 0;
    for (const product of products) {
        const newHTML = generateHTML(product, i);
        renderHTML(newHTML);
        i++
    }
}

function renderHTML(newHTML) {
    const newTableRow = document.getElementById(`productBodyTable`);
    newTableRow.innerHTML += newHTML;
}

function addToStorage(productData) {
    const oldStorage = JSON.parse(localStorage.getItem(`products`)) || [];
    oldStorage.push(productData)
    localStorage.setItem(`products`, JSON.stringify(oldStorage));
}

function clearForm() {
    const form = document.getElementById(`productsForm`);
    form.reset();
    document.getElementById(`productName`).focus();

}

function addProduct(event) {
    event.preventDefault();
    const productData = collectData();
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const newHTML = generateHTML(productData, products.length);
    renderHTML(newHTML);
    addToStorage(productData);
    clearForm();
}

function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    
    let i=0;
    for (const product of products) {
        const newHTML=generateHTML(product, i)
        renderHTML(newHTML);
        i++
    }
}

loadProducts();