let nameInput = document.getElementById("nameInput");
let priceInput = document.getElementById("priceInput");
let searchInput = document.getElementById("searchInput");
let addButton = document.getElementById("addButton");
let clearButton = document.getElementById("clearButton");
let message = document.getElementById("message");
let productList = document.getElementById("productList");
let total = document.getElementById("total");


let products = [];


addButton.addEventListener("click", function () {
    let value = nameInput.value;
    let price = priceInput.value;
    let number = Number(price);

    if (value === "") {
        message.textContent = "商品名を入力してください";
    } else if (price === "") {
        message.textContent = "価格を入力してください";
    } else if (Number.isNaN(number)) {
        message.textContent = "数字を入力してください";
    } else {
        let product = {
            name: value,
            price: number
        }
        products.push(product);

        saveProducts();

        message.textContent = "追加しました";

        nameInput.value = "";
        priceInput.value = "";

        nameInput.focus();

        updateTotal();

        updateDisplay();

    }
});

loadProducts();

updateTotal();

updateDisplay();

clearButton.addEventListener("click", function () {
    products = [];
    saveProducts();
    updateTotal();
    updateDisplay();
});

//合計更新//
function updateTotal() {
    let sum = 0;

    products.forEach(function (product) {
        sum = sum + product.price
    });

    total.textContent = "合計" + sum + "円";
}

searchInput.addEventListener("input", function () {

    updateDisplay();

});
//検索条件で絞り込み//
function updateDisplay() {

    let keyword = searchInput.value.toLowerCase();

    let filteredProducts = products.filter(function (product) {
        return product.name.toLowerCase().includes(keyword);

    });

    renderProducts(filteredProducts);

}

//localStorageに保存//
function saveProducts() {
    localStorage.setItem("products", JSON.stringify(products));
}

//localStorageから読み込み//
function loadProducts() {
    let savedProducts = localStorage.getItem("products");

    if (savedProducts !== null) {
        products = JSON.parse(savedProducts);
    }
}


//商品一覧を描画//
function renderProducts(productArray) {
    productList.textContent = "";

    productArray.forEach(function (product) {
        let item = document.createElement("li");
        item.textContent = product.name + ":" + product.price + "円";

        let button = document.createElement("button");
        button.textContent = "削除";

        button.classList.add("deleteButton");

        button.addEventListener("click", function () {

            products = products.filter(function (itemProduct) {
                return itemProduct !== product;
            });

            saveProducts();

            updateTotal();

            updateDisplay();

        });

        item.append(button);
        productList.append(item);

    });
}












