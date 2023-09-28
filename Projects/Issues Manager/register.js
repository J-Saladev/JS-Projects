// This page is one of the easier functions I made, just sets variables to the input and then pushes these into the user array
// and saves on local storage to be accessed later.
function registerAcc(e) {
    e.preventDefault();
    let form = document.querySelector("#form");
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      form.reportValidity();
      console.log("invalid");
      return;
    }
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let name = document.getElementById("name").value;
    let uname = document.getElementById("username").value;
 
    // Below is some validation to make sure the user does not already exist and that the passwords match.
    if (users.some((user) => user.email === email)) {
      alert("User Already exists!");
      return;
    }
  
 
    users.push({
      uname,
      email,
      password,
      name,
    });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Account created!");
    window.location.href = "index.html";
   
    //   Sends the user to local storage.

  }
  