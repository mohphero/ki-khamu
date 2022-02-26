const displayLoader = () => {
    const loader = document.getElementById('loader');
    loader.style.display = "block"
}

const hideLoader = () => {
    const loader = document.getElementById('loader');
    loader.style.display = "none"
}


const  searchMealDB = async()=>{
    const searchField = document.getElementById('search-field');
    const searchMealText = searchField.value;
    console.log(searchMealText);
    const mealCard = document.getElementById('meal-card');
    mealCard.textContent = "";
    displayLoader();
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchMealText}`

    const res = await fetch(url);
    const data = await res.json();
    hideLoader();
    mealDataShow(data.meals);

}


const mealDataShow = (mealDataItems) =>{
    console.log(mealDataItems)
    const mealCard = document.getElementById('meal-card');
    mealDataItems.forEach(meal => {
        console.log(meal.idMeal);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
                        <div class='card' onclick='mealSingleDetails(${meal.idMeal})' data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                        <div class="card-body">
                        <h5 class="card-title">${meal.strMeal.slice(0,18)}...</h5>
                        </div>
                        <div class="card-body">
                        <a role="button" class="text-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">See Details</a>
                        </div>
                        </div>
                        `
        mealCard.appendChild(div);
    });
   

}


const mealSingleDetails = async (singleMeal) =>{
    console.log(singleMeal)
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${singleMeal}`
    const res = await fetch(url);
    const singleData = await res.json();
    mealSingleDetailsModal(singleData.meals[0]);
}

const mealSingleDetailsModal = (singleMealDetails) =>{
    console.log(singleMealDetails)
    const modalTitle = document.getElementById('modal-title');
    modalTitle.innerText = `${singleMealDetails.strMeal}`

    const modalBody = document.getElementById('modal-body');

    modalBody.innerHTML = `
                            <div class="container-fluid">
                                <div class="row">
                                <div class="col-xl-5">
                                    <div class="image-area">
                                    <img src="${singleMealDetails.strMealThumb}" />
                                    </div>
                                </div>
                                <div class="col-xl-7 ms-auto">
                                    <div class="">
                                        ${singleMealDetails.strInstructions}
                                    </div>
                                </div>
                                </div>
                            </div>
                          `

}