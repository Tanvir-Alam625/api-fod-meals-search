const container = document.getElementById('search-result');
// click function 
const searchMeals = ()=>{
    const field = document.getElementById('search-field')
    const fieldValue = field.value;
    field.value = "";
    const apiUrl = `https://themealdb.com/api/json/v1/1/search.php?s=${fieldValue}`;
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => getMeals(data.meals))
}
const getMeals= meals =>{
    // console.log(meals);
    container.innerHTML = "";
    meals.forEach(meal => {
        const div = document.createElement('div');
        div.classList.add('col');
        const des = meal.strInstructions;
        const desConvert= des.slice(0, 100);
        div.innerHTML = `
        <div class="card shadow border">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">${desConvert}</p>
                    <button type="button" class="btn btn-outline-primary">See More</button>
            </div>
        </div>
        `
        container.appendChild(div);
    });
    console.log(meals);
}