// // const fetchCountries = async ()=> {
// //     const response = await fetch('/data.json', {
// //         method: 'GET'
// //     })
// //     console.log(response)
// //     const resData = await response.json()
// //     console.log({resData})
// //     return response
// // }

// // const res = fetchCountries()
// // console.log(res)

// fetch("data.json")
//   .then(response => response.json())
//   .then(data => {
//     console.log("Loaded JSON:", data); // Log to verify structure

//     // Ensure data is valid
//     if (Array.isArray(data) && data.length > 0) {
//       let firstCountry = data[0]; // Get first country
//       let flagUrl = firstCountry.flags?.png; // Get flag image
//       let name = firstCountry.name; // Get country name
//       let population = firstCountry.population.toLocaleString(); // Format population
//       let region = firstCountry.region; // Get region
//       let capital = firstCountry.capital; // Get capital

//       // Update the HTML content
//       document.getElementById("flagImage").src = flagUrl;
//       document.getElementById("countryName").textContent = name;
//       document.getElementById("countryPopulation").textContent = `Population: ${population}`;
//       document.getElementById("countryRegion").textContent = `Region: ${region}`;
//       document.getElementById("countryCapital").textContent = `Capital: ${capital}`;
//     } else {
//       console.error("JSON data is empty or not an array");
//     }
//   })
//   .catch(error => console.error("Error loading JSON:", error));

const parentContainer = document.getElementById("parentContainer");
const firstCard = document.getElementById("firstCard");
const searchBox = document.getElementById("searchBox");
const filterBox = document.getElementById("filter");

const toggleDarkMode = document.getElementById("toggleDarkmode");
const toggleLightMode = document.getElementById("toggleLightMode");
const html = document.documentElement; 

let displayingCountries = [];
let countries = [];

const displayCurrentCountries = () => {
  if (displayingCountries.length > 0) {
    parentContainer.innerHTML = displayingCountries
      .map(
        (country) => `
        <div class="flex flex-col w-full md:w-[23%] bg-white p-2 h-[300px] dark:bg-darkmodeShade dark:text-[white] rounded-lg shadow-md cursor-pointer" 
          id="firstCard" 
          data-name="${country.name}">  
  <div class="flex-1 border border-red-500" >
          <img src="${country.flag}" alt="${country.name}" class="w-full object-cover"/> </div>

          <div class="flex-1 border border-red-500">
          <h3 class="text-lg font-bold mt-2 dark:text-[white]">${country.name}</h3>
          <p class="text-gray-600 dark:text-[white]">Population: ${country.population}</p>
          <p class="text-gray-600 dark:text-[white]">Region: ${country.region}</p>
          <p class="text-gray-600 dark:text-[white]">Capital: ${country.capital}</p>
          </div>
  
        </div>
      `
      )
      .join("");
  } else {
    parentContainer.innerHTML = `<h2>No Available countries<h2>`;
  }
};

const fetchCountries = async () => {
  parentContainer.innerHTML = `<i>Loading...<i>`;
  const response = await fetch("/data.json", {
    method: "GET",
  });
  const countriesData = await response.json();
  countries = countriesData;
  displayingCountries = countries;
  displayCurrentCountries();
};

const res = fetchCountries();

const handleSearch = (value) => {
  console.log(value);
  const searchData = countries.filter((country) =>
    country.name.toLowerCase().startsWith(value.toLowerCase())
  );
  console.log(searchData);
  displayingCountries = searchData;
  displayCurrentCountries();
};

searchBox.addEventListener("change", (e) => {
  handleSearch(e.target.value);
});

//Filter feature

const handleFilter = (value) => {
  console.log(value);
  if (value === "all") {
    displayingCountries = countries;
  } else {
    displayingCountries = countries.filter(
      (country) => country.region.toLowerCase() === value.toLowerCase()
    );
  }
  displayCurrentCountries();
};

filterBox.addEventListener("change", (e) => {
  handleFilter(e.target.value);
});

const modeText = document.getElementById("modetext");
const parentToogle = document.getElementById("parent-toogle");
parentToogle.addEventListener("click", () => {
  const isDarkMode = html.classList.toggle("dark");

  if (isDarkMode) {
    modeText.innerText = "Light Mode";
  } else {
    modeText.innerText = "Dark Mode";
  }
});

//Details page
parentContainer.addEventListener("click", (e) => {
  const clickedCard = e.target.closest("#firstCard");

  if (clickedCard) {
    const countryName = clickedCard.getAttribute("data-name");
    const clickedCountry = countries.find(
      (country) => country.name === countryName
    );

    if (clickedCountry) {
      console.log("Country clicked:", clickedCountry);

      parentContainer.innerHTML = `
        <div class="flex flex-col mx-4 gap-10 my-8 w-full md:mx-8" id="details">
          <div id="backBtn" class="flex shadow-md items-center gap-2 p-2 w-24 cursor-pointer dark:bg-darkmodeShade">
            <i class="fa-solid fa-arrow-left"></i> Back
          </div>

          <div class="flex flex-col md:flex-row justify-between gap-16 py-6">
            <!-- image div -->
            <div id="imgcontainer" class="border border-solid w-11/12 md:w-1/2">
              <img src="${clickedCountry.flag}" alt="${
        clickedCountry.name
      }" class="w-full"/>
            </div>

            <!-- details div -->
            <div class="flex flex-col justify-between gap-8 w-11/12 md:w-1/2">
              <h2 class="text-2xl font-bold">${clickedCountry.name}</h2>

              <div class="flex flex-col justify-between md:flex-row gap-6">

                <div class="flex flex-col">
                  <h4 class="font-bold">Native Name: <span class="font-light">${
                    clickedCountry.nativeName || "N/A"
                  }</span></h4>
                  <h4 class="font-bold">Population: <span class="font-light">${
                    clickedCountry.population
                  }</span></h4>
                  <h4 class="font-bold">Region: <span class="font-light">${
                    clickedCountry.region
                  }</span></h4>
                  <h4 class="font-bold">Sub Region: <span class="font-light">${
                    clickedCountry.subregion || "N/A"
                  }</span></h4>
                  <h4 class="font-bold">Capital: <span class="font-light">${
                    clickedCountry.capital || "N/A"
                  }</span></h4>
                </div>

                <div class="flex flex-col">
                  <h4 class="font-bold">Top Level Domain: <span class="font-light">${
                    clickedCountry.topLevelDomain || "N/A"
                  }</span></h4>
                  <h4 class="font-bold">Currencies: <span class="font-light">${
                    clickedCountry.currencies
                      ? clickedCountry.currencies.map((c) => c.name).join(", ")
                      : "N/A"
                  }</span></h4>
                  <h4 class="font-bold">Language: <span class="font-light">${
                    clickedCountry.languages
                      ? clickedCountry.languages.map((l) => l.name).join(", ")
                      : "N/A"
                  }</span></h4>
                </div>
              </div>

              <div class="flex">
                <h4 class="font-bold">Border Countries: <span class="font-light">${
                  clickedCountry.borders
                    ? clickedCountry.borders.join(", ")
                    : "N/A"
                }</span></h4>
              </div>
            </div>
          </div>
        </div>
      `;

      document.getElementById("backBtn").addEventListener("click", () => {
        displayCurrentCountries();
      });
    }
  }
});
