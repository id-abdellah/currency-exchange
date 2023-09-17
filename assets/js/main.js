import { country_list } from "./countryLists.js";

const amountInput = document.querySelector("#amount");
const convertedValue = document.querySelector(".converted-value");
const button = document.querySelector(".get-exchange");
// const currencyCountry = document.querySelectorAll(".cur-pay");
const changeIcon = document.querySelector(".change-icon");

const currenciesSelect = document.querySelectorAll(".currencies-select");
const fromSelect = document.querySelector("#fromSelect");
const toSelect = document.querySelector("#toSelect");


for (const currency in country_list) {
    currenciesSelect.forEach((select) => {
        select.innerHTML += `
                <option value="${currency}">${currency}</option>
            `;
    })
}

[fromSelect, toSelect].forEach((select) => {
    select.oninput = () => {
        if (select.value == "null") return;
        setImageOfCurrencyCountry(select)
    }
})

changeIcon.addEventListener("click", () => {
    if (fromSelect.value == "null" || toSelect.value == "null") return;
    [fromSelect.value, toSelect.value] = [toSelect.value, fromSelect.value]
    setImageOfCurrencyCountry(fromSelect)
    setImageOfCurrencyCountry(toSelect)
})


function setImageOfCurrencyCountry(select) {
    select.previousElementSibling.firstElementChild.setAttribute("src", `https://flagcdn.com/48x36/${country_list[select.value].toLowerCase()}.png`)
}


/* Method 1 : Pair Conversion api */

button.addEventListener("click", () => {
    if (fromSelect.value == "null" || toSelect.value == "null" || amountInput.value == "") return;

    let from_value = fromSelect.value;
    let to_value = toSelect.value;
    let amountValue = amountInput.value;

    fetch(`https://v6.exchangerate-api.com/v6/47c91a4781d6afe06087f7d2/pair/${from_value}/${to_value}`).then(
        (respons) => {
            let maData = respons.json();
            return maData
        }
    ).then(
        (myData) => {
            convertedValue.innerHTML = `
               <span class="final-converted">${amountValue}</span> ${from_value} = <span class="final-converted">${(myData.conversion_rate * amountValue).toFixed(4)}</span> ${to_value}
            `;
        }
    ).catch(
        (error) => {
            convertedValue.innerHTML = error;
        }
    )
})