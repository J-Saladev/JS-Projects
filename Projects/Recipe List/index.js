function showRecipes(){
    let recipelist = JSON.parse(localStorage.getItem("recipes") || "[]");
    let recipetable = document.getElementById("displayrecipes");
    if (recipelist.array.length === 0){
        recipetable.innerHTML = `<tr><td colspan="4">You have no recipes yet!</td></tr>`
        return
    }
    recipelist.array.forEach(recipe => {
        recipetable.innerHTML += `
        <tr>
            <th scope="col">${recipe.name}</th>
            <th scope="col">${recipe.instructions}</th>
            <th scope="col">${recipe.cooktime}</th>
            <th scope="col"><img src="${recipe.img}" height="100" width="100"></th>
            
        </tr>
        
        `
    });
// ADD THE IMAGE TO BE SHOWN ^^^^^^^^^^^^^^^^^^


}

function addRecipe(){
    let recipelist = JSON.parse(localStorage.getItem("recipes") || "[]");
    let recipe = {};
    recipe.name = document.getElementById("name").value;
    recipe.cooktime = document.getElementById("cooktime").value;
    recipe.instructions = document.getElementById("instructions").value;
    // GET RECIPE IMAGE USING THE FILE THING AND SAVE AS A FILE ACCESS THING
    recipelist.push(recipe);
    localStorage.setItem("recipes", JSON.stringify(recipelist));
    showRecipes();
}