"use strict";
(function () {
    console.log("hello world");
    const selectCurrency = document.querySelector("select.currency");
    const selectCurrency2 = document.querySelector("select.currency2");
    const inputAmount = document.querySelector("input.amount");
    const inputAmount2 = document.querySelector("input.amount2");

    async function fetchCurrencies() {
        const response = await fetch("https://cors-anywhere.herokuapp.com/" //first URLF for CORS proxy
            + "https://currencyapi.net/api/v1/currencies?key=345b626be23de24505ee2fb0b454dcfa1dee");
        const myJson = await response.json();
        return myJson["currencies"];
    };

    async function fillSelectOptions() {
        let currencies = await fetchCurrencies();
        for (let currency in currencies) {
            let option = document.createElement("option");
            option.text = currency;
            selectCurrency.appendChild(option);
            option = document.createElement("option");
            option.text = currency;
            selectCurrency2.appendChild(option);
        }
    };
    
    async function getRateBaseUsd(currency) {
        const response = await fetch("https://cors-anywhere.herokuapp.com/" //first URLF for CORS proxy
            + "https://currencyapi.net/api/v1/rates?key=345b626be23de24505ee2fb0b454dcfa1dee&base=USD&limit="
            + currency);
        const myJson = await response.json();
        return myJson["rates"][currency];
    }

    fillSelectOptions();

    selectCurrency.addEventListener("input", convert);
    selectCurrency2.addEventListener("input", convert);
    inputAmount.addEventListener("input", convert);

    async function convert() {
        let rateBaseUsd1 = await getRateBaseUsd(selectCurrency.value);
        let rateBaseUsd2 = await getRateBaseUsd(selectCurrency2.value);
        inputAmount2.value = inputAmount.value * (rateBaseUsd2/rateBaseUsd1);
    }
})();