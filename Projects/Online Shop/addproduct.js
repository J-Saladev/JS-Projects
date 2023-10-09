function addProduct(e) {
    e.preventDefault();
    let form = document.querySelector("#addproductform");
    if (!form.checkValidity()) {
        form.classList.add("was-validated");
        form.reportValidity();
        return;
    }
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let imgfile = document.getElementById("productimage").files[0];
    if (imgfile) {
        let reader = new FileReader();
        reader.readAsDataURL(imgfile);
        reader.onload = function (e) {
            let product = {
                name: document.getElementById("productname").value,
                price: document.getElementById("productprice").value,
                image: e.target.result,
                description: document.getElementById("productdescription").value,
            };
            products.push(product);
            localStorage.setItem("products", JSON.stringify(products));
    }
    }
    alert("Product added");
    form.reset();
}