onload = function () {
    let user = JSON.parse(localStorage.getItem("loggedin") || "[]");
    document.getElementById("fullname").innerHTML = user.name;
    console.log(user);
    displayIssues();
}
 function displayIssues() {
     let user = JSON.parse(localStorage.getItem("loggedin") || "[]");
     let issues = JSON.parse(localStorage.getItem(user.uname) || "[]");
     console.log (issues);
     let tableissues = document.getElementById("tableissues");
    tableissues.innerHTML = "";
     issues.forEach((issue, index) => {
        //  tableissues.innerHTML += `<tr><td>${let desc}</td><td>${issue.sev}</td><td>${issue.assignee}</td><td>${issue.status} ? Open <i class="bi bi-envelope-open"></i>: Closed <i class="bi bi-door-closed-fill"></i></td> </tr>`

     })
     console.log("Display Issues:")
     console.log(issues);
 }

 
function addIssue(e) {
    
    let form = document.querySelector("#form");
    e.preventDefault();

    if (!form.validity){
        form.classList.add("was-validated");
        form.reportValidity();
        return;
    }
    console.log("add issue");
    let user = JSON.parse(localStorage.getItem("loggedin") || "[]");
    let issues = JSON.parse(localStorage.getItem(user.uname) || "[]");
    
    let desc = document.getElementById("title").value;
    let sev = document.getElementsByName("sev").value;
    let assignee = document.getElementById("assignto").value;
    let status = true;
    let issue = {
        desc,
        sev,
        assignee,
        status
    };
    issues.push(issue);
    localStorage.setItem(user.uname, JSON.stringify(issues));
    displayIssues();
}
