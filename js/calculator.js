function calculate(number1, number2, operator) {
  let answer = 0;
  switch (operator) {
    case "+":
      answer = number1 + number2;
      break;
    case "-":
      answer = number1 - number2;
      break;
    case "*":
      answer = number1 * number2;
      break;
    case "/":
      answer = number1 / number2;
      break;
    default:
      break;
  }
  return answer;
}

const operatorArray = ["+", "-", "*", "/"];
let defaultResult = true;
let automaticCount = true;
let number1 = null;
let number2 = null;

function print(value) {
  let resultArea = document.getElementById("resultArea");
  let lastResultValue = resultArea.innerText[resultArea.innerText.length - 1];

  let equationArea = document.getElementById("equationArea");
  let lastEquationValue =
    equationArea.innerText[equationArea.innerText.length - 1];
  let operatorEquation = equationArea.innerText.split(" ")[1];

  switch (value) {
    case "C":
      resultArea.innerText = "0";
      equationArea.innerHTML = "";
      defaultResult = true;
      number1 = null;
      number2 = null;
      break;
    case "<":
      resultArea.innerHTML = resultArea.innerText.slice(
        0,
        resultArea.innerText.length - 1
      );
      if (resultArea.innerText == "") {
        resultArea.innerHTML = "0";
        defaultResult = true;
      }
      break;
    case "=":
      if (number2 == null) {
        number2 = parseFloat(resultArea.innerText);
      }
      equationArea.innerHTML += `${number2} =`;
      resultArea.innerHTML = calculate(number1, number2, operatorEquation);
      defaultResult = true;
      automaticCount = true;
      number1 = null;
      number2 = null;
      break;
    case ".":
      if (lastResultValue == ".") {
        resultArea.innerHTML += "";
        // -> Ideia - fazer borda piscar do resultArea piscar
      } else if (automaticCount == false) {
        resultArea.innerHTML = "0.";
        automaticCount = true;
        defaultResult = false;
      } else {
        resultArea.innerHTML += value;
      }
      defaultResult = false;
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      if (number1 == null) {
        number1 = parseFloat(resultArea.innerText);
      } else if (automaticCount == true) {
        number2 = parseFloat(resultArea.innerText);
        resultArea.innerHTML = calculate(number1, number2, operatorEquation);
        equationArea.innerHTML = resultArea.innerText + ` ${value} `;
        number1 = parseFloat(resultArea.innerText);
        automaticCount = false;
        defaultResult = false;
        number2 = null;
        break;
      }
      if (defaultResult == true) {
        equationArea.innerHTML = resultArea.innerText + ` ${value} `;
        resultArea.innerHTML = "0";
      } else if (lastResultValue == ".") {
        equationArea.innerHTML =
          resultArea.innerText.slice(0, resultArea.innerText.length - 1) +
          ` ${value} `;
        defaultResult = true;
        resultArea.innerHTML = "0";
      } else if (operatorArray.includes(lastEquationValue)) {
        equationArea.innerHTML =
          equationArea.innerText.slice(0, equationArea.innerText.length - 1) +
          ` ${value} `;
      } else {
        equationArea.innerHTML = resultArea.innerText + ` ${value} `;
        resultArea.innerHTML = "0";
        defaultResult = true;
      }
      break;
    default:
      if (defaultResult == true || automaticCount == false) {
        resultArea.innerHTML = value;
        defaultResult = false;
      } else {
        resultArea.innerHTML += value;
      }
      automaticCount = true;
      break;
  }
  console.log(resultArea.innerText.length);
  if (resultArea.innerText.length > 10) {
    console.log("Entrou aqui");
    resultArea.innerHTML = parseFloat(resultArea.innerText).toFixed(10);
  }
}
