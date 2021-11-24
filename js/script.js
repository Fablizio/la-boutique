
/** funzione slideshow */

function slideshow() {
  setTimeout(() => {
    document.querySelector(".overlay").className = "overlay2";

    setTimeout(() => {
      document.querySelector(".overlay2").className = "overlay3";

      setTimeout(() => {
        document.querySelector(".overlay3").className = "overlay";
      }, 3000);
    }, 3000);
  }, 3000);
}

window.onload = setInterval(function () {
  slideshow();
}, 9000);


function setCartProductsNum() {
  cartProductsNum.textContent = `Numero prodotti: ${cartList.length}`;
}

function createProduct(parent, imgUrl, productTitle, textPrice, idProduct) {
  const product = document.createElement("div");
  product.className = "product";
  product.setAttribute("id", idProduct);

  createImg(product, imgUrl, productTitle);
  createText(product, productTitle, textPrice);
  parent.appendChild(product);

  product.addEventListener("click", (e) => {
    cartList.push(
      productsList.find(
        (product) => parseInt(e.currentTarget.id) === product.id
      )
    );
    setCartProductsNum();
    const modal = document.querySelector(".modal");
    const button = document.getElementsByClassName(".close");
    product.onclick = function () {
      modal.style.display = "block";
    };
    // Nel caso in cui volessimo aggiungere una interazione col LocalStorage
    localStorage.setItem("totCartitems", cartList.length);
  });
}
/** if i press the screen close the modal */
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function createImg(parent, imgUrl, productTitle) {
  const image = document.createElement("img");
  image.src = imgUrl;
  image.alt = productTitle;

  parent.appendChild(image);
}

function createText(parent, productTitle, textPrice) {
  const title = document.createElement("h4");
  title.textContent = productTitle;

  const price = document.createElement("strong");
  price.textContent = `${textPrice} $`

  parent.append(title, price);
}

function renderProducts(listItems) {
  listItems.map((product) => {
    createProduct(
      wrapperProducts,
      product.image,
      product.title,
      product.price,
      product.id
    );
  });
}

// Async await
const getProductsList = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  productsList = data;

  // Nella eventualità di aggiungere una quantità per prodotto
  // productsList = data.map((product) => {
  //   product.quantity = 0;
  //   return product;
  // });

  return renderProducts(data);
};

let productsList = [];
const wrapperProducts = document.querySelector(".wrapper__products");

// Parte inerente alla logica del carrello
let cartList = [];

let localStorageTot = localStorage.getItem("totCartitems");
const cartBtn = document.querySelector(".cartBtn");
const cartProductsNum = document.querySelector(".cartProductsNum");
const clearCartBtn = document.querySelector(".clearCart");

if (localStorageTot === null) {
  localStorageTot = 0
  ;
};


// Flusso generale
cartProductsNum.textContent = `Numero prodotti: ${localStorageTot}`;
getProductsList();

clearCartBtn.addEventListener("click", () => {
  cartList.length = 0;
  localStorage.removeItem("totCartitems", cartList.length)
  setCartProductsNum();
});

