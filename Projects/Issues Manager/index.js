// This is my login page!

// Submit log is obviously a function that submits the form and compares the user and password to the users array in local storage,
// if user exists and password matches it will log the user in and redirect them to the tasks page. Otherwise it will alert the user
// that the user or password is incorrect. It will then redirect to the tasks page as well as ad the user to the object loggedin in
// local storage. This object will be accessed on load on the register screen.
function submitLog(e) {
    e.preventDefault();
    let form = document.querySelector("#form");
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      form.reportValidity();
      return;
    }
    let userinp = document.getElementById("username").value.trim();
    let passwordinp = document.getElementById("pass").value.trim();
    let users = JSON.parse(localStorage.getItem("users")) || [];
    console.log(users);
  
    if (
      !users.some((user) => user.uname === userinp) ||
      users.find((user) => user.uname === userinp).password !== passwordinp
    ) {
      alert("User does not exist or Incorrect Password!");
      return;
    }
  
    alert("Logged in!");
    let user = users.find((user) => user.uname === userinp);
  
    localStorage.setItem("loggedin", JSON.stringify(user));
    window.location.href = "issues.html";
  }
  
  // Redirects user to the register page.
  function regPage() {
    window.location.href = "register.html";
  }
  
  