const countryName = new URLSearchParams(location.search).get("name");
const flagImage=document.querySelector('.country-details img');
const countryNameH1=document.querySelector('.country-details h1')
const nativeName=document.querySelector('.native-name');
const population=document.querySelector('.population');
const borderCountries=document.querySelector('.border-countries')
const region=document.querySelector('.region');
const subRegion=document.querySelector('.sub-region');
const capital=document.querySelector('.capital')
const toplevelDomain=document.querySelector('.top-level-domain');
const currencies=document.querySelector('.currencies');
const language=document.querySelector('.languages');
fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    console.log(country);
    flagImage.src=country.flags.svg;
    countryNameH1.innerText=country.name.common;
    population.innerText=country.population.toLocaleString('en-IN');
    region.innerText=country.region;
    // subRegion.innerText=country.subregion;
    // capital.innerText=country.capital?.[0];
    toplevelDomain.innerText=country.tld.join(',');
    currencies.innerText=country.currencies;
    language.innerText=country.languages;
    if(country.capital){
      capital.innerText=country.capital?.[0]
    }
    if(country.subregion){
      subRegion.innerText=country.subregion;
    }
    if(country.name.nativeName){
      nativeName.innerText=Object.values(country.name.nativeName)[0].common;
    }
    else{
      nativeName.innerText=country.name.common;
    }
    if(country.currencies){
      currencies.innerText=Object.values(country.currencies).map((currency)=>currency.name).join(', ')
    }
    if(country.languages){
      language.innerText=Object.values(country.languages).map((language)=>language).join(',')
    }
    if(country.borders){
      country.borders.forEach((border)=>{
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
        .then((res)=>res.json())
        .then(([data])=>{
          const borderCountryTag=document.createElement('a');
          borderCountryTag.innerText=data.name.common;
          borderCountryTag.href=`country.html?name=${data.name.common}`
          borderCountries.append(borderCountryTag);
        }
        // console.log(data);
       
        )
      })
    }
    
  });
// How to fetch data from queryString
// We can pass multiple data in query by using && operator


// To see all the details of a country which we pass as a parameter in query https://restcountries.com/v3.1/name/${countryName}?fullText=true
// To see all the details of border countries of a particular country we are using this api https://restcountries.com/v3.1/alpha/${border}
