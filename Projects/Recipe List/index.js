function showRecipes(){
    let recipelist = JSON.parse(localStorage.getItem("recipes") || "[]");
    let recipetable = document.getElementById("displayrecipes");
        
    if (recipelist.length === 0){
        recipetable.innerHTML = `<tr><td colspan="5">You have no recipes yet!</td></tr>`
        return
    }
    recipelist.forEach((recipe, index) => {
        recipetable.innerHTML += `
        <tr>
            <td scope="col">${recipe.name}</td>
            <td scope="col">${recipe.instructions}</td>
            <td scope="col">${recipe.cooktime}</td>
            <td scope="col"><img src="${recipe.img}" height="100" width="100"></td>
            <td scope="col"><i class="bi bi-pencil-square" onclick="editRecipe(${index})" style="cursor: pointer"></i> <i class="bi bi-trash" onclick="deleteRecipe(${index})" style="cursor: pointer"></i></td>
            
        </tr>
        
        `
    });


}

function addRecipe(e){
    e.preventDefault();
    console.log("ADD RECIPE");
    let form = document.querySelector("#formrecipe");
    if (!form.checkValidity()){
        form.classList.add("was-validated");
        form.reportValidity();
        return;
    }
   

    let recipelist = JSON.parse(localStorage.getItem("recipes") || "[]");
    let recipe = {};
    let recipename = document.getElementById("name").value;
    if (recipelist.some((recipe) => recipe.name === recipename)){
        alert("Recipe already exists! Would you like to override?");
        if (!confirm("Would you like to override?")){
            return;
        } else {
           let thisrecipe = recipelist.find((recipe) => recipe.name === recipename).index
           recipelist.splice(thisrecipe, 1);
           recipe.name = document.getElementById("name").value;
           recipe.cooktime = document.getElementById("cooktime").value;
           recipe.instructions = document.getElementById("recipinstruct").value;
           recipe.img = document.getElementById("recipeimg").src;
           
           recipelist.push(recipe);
           localStorage.setItem("recipes", JSON.stringify(recipelist));
           document.getElementById("displayrecipes").innerHTML = "";
           showRecipes();
           return;
        }
        
    }
    recipe.name = document.getElementById("name").value;
    recipe.cooktime = document.getElementById("cooktime").value;
    recipe.instructions = document.getElementById("recipinstruct").value;
    recipe.img = document.getElementById("recipeimg").src;
   
    recipelist.push(recipe);
    localStorage.setItem("recipes", JSON.stringify(recipelist));
    document.getElementById("displayrecipes").innerHTML = "";
    showRecipes();
}
function previewImage(){
    console.log("PREVIEW IMAGE");
    
    let recipedisplay = document.getElementById("recipeimg");
    let imginput = document.getElementById("imginput");
    
    let filereader = new FileReader();
    filereader.readAsDataURL(imginput.files[0]);
    filereader.onload = function(){
        recipedisplay.src = filereader.result;
    }
}

function deleteRecipe(index){
    let recipelist = JSON.parse(localStorage.getItem("recipes") || "[]");
    recipelist.splice(index, 1);
    localStorage.setItem("recipes", JSON.stringify(recipelist));
    showRecipes();
}

function editRecipe(index){
    let recipelist = JSON.parse(localStorage.getItem("recipes") || "[]");
    let recipe = recipelist[index];
    document.getElementById("name").value = recipe.name;
    document.getElementById("cooktime").value = recipe.cooktime;
    document.getElementById("recipinstruct").value = recipe.instructions;
    document.getElementById("recipeimg").src = recipe.img;
    document.getElementById("imginput").file = recipe.img;
        
}

onload = function (){
    showRecipes();
}