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
  let passcheck = document.getElementById("passcheck").value;
  let loggedin = false;
  // I talked about this previously in the login page as well. but I was originally going to apply a true or false
  // to the the variable loggedin to see if the user was logged in but it was easier to make an object for the user who is logged in.
  // Thank you again Mr. Henriquez! At this point it was getting too complicated to navigate.

  // Below is some validation to make sure the user does not already exist and that the passwords match.
  if (users.some((user) => user.email === email)) {
    alert("User Already exists!");
    return;
  }

  if (password != passcheck) {
    alert("Passwords do not match!");
    return;
  }
  users.push({
    email,
    password,
    name,
  });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Account created!");
  setTimeout(function () {
    window.location.href = "index.html";
  }, 1000);
  //   Sends the user to local storage.
  // The timeout is because I have a weird obsession with a delay in between pages so it feels more real.
  // I won't have to actually do this when I am using servers instead of local storage as there will naturally be a delay.
}
