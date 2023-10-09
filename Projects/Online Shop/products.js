function displayProduct (){
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let displayList = document.getElementById("productslist");
    displayList.innerHTML = "";
    products.forEach((product ) => {
        displayList.innerHTML +=`
        <li id="">
              <div
                class="rounded bg-white shadow-lg p-3 w-72 h-auto"
                style="background-color: var(--secondary)"
              >
                <img
                  src=${product.image}
                  class="w-72 h-48 rounded"
                />
                <p class="mt-3 text-2xl text-center font-bold">${product.name} </p>
                <p class="text-center mt-3 small">$${product.price}</p>
                <p class="text-center mt-3 small">${product.description}</p>
                
            </li>
           ` 
    })
};


onload = function () {
    displayProduct();
}