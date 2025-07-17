import { data } from "./currencies.js";
const resultBox = document.getElementById("result");
const btn = document.querySelector("button");
const from = document.querySelector("#from");
const to = document.querySelector("#to");

for (let i = 0; i < data.length; i++) {
  const optionFrom = document.createElement("option");
  optionFrom.textContent = data[i].country_name;
  if (data[i].currency === "USD") {
    optionFrom.value = data[i].currency;
    optionFrom.selected = true;
  } else {
    optionFrom.value = data[i].currency;
  }
  from.appendChild(optionFrom);
  const optionTo = document.createElement("option");
  optionTo.textContent = data[i].country_name;
  if (data[i].currency === "INR") {
    optionTo.value = data[i].currency;
    optionTo.selected = true;
  } else {
    optionTo.value = data[i].currency;
  }
  to.appendChild(optionTo);
}

btn.addEventListener("click", () => {
  const amount = document.getElementById("amount").value;
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const test = from + to;

  if (from === to) {
    resultBox.innerText = "Invalid currency pair.";
    return;
  }

  convertCurrency(from, amount, test);
});

async function convertCurrency(from, amount, test) {
  try {
    const response = await fetch(
      `https://api.exchangerate.host/live?access_key=4d6518c10949c279ff52b14222758f17&source=${from}`
    );
    const data = await response.json();

    if (data.success) {
      calculateCurrency(data, amount, test);
    } else {
      console.error("API request was not successful");
    }
  } catch (error) {
    console.error("Error fetching currency data:", error);
  }
}

function calculateCurrency(data, amount, test) {
  const oneUnit = data.quotes[test];
  const ans = oneUnit * parseFloat(amount);
  resultBox.innerText = `Converted: ${ans.toFixed(2)}`;
  console.log(ans.toFixed(2));
}
