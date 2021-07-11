import './css/styles.css';
import fetchCountries from './partials/fetchCountries'
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;
import countryTmp from './tmp/countryTmp.hbs'
import countryListTmp from "./tmp/countryListTmp.hbs"
import {Notify} from "notiflix";

const refs = {
    inputCountry: document.getElementById('search-box'),
    countriesList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info')
}

refs.inputCountry.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry(e) {
    refs.countryInfo.innerHTML = '';
    refs.countriesList.innerHTML = '';
    fetchCountries(e.target.value.trim()).then(countries =>{
        if (e.target.value.trim() === " ") {
            return
        } else if (countries.length === 1) {
            refs.countryInfo.innerHTML = countryTmp(countries)
        } else if (countries.length >= 2 && countries.length <= 10) {
            refs.countriesList.innerHTML = countryListTmp(countries)
        } else if (countries.length > 10) {
            Notify.failure('Too many matches found. Please enter a more specific name.')         
        } else if (countries.status === 404) {
            Notify.failure('Too many matches found. Please enter a more specific name.')  
        }
              
    }).catch(()=>{Notify.failure('Too many matches found. Please enter a more specific name.');})

}