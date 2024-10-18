const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
// All values
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg p");

// update Exchange function
const updateExchange = async () => {
  let amt = document.querySelector(".amount input");
  let amtVal = amt.value;
  if (amtVal == "" || amtVal < 0) {
    amtVal = 1;
    amt.value = "1";
  };
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let currList = data[fromCurr.value.toLowerCase()];
  let rate = currList[toCurr.value.toLowerCase()];
  let finalAmt = rate * amtVal 
  console.log(finalAmt)
  newMsg = `${amtVal} ${fromCurr.value.toUpperCase()} = ${finalAmt} ${toCurr.value.toUpperCase()}`;
  msg.innerText = newMsg;
  msg.value = newMsg;
};


// for add option and flags of all countries
for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOpt = document.createElement("option");
    newOpt.innerText = currCode;
    newOpt.value = currCode;
    if (select.name === "from" && currCode === "USD") {
        newOpt.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
        newOpt.selected = "selected";
    } 
    select.append(newOpt);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target)
  });
};

// for update flags when change happen
const updateFlag = (elem) => {
    let currCode = elem.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = elem.parentElement.querySelector("img");
    img.src = newSrc;
};

// for exchange rate show at load
window.addEventListener("load", () => {
  updateExchange();
});


// for show exchange on screen
btn.addEventListener("click", (evt) => {
  evt.preventDefault()
  updateExchange()
});

