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
const filterBox = document.getElementById('filter'); 

const toggleDarkMode = document.getElementById("toggleDarkmode");
const toggleLightMode = document.getElementById('toggleLightMode')
const html = document.documentElement; // Get the <html> tag


let displayingCountries = [];
let countries = [];

const displayCurrentCountries = () => {
  if (displayingCountries.length > 0) {
    parentContainer.innerHTML = displayingCountries
      .map(
        (
          country
        ) => `<div class="flex flex-col w-1/4 bg-white p-4 rounded-lg shadow-md" id="firstCard">
            
        <img
              id="flagImage"
              src=  ${country.flag}
              alt=  ${country.name}
              class="w-full h-32 object-cover"
            />
    

        
            <h3 id="countryName" class="text-lg font-bold mt-2">
             ${country.name}
            </h3>
            <p id="countryPopulation" class="text-gray-600">Population: ${country.population}</p>
            <p id="countryRegion" class="text-gray-600">Region:   ${country.region}</p>
            <p id="countryCapital" class="text-gray-600">Capital:   ${country.capital}</p>
        
          
          </div>`
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
  const searchData = countries.filter((country) => country.name.toLowerCase().startsWith(value.toLowerCase()));
  console.log(searchData)
  displayingCountries = searchData;
  displayCurrentCountries()
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


filterBox.addEventListener("change" , (e) => {
  handleFilter(e.target.value);
} );


const parentToogle  = document.getElementById('parent-toogle')
parentToogle.addEventListener("click", () => {
  const isDarkMode = html.classList.toggle("dark"); // Toggles dark mode

  // Check if dark mode is active
  if (isDarkMode) {
   parentToogle.innerHTML = `<div class="flex items-center gap-2 cursor-pointer hidden" id="toggleLightMode">
          <i class="fa-regular fa-moon"></i>
          <p class="text-sm bg-[red]">light Modess</p>
        </div>`
  } else {
   parentToogle.innerText = `<div class="flex items-center gap-2 cursor-pointer hidden" id="toggleLightMode">
          <i class="fa-regular fa-moon"></i>
          <p class="text-sm bg-[red]">light Modess</p>
        </div>`
  }
});


// toggleLightMode.addEventListener('click' , () =>{
//   html.classList.remove("dark");
//   toggleDarkMode.style.display = "block"
//   toggleLightMode.style.display = "none"
// })
