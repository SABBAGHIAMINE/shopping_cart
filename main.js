

//import la BD des objets

import products from "./products.js";


const cartItemsEl = document.querySelector(".items-list");
const subtotalEl = document.querySelector(".totalOrder");


//fonction d'incrementation des quantites et aussi le calcul du montant de la ligne
function increment_quantity(item){
     let quantite=parseInt(document.getElementById("qty"+item.id).value);
     quantite=isNaN(quantite)?0:quantite;
     quantite++;
     document.getElementById("qty"+item.id).value=quantite;
     let price=document.getElementById("total-price"+item.id);
     let montant=Number(item.price)*quantite;
     price.textContent=montant.toFixed(2);


};

//fonction de decrementation des quantites et aussi le calcul du montant de la ligne 
function decrement_quantity(item){
    let quantite=parseInt(document.getElementById("qty"+item.id).value);
    quantite=isNaN(quantite)?0:quantite;  
    if(quantite>0){
    quantite--;
    }
    document.getElementById("qty"+item.id).value=quantite;
    // document.getElementById(item.id).value=quantite;
    let price=document.getElementById("total-price"+item.id);
    let montant=Number(item.price)*quantite;
    price.textContent=montant.toFixed(2);
};
// RENDER (affechir) PRODUCTS
function renderProdcuts() {
    // console.log(products);
    products.forEach((product,index) => {
        let element=document.createElement("div");
        element.classList.add("item");
        element.id=index;
        element.innerHTML = `
        <div class="btns">
        <span class="delete-btn"></span>
        <span class="like-btn"></span>
        </div>
        <div class="image">
        <img src="${product.imgSrc}" alt="${product.name}">
</div>
<div class="description">
<span>${product.description}</span>
</div>

<div class="quantity">

<button type="button" class="minus-btn btn" name="button"  ><img src="images/minus.svg"></button>
<input type="text" value=${product.qty} name="text" id=${"qty"+index} class="qte">
<button type="button" class="plus-btn btn" name="button" ><img src="images/plus.svg"></button>
</div>
<div class="total-price" id=${"total-price"+index}>
${product.price}
</div>
</div>
`;


let plusbtn=element.querySelector(`.plus-btn`);
let minusbtn=element.querySelector(`.minus-btn`);
let like =element.querySelector(`.like-btn`);
let del =element.querySelector(`.delete-btn`);

//gestion de button like 

like.addEventListener("click",()=>{
    
    like.classList.toggle("is-active");
});

//gestion button remouve
del.addEventListener("click",()=>{
    element.remove(); 
    updateTotal()   
});

//activation de la decrementation via un click (incrimentation de quantité + mise a jour montant ligne + mise a jour total order  )
minusbtn.addEventListener("click",()=>{
    decrement_quantity(product);
    updateTotal();
    
})

//activation de l'incrementation via un click (incrimentation de quantité + mise a jour montant ligne + mise a jour total order  )
plusbtn.addEventListener("click",()=>{
    increment_quantity(product);
    updateTotal();
})

cartItemsEl.appendChild(element);
});

}



renderProdcuts();

//calcul et recalcul de total order

function updateTotal(){
    const productsEl = document.querySelectorAll(".item");
    let totalPrice=0;
    productsEl.forEach((item) => {
    let priceligne=parseInt(item.querySelector("#total-price"+item.id).innerHTML);
      totalPrice += priceligne;
      
    });
    document.getElementsByClassName('cart-total-price')[0].innerText =  totalPrice + ' Dh';
}

