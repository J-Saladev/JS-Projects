function displayUsers(){
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    let display = document.getElementById("displayusers");
    if (users.length === 0){
        display.innerHTML = `<td colspan="6">No Users</td>`;
        return;
    }
    
    users.forEach((user, index) => {
        let weightdata = JSON.parse(localStorage.getItem(`${user.email}`) || "[]");
        display.innerHTML += `
        <tr>
          <td>${user.firstname}</td>
          <td>${user.lastname}</td>
          <td>${user.gender}</td>
          <td>${user.email}</td>
          <td>
            <a class="btn btn-sm border rounded border-success" data-bs-toggle="collapse" href="#${user.email}${index}" role="button" aria-expanded="false" aria-controls="collapseExample">
            Weight Info
          </a>
          <div class="collapse" id="${user.email}${index}">
            <div class="card card-body" id = "weightdata${index}">
              
            </div>
          </div>
        
            </td>
          <td><i class="bi bi-trash" onclick="deleteUser(${index})" style="cursor: pointer"></i></td>
        </tr>
        `
        let currentuser = index
        weightdata.forEach((weight, index) => {
            document.getElementById(`weightdata${currentuser}`).innerHTML += `Weight: ${weight.weight}, Date: ${weight.date}<br>`;
            
        })
    });
}

function deleteUser(i){
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    let weightdata = JSON.parse(localStorage.getItem(`${users[i].email}`));
    weightdata = [];
    localStorage.setItem(`${users[i].email}`, JSON.stringify(weightdata));
    users.splice(i, 1);
    localStorage.setItem("users", JSON.stringify(users));
    
    
    displayUsers();
}
onload = displayUsers();