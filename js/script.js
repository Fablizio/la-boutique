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
    const localStorageValue = localStorage.getItem("totCartitems");
    if (localStorageValue) {
      cartList = JSON.parse(localStorageValue);
    }

    cartList.push(
      productsList.find(
        (product) => parseInt(e.currentTarget.id) === product.id
      )
    );
    setCartProductsNum();

    function modal() {
      const modal = document.querySelector(".modal");
      const button = document.getElementsByClassName(".close");
      product.onclick = function () {
        modal.style.display = "block";
      };
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    }

    modal();
    // Nel caso in cui volessimo aggiungere una interazione col LocalStorage

    localStorage.setItem("totCartitems", JSON.stringify(cartList));

    // console.log("LOCAL STORAGE ==>", localStorageValue);
  });
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
  price.textContent = `${textPrice} $`;

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

const localStorageTot = localStorage.getItem("totCartitems");
const cartBtn = document.querySelector(".cartBtn");
const cartProductsNum = document.querySelector(".cartProductsNum");
const clearCartBtn = document.querySelector(".clearCart");

// Flusso generale
const parsedTotCardItemsLen =
  JSON.parse(localStorage.getItem("totCartitems"))?.length || 0;

cartProductsNum.textContent = `Numero prodotti: ${parsedTotCardItemsLen || 0}`;
getProductsList();

clearCartBtn.addEventListener("click", () => {
  cartList.length = 0;
  localStorage.removeItem("totCartitems", cartList.length);
  setCartProductsNum();
});

let reviews = new Array();
reviews[0] = "Stupendo 10/10 ❤️❤️❤️";
reviews[1] =
  "In questo negozio ho comprato la mia felpa preferita :) 10/10 ✨✨✨";
reviews[2] = "Il negozio che ho sempre sognato!!! 10/10 🌟🌟🌟";
reviews[3] = "Questo negozio mi ha cambiato la vita!!!! 😊😊😊😊";

let counter = 0;
function loop() {
  if (counter > 2) counter = 0;
  document.getElementById("box__reviews").firstElementChild.innerHTML =
    reviews[counter];
  counter++;
  setTimeout(loop, 2000);
}
loop();
