let searchMeal = document.getElementById("input");

function fetchMeal() {
  if (searchMeal.value) {
    let URL = `https://themealdb.com/api/json/v1/1/search.php?s=${searchMeal.value}`;
    fetch(URL)
      .then((res) => res.json())
      .then((meals) => showMeal(meals.meals));
    document.getElementById("no__meal").style.display = "none";
    document.querySelector(".meals").innerHTML = "";
  } else {
    alert("Please search for a food first! :) ");
    document.getElementById("no__meal").style.display = "block";
  }
}

function showMeal(meals) {
  for (let meal of meals) {
    document.querySelector(
      ".meals"
    ).innerHTML += `<div class="meal__wrapper bg-orange-100 rounded-md p-3 w-[325px]" id="meal__wrapper">
    <img
      src=${meal.strMealThumb}
      alt=${meal.strMeal}
      class="rounded-md"
    />
    <h3 class="text-[18px] font-semibold text-black mt-1 mb-1">
      ${meal.strMeal}
    </h3>
    <p class="text-[12px] text-black mb-2">
      ${meal.strInstructions.slice(0, 145)}...
    </p>
    <p class="mb-3 text-sm text-gray-900"><span>${meal.strArea}</span> <span>${
      meal.strCategory
    }</span></p>
    <div class="flex items-center gap-3">
    <a href=${meal.strYoutube} target="_blank" class="button">Watch</a>
     <button class="text-sm" onclick="lookUpDetails('${
       meal.idMeal
     }')">View Recipe</button>
    </div>
</div>`;
  }
}

function lookUpDetails(id) {
  let URL = `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  fetch(URL)
    .then((res) => res.json())
    .then((data) => showMealDetails(data.meals[0]));
}

function showMealDetails(meal) {
  console.log(meal);
  let details = document.getElementById("details");
  details.classList.add("visible");
  details.classList.remove("invisible");

  details.innerHTML = `
  <div class="bg-white p-8 rounded shadow-lg w-[75%] min-h-[675px]">
  <h2 class="text-xl font-bold mb-4">${meal.strMeal}</h2>
  <p class="text-gray-700 mb-6">${meal.strInstructions}</p>
  <a href=${meal.strYoutube} target="_blank"
    id="closeModal"
    class="bg-orange-400 hover:bg-black text-white font-bold py-2 px-4 rounded"
  >
    Watch Recipe
  </a>
  <a class="bg-black hover:bg-orange-500 text-white font-bold py-2 px-4 rounded ml-3 cursor-pointer" onclick="closeDetails()">Close</a>
</div>
  `;
}

function closeDetails() {
  details.classList.add("invisible");
  details.classList.remove("visible");
}

let search = document.getElementById("search");
search.addEventListener("click", () => {
  fetchMeal();
});
