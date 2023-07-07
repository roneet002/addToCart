//https://dummyjson.com/products

const mainTag = document.querySelector('main')
const qty = document.getElementById('qty');
const cartItem = document.getElementById('cartItem');
const productCount = document.getElementById('productCount');
const totalProductPrice = document.getElementById('totalProductPrice');
const off = document.getElementById('off');
const totalProduct = document.getElementById('totalProduct');
const CartContainer = document.getElementById('CartContainer');
const CartPageContainer = document.getElementById('CartPageContainer');
const UlTag = document.createElement('ul');
UlTag.className='cartPricing'
const checktOutBtn = document.createElement('a');
checktOutBtn.textContent = 'Proceed to Checkout';
checktOutBtn.className='primaryBtn';
checktOutBtn.setAttribute("href", "javascript:void(0)");
checktOutBtn.setAttribute("id", "checkoutBtn");
const price = document.createElement('p');
const priceVale = document.createElement('span');
price.className='cartPrice';
price.textContent = 'Total Price ';
price.appendChild(priceVale)


let findProduct = [];


async function FetchData() {
  const response = await fetch("https://dummyjson.com/products");
  let data = await response.json();

  try {
    const createUl = document.createElement("ul");
    createUl.className = "productList";
    mainTag.append(createUl);

    if (!response.ok) {
      return new error("something went wrong");
    }

    for (let product of data.products) {
      const createLiTag = document.createElement("li");
      createLiTag.id = product.id;
      createLiTag.innerHTML += `<div id="${product.id}">
                                 <div class="img"><img src="${product.thumbnail}" /></div>
                                 <div class="btData">
                                  <p class="title">${product.title}</p>  
                                  <p class="rating">${product.rating}</p>   
                                  <p class="description">${product.description}</p>   
                                  <p class="price">&#8377; <strong>${product.price}</strong> <del>&#8377;  ${product.discountPercentage}</del></p>
                                  </div>
                                  <button class="primaryBtn" onClick="addToCart(${product.id})">Add to Cart</button>
                                  </div>`;
      createUl.appendChild(createLiTag);
    }
  } catch (error) {
    console.log(error.message);
  }
}


function productFiltered(product){
  let productItem = document.querySelectorAll('.productList li');
  let nArray = [...productItem]
  
  let newFilterPrd = nArray.find((prd)=>{
        return product == prd.id
      })

     return findProduct.push(newFilterPrd)
      
}


let liTag='';
function updatedCartEle(){
  for(let product of findProduct){
      liTag = document.createElement('li');
      liTag.innerHTML = product.innerHTML;     
      qty.textContent = findProduct.length;
  }
  UlTag.appendChild(liTag)
  emptyCart.style.display='none'
  CartContainer.append(UlTag);
  CartContainer.appendChild(checktOutBtn);
  CartContainer.appendChild(price);
}


function addToCart(e) {

  productFiltered(e)

  updatedCartEle()



        // let newAr = [newFilterPrd, ...findProduct]

    // let newfilteredProduct = nArray.filter((prd)=>{

    //   return e == prd.id
    // })

// findProduct.push(newfilteredProduct)


  

//  for(let i of productItem){
//     if(i.id == e){
//       let newPrd = findProduct.filter((prd)=>{
//         return prd.id != i.id
        
//       })
//       findProduct.push(i)
      
//       console.log(findProduct)
//     }
// }


let findPriceValue = document.querySelectorAll('#CartContainer .cartPricing .price strong');
let totalPrice = document.querySelector('#CartContainer .cartPrice span');
let calculatedPrice = 0;
for(let productPrice of findPriceValue){
  calculatedPrice += parseInt(productPrice.textContent)
}
totalPrice.textContent = calculatedPrice




 const cartElementUl = document.querySelectorAll('#CartContainer ul li')
 let liInner= [] 
  for(let j = 0; j < cartElementUl.length; j++){ 
  let title = cartElementUl[j].querySelector('.title').textContent;
  let itemPrice = cartElementUl[j].querySelector('.price strong').textContent;
  let description = cartElementUl[j].querySelector('.description').textContent;
  let rating = cartElementUl[j].querySelector('.rating').textContent;

  let img = cartElementUl[j].querySelector('.img').innerHTML;
  
  let newObj = {
      id:Math.floor(Math.random() * 100),
      title,
      calculatedPrice,
      description,
      rating,
      img, 
      itemPrice,

    }
    liInner.push(newObj)
 }
 localStorage.setItem('Products', JSON.stringify(liInner));
}






function checkOutBtnHandler(){
  location.href = 'cart.html';
}
if(window.location.pathname == '/eCommerce/cart.html'){
console.log('cart page reload')
displayItems();
}




function displayItems() {
 
  let x = JSON.parse(localStorage.getItem('Products'));
  let UlElement = document.createElement('ul');
  UlElement.className='CartContainer'
  cartItem.textContent = x.length;
  productCount.textContent = x.length;
  qty.textContent = x.length;
  totalProductPrice.textContent = x[0].calculatedPrice;
  off.textContent= Math.trunc(x[0].calculatedPrice / 10)
  totalProduct.textContent =  totalProductPrice.textContent - off.textContent
 

 
  for (let i = 0; i < x.length; i++) {
    let liElement = document.createElement('li');
    liElement.className = 'listingRow';
    let liEle = `<div class="ListingContainer" id="${x[i].id}">
    <div class="img">${x[i].img}</div>
    <div class="rightContent">
    <p class="title">${x[i].title}</p>
    <p class="description">${x[i].description}</p>
    <p class="rating">${x[i].rating}</p>
    <p class="price">${x[i].itemPrice}</p>
    </div>
    </div>`
    liElement.innerHTML += liEle;
    UlElement.appendChild(liElement)

    CartContainer.innerHTML += liEle 
    
    emptyCart.style.display='none'
    CartPageContainer.appendChild(UlElement);

  }
  

}




FetchData();
checktOutBtn.addEventListener('click', checkOutBtnHandler)

