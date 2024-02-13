const countriesContainer = document.querySelector(".countries-container");
const filterByRegion = document.querySelector(".filter-by-region");
const searchInput=document.querySelector('.search-container input');
const themeChanger=document.querySelector('.theme-changer');

let allCountriesData;
fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
       renderCountries(data);
       allCountriesData=data;
       console.log(allCountriesData);
    });
filterByRegion.addEventListener("change", (e) => {
  fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
    .then((res) => res.json())
    .then((data) => {
               renderCountries(data);
      });
      // .then(renderCountries)
    });
function renderCountries(data){
  countriesContainer.innerHTML='';
    // console.log(data);
    data.forEach((country) => {
      // console.log(country);
      const countryCard = document.createElement("a");
      countryCard.href = `./country.html?name=${country.name.common}`;
      countryCard.classList.add("country-card");
      const cardHTML = `
      <img src="${country.flags.svg}" alt="flag" />
      <div class="card-text">
            <h3 class="card-title">${country.name.common}</h3>
            <p><b>Population:</b>${country.population.toLocaleString(
              "en-IN"
            )}</p>
            <p><b>Region:</b>${country.region}</p>
            <p><b>Capital:</b>${country.capital}</p>
      </div>`;
      countryCard.innerHTML = cardHTML;
      countriesContainer.append(countryCard);
})
}
searchInput.addEventListener('input',(e)=>{
  console.log(e.target.value);
  const filteredCountry=allCountriesData.filter((country)=>country.name.common.includes(e.target.value));
  console.log(filteredCountry);
  countriesContainer.innerHTML='';
  renderCountries(filteredCountry);
})
themeChanger.addEventListener('click',()=>{
   document.body.classList.toggle('dark');
})


// To get all countries in Main page we use this api  https://restcountries.com/v3.1/all
// To select a region from dropdown and get all the country details regarding the region we used https://restcountries.com/v3.1/region/${e.target.value}
// To show all countries card we used function renderCountries by passing a object of country
// To search a country by input box we store all country in a variable .with the help of that variable i used filter method to find that country
