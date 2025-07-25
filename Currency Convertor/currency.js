// const BASE_URL = "https://hexarate.paikama.co/api/rates/latest/USD?target=JPY";
const BASE_URL = "https://hexarate.paikama.co/api/rates/latest";


const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msgRate = document.querySelector(".msg1");
const msg = document.querySelector(".msg2");


for (let select of dropdowns){
    for (let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;

        if(select.name === "from" && currCode === "USD")
            newOption.selected = "selected";
        else if(select.name === "to" && currCode === "INR")
            newOption.selected = "selected";

        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

const updateExchangeRate = async() => {
    let ammount = document.querySelector(".ammount input");
    let amtVal = ammount.value;
    if(amtVal === "" || amtVal < 0) {
        amtVal = 1;
        ammount.value = "1";
    }

    // console.log(fromCurr.value, toCurr.value, amtVal);

    const URL = `${BASE_URL}/${fromCurr.value}?target=${toCurr.value}&amount=${amtVal}`;
    fetch(URL)
        .then(response => response.json())
        .then(jsonData => {
        const exchangerate = jsonData.data.mid; 
    
    console.log("Exchange rate:", exchangerate.toFixed(2));

    let finalAmount = (amtVal * exchangerate).toFixed(2);
    msgRate.innerText = `1 ${fromCurr.value} = ${exchangerate} ${toCurr.value}`;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    }) 
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
})

window.addEventListener("load", () => {
    updateExchangeRate();
})