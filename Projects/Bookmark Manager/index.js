// This is my login page!

// Submit log is obviously a function that submits the form and compares the email and password to the users array in local storage,
// if user exists and password matches it will log the user in and redirect them to the tasks page. Otherwise it will alert the user
// that the email or password is incorrect. It will then redirect to the tasks page as well as ad the user to the object loggedin in
// local storage. This object will be accessed on load on the register screen.
function submitLog(e) {
  e.preventDefault();
  let form = document.querySelector("#form");
  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    form.reportValidity();
    return;
  }
  let emailinp = document.getElementById("email").value.trim();
  let passwordinp = document.getElementById("pass").value.trim();
  let users = JSON.parse(localStorage.getItem("users")) || [];
  console.log(users);

  if (
    !users.some((user) => user.email === emailinp) ||
    users.find((user) => user.email === emailinp).password !== passwordinp
  ) {
    alert("User does not exist or Incorrect Password!");
    return;
  }

  alert("Logged in!");
  let user = users.find((user) => user.email === emailinp);

  localStorage.setItem("loggedin", JSON.stringify(user));
  window.location.href = "bookmark.html";
}

// Redirects user to the register page.
function regPage() {
  window.location.href = "register.html";
}

// A little function that will redirect the user to the tasks page if they are logged in already, or forgot to logout.
// It worked earlier on but I was having difficulties with it  making sure it didn't cause an infinite loop. So now it
// doesn't seem to work but I am leaving it in just in case.

// Originally logged in was gonna be an object that would also hold the tasks. But I ran into an issue where it ended
// up getting hard to reference variables and it was all getting complicated fast.

onload = function () {
  let user = JSON.parse(localStorage.getItem("loggedin") || "[]");
  if (!user.length === 0) {
    alert("Already Logged in, Logout first if you want to log in again!");
    window.location.href = "tasks.html";
    return;
  }
};
