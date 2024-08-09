const apiKey = "247a9a5e850b2d628feba93c";

const fromCurrency = document.getElementById("from-currency-select");
const toCurrency = document.getElementById("to-currency-select");

let result = document.getElementById("result");

currencyCodes.forEach((code) => {
  const option = document.createElement("option");
  option.value = code;
  option.text = code;
  fromCurrency.appendChild(option);
});
currencyCodes.forEach((code) => {
  const option = document.createElement("option");
  option.value = code;
  option.text = code;
  toCurrency.appendChild(option);
});

async function convertCurrency() {
  const fromValue = fromCurrency.value;
  const toValue = toCurrency.value;
  let data;

  let amount = document.querySelector("#amount").value;

  if (amount === "" || amount < 0) {
    alert("Enter a valid amount to convert");
  } else if (fromValue === "" || toValue === "") {
    alert("Enter currency");
  } else {
    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromValue}/${toValue}/${amount}`;
    const response = await fetch(url);
    data = await response.json();
  }

  result.textContent = `${amount} ${fromValue} = ${data.conversion_result} ${toValue}`;
  result.style.display = "block";
  // console.log(url);
}
