function submitRegister(e){
    e.preventDefault();
    let form = document.querySelector("#registerform");
    if (!form.checkValidity()){
        form.classList.add("was-validated");
        form.reportValidity();
        return;
    }
    let date = new Date();
    let month = date.getMonth();
    let day = date.getDate();
    let year = date.getFullYear();
    let fulldate = `${month}/${day}/${year}`;
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let induser = {};
    let email = document.getElementById("emailAddress").value;
    let firstname = document.getElementById("firstName").value; 
    let lastname = document.getElementById("lastName").value;
    
    let weight = document.getElementById("userweight").value
    let gender = document.getElementsByName("gender");
    let indweight = JSON.parse(localStorage.getItem(`${email}`)) || [];
    let dateweight = {
        'weight': weight,
        "date": fulldate
    }
    
    gender.forEach(gender => {
        if (gender.checked){
            induser.gender = gender.value;
        }
    })

    if (!users.some((user) => user.email === email)) {
        induser.email = email;
        induser.firstname = firstname;
        induser.lastname = lastname;
       
        users.push(induser);
        console.log(`Adding Weight`);
    }
    indweight.push(dateweight);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem(`${email}`, JSON.stringify(indweight));
    console.log(users);
    
    alert("Weight Registered!");
    window.location.href = "index.html";
}