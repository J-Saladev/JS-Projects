onload = function () {
    headerDisplay();
}

  
  function showSidebar() {
    let sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("openbar");
    sidebar.classList.toggle("closebar");
  
  }

  function headerDisplay(){
    console.log("Guest User");
      let loginbutton = document.querySelector("#logInbutton");
      let addProduct = document.querySelector("#addProductbutton");
      let listProduct = document.querySelector("#listProductbutton");
      let logout = document.querySelector("#logOutbutton");
    if (localStorage.getItem("loggedin")){
      loginbutton.hidden = true;
      addProduct.hidden = false;
      listProduct.hidden = false;
      logout.hidden = false;
    } else
    {
      loginbutton.hidden = false;
      addProduct.hidden = true;
      listProduct.hidden = true;
      logout.hidden = true;
    }
  }
  

   function logIn(){
      let loginmodal = document.getElementById("loginModal");
      loginmodal.hidden = false;
  
   }
    
  function loguser(e){
    e.preventDefault();
    let form = document.querySelector("#loginForm");
    if (!form.checkValidity()){
      form.classList.add("was-validated");
      form.reportValidity();
      return;
    }
    let username = document.getElementById("loginusername").value;
    let password = document.getElementById("loginpassword").value;
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find((user) => user.username === username);
    if (!user){
      alert("Invalid username or password, click register to make an account");
      return;
  }
  if (users.some((user) => user.username === username && user.password === password)){
    localStorage.setItem("loggedin", JSON.stringify(user));
    alert("Logged in");
    window.location.href = "index.html";
  }
  }
  function registerUser(){
    let form = document.querySelector("#registerForm");
    if (!form.checkValidity()){
      form.classList.add("was-validated");
      form.reportValidity();
      return;
    }
    let username = document.getElementById("registerusername").value;
    let password = document.getElementById("registerpassword").value;
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = {
      username,
      password,
    };
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    console.log(users);
    alert("Account created");
    window.location.href = "index.html";
  }
  function logOut(){
    localStorage.removeItem("loggedin");
    window.location.href = "index.html";
  }