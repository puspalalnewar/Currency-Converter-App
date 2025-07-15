const resultBox = document.getElementById("result");
const btn = document.querySelector("button");

btn.addEventListener("click", () => {
  const amount = document.getElementById("amount").value;
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const test = from + to;

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
  if (!oneUnit) {
    resultBox.innerText = "Invalid currency pair.";
    return;
  }
  const ans = oneUnit * parseFloat(amount);
  resultBox.innerText = `Converted: ${ans.toFixed(2)}`;
  console.log(ans.toFixed(2));
}
