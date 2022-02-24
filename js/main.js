const container = document.getElementById('search-result');
const foodDetails = document.getElementById('items-details');

// click function 
const searchMeals = async ()=>{
    const field = document.getElementById('search-field')
    const fieldValue = field.value;
    const error  = document.getElementById('error-message');
    if(field.value ==""){
        error.innerText = "Please Enter your Food items";
    }else{
    field.value = "";
    error.innerText ="";
    const apiUrl = `https://themealdb.com/api/json/v1/1/search.php?s=${fieldValue}`;
    const res = await fetch(apiUrl);
    const data = await res.json();
    getMeals(data.meals);
    }
}
const getMeals= meals =>{
    // console.log(meals);
    container.innerHTML = "";
    foodDetails.innerHTML = "";
    const empty = document.getElementById('empty');
    console.log(empty);
    console.log(meals);

    // if(meals.length == null){
    //     empty.innerText = "Your Food Is not Available!";
    // }
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
                        <div class= "row  row-cols-md-2 g-2">
                        <a href="${meal.strSource}" target ="_blank">
                            <button type="button" class="btn btn-outline-primary">Order Now</button>
                        </a>
                        <button onclick="details(${meal.idMeal})" type="button" class="btn btn-outline-primary">See Details</button>
                        </div>
    
                </div>
            </div>
            `;
            container.appendChild(div);
        });
    
}
// get food details function 
const details= async (meals)=>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meals}`;
    const res = await fetch(url);
    const data = await res.json();
    getDetails(data.meals[0]);
}
const getDetails = (detail)=>{
    const detailDiv = document.createElement('div');
    detailDiv.classList.add('card');
    const des = detail.strInstructions;
        const desConvert= des.slice(0, 200);
    detailDiv.innerHTML = `
                <img src="${detail.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${detail.strMeal}</h5>
                  <p class="card-text">${desConvert}</p>
                  <a href="${detail.strSource}" target ="_blank">
                        <button type="button" class="btn btn-outline-primary">Order Now</button>
                    </a>
                </div>
    `;
    foodDetails.appendChild(detailDiv);
    container.innerHTML = ''
    console.log(detail);
}