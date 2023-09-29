function displayBookmark(){
    let user = JSON.parse(localStorage.getItem("loggedin") || "[]");
    let bookmarks = JSON.parse(localStorage.getItem(user.email) || "[]");
    console.log(bookmarks);
    let bookmarksDiv = document.getElementById("bookmarksdisplay");
    bookmarksDiv.innerHTML = "";
    pagination.innerHTML = "";
    bookmarks.forEach((link, index) => {
        bookmarksDiv.innerHTML +=
        `
        <div class="page" hidden id="page${index}">
        <div class="container bg-light p-3 rounded border border-light mt-3">
        <div class="row">
            <div class="col-2"><h5>${link.name}</h5></div>
            <div class="col-2"></div>
            <div class="col-2 ">
                <a href="https://${link.url}" target="_blank" class="btn btn-info text-white">Visit</a>
            </div>
            <div class="col-2">
                <button class="btn btn-warning text-white" onclick="editBookmark(${index})">Edit</button></button>
            </div>
            <div class="col-2">
               <button class="btn btn-danger" onclick="deleteBookmark(${index})">Delete</button> 
            </div>

        </div>
        </div>
        </div>`
    console.log(link);
    let pagination = document.getElementById("pagination");
    
    pagination.innerHTML += `<li class="m-3"><h5 style="cursor: pointer;" onclick="pageShow(${index})">${index + 1} </h5></li>`;
    
        
    });


}

onload = function () {
    let user = JSON.parse(localStorage.getItem("loggedin") || "[]");
    document.getElementById("fullname").innerHTML = user.name;
    displayBookmark();
    let page0 = document.getElementById("page0");
    page0.hidden = false;
};

function editBookmark(index){
    let user = JSON.parse(localStorage.getItem("loggedin") || "[]");
    let bookmarks = JSON.parse(localStorage.getItem(user.email) || "[]");
    bookmarks[index].name = prompt("Edit name", bookmarks[index].name);
    bookmarks[index].url = prompt("Edit url", bookmarks[index].url);
    if (bookmarks.some((bookmark) => bookmark.name === name)){
        alert("Bookmark already exists!");
        return;
    }
    if (bookmarks.some((bookmark) => bookmark.url === url)){
        alert("Bookmark already exists!");
        return;
    }
    if (!bookmarks[index].name || !bookmarks[index].url){
        alert("Please fill in all fields!");
        return;
    }
    localStorage.setItem(user.email, JSON.stringify(bookmarks));
   displayBookmark();
}
function deleteBookmark(index){
    let user = JSON.parse(localStorage.getItem("loggedin") || "[]");
    let bookmarks = JSON.parse(localStorage.getItem(user.email) || "[]");
    bookmarks.splice(index, 1);
    localStorage.setItem(user.email, JSON.stringify(bookmarks));
    displayBookmark();
}

function addBookmark(e){
    e.preventDefault();
    let form = document.querySelector("#formbookmark");
    if (!form.checkValidity()){
        form.classList.add("was-validated");
        form.reportValidity();
        return;
    }
    let user = JSON.parse(localStorage.getItem("loggedin") || "[]");
    let bookmarks = JSON.parse(localStorage.getItem(user.email) || "[]");
    let name = document.getElementById("name").value;
    let url = document.getElementById("url").value;
    if (bookmarks.some((bookmark) => bookmark.name === name)){
        alert("Bookmark already exists!");
        return;
    } 
    
    let link = {name, url};
    bookmarks.push(link);
    localStorage.setItem(user.email, JSON.stringify(bookmarks));
    displayBookmark();
}
function pageShow(index){
    let pagination = document.getElementById("pagination");
    
   for (let i = 0; i < pagination.children.length; i++){
    let page = document.getElementById(`page${i}`);
       page.hidden = true;
   }
   let activepage = document.getElementById(`page${index}`);
   activepage.hidden = false;
    
    
}