export default function fetchCountries(countryName) {
  return fetch(`https://restcountries.eu/rest/v2/name/${countryName}?fields=name;capital;population;flag;languages`).then(r => {
        if (!r.ok) {
            throw new Error(r.status);
      }
      return r.json()
  })
}



