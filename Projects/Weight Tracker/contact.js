function displayContact() {
    let user = JSON.parse(localStorage.getItem("currentuser") || "{}");
    if (user.email === "") {
        return;
    }
    document.getElementById("fullname").value = user.name;
    document.getElementById("email").value = user.email;
    user = {};

}

function submitContact(e){
    e.preventDefault();
    let form = document.querySelector("#contactform");
    if (!form.checkValidity()){
        form.classList.add("was-validated");
        form.reportValidity();
        return;
    }
    alert("Submitted!");
}