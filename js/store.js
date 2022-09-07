let allProducts = [
    {id:1, productName:"Album 1", price:12, photo:"Images/Album 1.png", count:1},
    {id:2, productName:"Album 2", price:14, photo:"Images/Album 2.png", count:1},
    {id:3, productName:"Cofee", price:16, photo:"Images/Cofee.png", count:1},
    {id:4, productName:"Shirt", price:18, photo:"Images/Shirt.png", count:1}
];

let userBasket = [];

const $ = document;
const shopItemsContainer = $.querySelector(".shop-items");
const bastekProductsContainer = $.querySelector(".cart-items");
const removeAllProductsBtn = $.querySelector(".delet-all-product");
const cartTotalPriceElem = $.querySelector(".total-price");

let productsFragment = $.createDocumentFragment();

allProducts.forEach((products) => {
    newProducts(products);
});
function newProducts(pro) {
    
    let shopItemElem, titleElem, imgElem, detailsElem, priceElem, addBtnElem ;
    
    shopItemElem = $.createElement("div");
    shopItemElem.className = "shop-item";

    titleElem = $.createElement("span");
    titleElem.className = "shop-item-title";
    titleElem.innerHTML = pro.productName;

    imgElem = $.createElement("img");
    imgElem.className = "shop-item-image";
    imgElem.setAttribute("src", pro.photo);

    detailsElem = $.createElement("div");
    detailsElem.className = "shop-item-details";

    priceElem = $.createElement("span");
    priceElem.className = "shop-item-price";
    priceElem.innerHTML = "$ " + pro.price;

    addBtnElem = $.createElement("button");
    addBtnElem.className = "btn btn-primary shop-item-button";
    addBtnElem.setAttribute("type", "button");
    addBtnElem.innerHTML = "ADD TO CART";
    
    addBtnElem.addEventListener('click', ()=>{
        addProductToBasketArray(pro.id, pro);
    });


    detailsElem.append(priceElem, addBtnElem);

    shopItemElem.append(titleElem, imgElem, detailsElem);

    productsFragment.append(shopItemElem);

};
shopItemsContainer.append(productsFragment);


function addProductToBasketArray (productId, product) {

    let mainProduct = allProducts.find((prouducts)=>{
        return prouducts.id === productId;
    });


    let sss = userBasket.some((product)=>{
        return product.id === productId;
    });
    if (sss) {
        product.count ++;
    }else{
        userBasket.push(mainProduct);
    };




    basketProductsGenerator(userBasket);
    calcTotalPrice(userBasket);
};


function basketProductsGenerator(userBasketArray) {
    bastekProductsContainer.innerHTML = "";

    let cartRowElem, cartItemElem, cartImgElem, titleElem, priceElem, cartQuantityElem, cartInputElem, btnDelet; 
   
    userBasketArray.forEach((product)=>{
        cartRowElem = $.createElement("div");
        cartRowElem.classList = "cart-row";
    
        cartItemElem = $.createElement("div");
        cartItemElem.classList = "cart-item cart-column";
    
        cartImgElem = $.createElement("img");
        cartImgElem.classList = "cart-item-image";
        cartImgElem.setAttribute("src", product.photo);
        cartImgElem.setAttribute("width", "100");
        cartImgElem.setAttribute("height", "100");
    
        titleElem = $.createElement("span");
        titleElem.className = "cart-item-title";
        titleElem.innerHTML = product.productName;
    
        cartItemElem.append(cartImgElem, titleElem);
    
        priceElem = $.createElement("span");
        priceElem.className = "cart-price cart-column";
        priceElem.innerHTML = "$ " + product.price;
    
        cartQuantityElem = $.createElement("div");
        cartQuantityElem.className = "cart-quantity cart-column";
    
        cartInputElem = $.createElement("input");
        cartInputElem.className = "cart-quantity-input";
        cartInputElem.setAttribute("type", "number");
        cartInputElem.setAttribute("value", product.count);
        cartInputElem.addEventListener('change', ()=>{
            updateProuductCount(product.id, cartInputElem.value);
        });
    
        btnDelet = $.createElement("button");
        btnDelet.classList = "btn btn-danger";
        btnDelet.setAttribute("type", "button");
        btnDelet.innerHTML = "REMOVE";

        btnDelet.addEventListener('click', ()=>{
            deletProuductFromBasket(product.id);
        });
    
        cartQuantityElem.append(cartInputElem, btnDelet);
    
        cartRowElem.append(cartItemElem, priceElem, cartQuantityElem);
    
        bastekProductsContainer.append(cartRowElem);
    });

};

function deletProuductFromBasket(productId) {

    userBasket = userBasket.filter((product)=>{
        return product.id  !== productId;
    });

    basketProductsGenerator(userBasket);
};

removeAllProductsBtn.addEventListener('click', ()=>{
    userBasket = [];
    basketProductsGenerator(userBasket);
    cartTotalPriceElem.innerHTML = "$ 0";
});

function calcTotalPrice(userBasketArray) {
    let totalPriceValue = 0;
    userBasketArray.forEach((product)=>{
        totalPriceValue += product.count * product.price;
    });

   cartTotalPriceElem.innerHTML = "$ " + totalPriceValue;
};

function updateProuductCount(productId, newCount) {
    userBasket.forEach((product)=>{
        if (product.id === productId) {
            product.count = newCount;
        };
    });
    calcTotalPrice(userBasket);
};