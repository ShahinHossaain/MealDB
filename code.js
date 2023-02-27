const loadData = async(food) => {
    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`);
        const data = await res.json();
        document.getElementById('food-container').innerHTML = '';
        setData(data.meals);
        // console.log(data.meals);
    }
    catch(err){
        console.log(err);
    }

}
loadData('fish');
const setData = meals => {
    // console.log(meals);
    const foodContainer = document.getElementById('food-container');
    // console.log(foodContainer);
    let c = 0;
    meals.forEach(meal => {
        // console.log(meal);
        const div = document.createElement('div');
        div.classList.add('card', 'card-side', 'bg-base-100', 'shadow-xl', 'bg-slate-400', 'mt-5', 'md:mt-0')
        if(++c > 6){
            div.classList.add('hidden');
            document.getElementById('show-all-btn').classList.remove('hidden')
        }
        else{
            document.getElementById('show-all-btn').classList.add('hidden')
        }
        div.innerHTML = `
            <figure class="w-2/3"><img class="h-full" src="${meal.strMealThumb}" alt="Movie"/></figure>
            <div class="card-body">
                <h2 class="card-title">${meal.strMeal}</h2>
                <p>There are many variations of passages of available, but the majority have suffered</p>
                <div class="card-actions justify-end">
                    <label for="my-modal-3" class="btn" onclick="openModal(${meal.idMeal})">open modal</label>
                </div>
            </div>
    `
    foodContainer.appendChild(div);
    });

}
const openModal = async(id) => {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await res.json();
    setDetails(data);
}
const setDetails = data => {
    console.log(data.meals[0]);
    const foodName = document.getElementById('food-name');
    const foodImg = document.getElementById('food-img');
    const category = document.getElementById('category');
    const area = document.getElementById('area');
    const instruction = document.getElementById('instruction');
    const youtube = document.getElementById('youtube');

    console.log(foodImg);
    foodName.innerText = `${data.meals[0].strMeal}`
    foodImg.src = `${data.meals[0].strMealThumb}`;
    category.innerHTML = `<span class="font-semibold">Category</span> : ${data.meals[0].strCategory}`;
    area.innerHTML = `<span class="font-semibold">Area</span> : ${data.meals[0].strArea}`;
    instruction.innerHTML = `<span class="font-semibold">Instruction</span> : ${data.meals[0].strInstructions}`;
    youtube.innerHTML = `<span class="font-semibold">Youtube</span> : <a href="${data.meals[0].strYoutube}">${data.meals[0].strYoutube}</a>`;

}

const searchBtn = () => {
    // console.log('Searching');
    const search = document.getElementById('default-search');
    loadData(search.value);
    search.value = '';
}

const showDiv = () => {
    // console.log('Showing');
    const foodContainer = document.getElementById('food-container');
    const allChild  = foodContainer.childNodes;
    allChild.forEach(child =>{
        if(child.classList.contains('hidden')) child.classList.remove('hidden');
    })
    document.getElementById('show-all-btn').classList.add('hidden')
}