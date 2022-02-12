var dishesArray = []
searchResultEl = $("#search-result")

function printRecipeOnPage (retrievedRecipe) {
    
    var dishName = $("#name")
    var name = retrievedRecipe.meals[0].strMeal
    dishName.html(`<h1> ${name} </h1>`)
    
    var dishCategory = $("#foodtype")
    var dishType = retrievedRecipe.meals[0].strCategory
    dishCategory.html(`<p>${dishType}</p`)

    var dishInstructions = $("#instructions")
    var instructions = retrievedRecipe.meals[0].strInstructions
    dishInstructions.html(`<h1> ${instructions} </h1>`)
}

function searchItems (searchTerm) {
    var requestUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchTerm

    fetch(requestUrl)
    .then(function (res) {
        return res.json();  
     })
     .then(function (retrievedRecipe) {
        dishesArray = retrievedRecipe.meals 
        console.log(dishesArray)
        if (dishesArray === null) {
            const errorMessage = $("<p>").text("Your desired meal was not found, try something else")
            searchResultEl.append(errorMessage)
        } else {
            
            printRecipeOnPage(retrievedRecipe)
            debugger
        }
    });
}



//function to randomise the recipes
function randomRecipe() {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(function (res) {
        return res.json();
    })
    .then(function (recipes){
        printRecipeOnPage(recipes);
    });
}



// event listener for clickng on the button and sumbitting the form 
$('#search-button-random').on('click', randomRecipe);
$("#search-button").on("click", function() {
    var searchTerm = $("#search-input").val()
    searchItems(searchTerm)

})
$("recipe-form").on("submit", function(event) {
    event.preventDefault();
    var searchTerm = $("#search-input").val().
    searchItems(searchTerm)
})
