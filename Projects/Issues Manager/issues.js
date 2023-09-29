onload = function () {
    let user = JSON.parse(localStorage.getItem("loggedin") || "[]");
    document.getElementById("fullname").innerHTML = user.name;

    displayIssues();
}

 function displayIssues() {
     let user = JSON.parse(localStorage.getItem("loggedin") || "[]");
     let issues = JSON.parse(localStorage.getItem(user.uname) || "[]");

     let displaycards = document.getElementById("displaycards");
    displaycards.innerHTML = "";
     issues.forEach((issue, index) => {
        
        switch (issue.sev) {
            case "Low":
                cardwidth = "14rem"
                colorcard = "border-success"
                

                break;
            case "Medium":
                cardwidth = "18rem"
                colorcard = "border-warning"
                
                break;
            case "High":
                cardwidth = "22rem"
                
                colorcard = "border-danger"
                break;
            default:
                break;
        }

        displaycards.innerHTML += `<div class="card ${colorcard} m-2" style="width: ${cardwidth};">
        <div class="card-body">
          <h5 class="card-title text-capitalize">${issue.desc} ${issue.status ? '<i class="bi bi-envelope-open"></i>' : '<i class="bi bi-envelope-check-fill"></i>'}  </h5>
          <h6 class="card-subtitle mb-2 text-muted">Assigned to ${issue.assignee}</h6>
          <p class="card-text">${(issue.moredesc)}</p>
          <button class="btn btn-primary mt-3"  onclick="changeTicket (${index})">${issue.status ? 'Close' : 'Open'}</button>
          <button class="btn btn-danger mt-3" onclick = "deleteTicket(${index})">Delete</button><br>
          <small>${issue.date}</small>
  
        </div>
      </div>`;
     })
     
 }

 
function addIssue(e) {
    
    let form = document.querySelector("#formissue");
    e.preventDefault();
  
    if (!form.checkValidity()){
        form.classList.add("was-validated");
        form.reportValidity();
        return;
    }
   
    let user = JSON.parse(localStorage.getItem("loggedin") || "[]");
    let issues = JSON.parse(localStorage.getItem(user.uname) || "[]");
    
    let desc = document.getElementById("desc").value;
    let sev = document.getElementById("sev").value;
    let assignee = document.getElementById("assignto").value;
    let moredesc = document.getElementById("moredesc").value;
    let status = true;
    let date = new Date();
    let issue = {
        desc,
        sev,
        assignee,
        moredesc,
        status,
        date
    };
    
    issues.push(issue);
    localStorage.setItem(user.uname, JSON.stringify(issues));
    displayIssues();
}

function changeTicket (i){
    let user = JSON.parse(localStorage.getItem("loggedin") || "[]");
    let issues = JSON.parse(localStorage.getItem(user.uname) || "[]");
    issues[i].status = !issues[i].status;
   
    localStorage.setItem(user.uname, JSON.stringify(issues));
    displayIssues();
}
function deleteTicket (i){
let user = JSON.parse(localStorage.getItem("loggedin") || "[]");
let issues = JSON.parse(localStorage.getItem(user.uname) || "[]");
issues.splice(i, 1);
localStorage.setItem(user.uname, JSON.stringify(issues));
displayIssues();
}