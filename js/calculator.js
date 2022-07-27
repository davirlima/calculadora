let defaultResult = true;

let number1 = null;
let number2 = null;

let alreadyCalculate = false;
let automaticCalculate = true;

function clearAll() {
  document.getElementById("resultArea").innerHTML = "0";
  document.getElementById("resultArea").style.fontSize = "2rem";

  document.getElementById("equationArea").innerHTML = "";

  defaultResult = true;
  automaticCalculate = false;
  number1 = null;
  number2 = null;
}

function backspace() {
  document.getElementById("resultArea").innerHTML = document
    .getElementById("resultArea")
    .innerText.slice(
      0,
      document.getElementById("resultArea").innerText.length - 1
    );

  if (document.getElementById("resultArea").innerText == "") {
    document.getElementById("resultArea").innerText = "0";
    defaultResult = true;
  }
}

function calculate(number1, number2) {
  let answer = 0;

  switch (document.getElementById("equationArea").innerText.split(" ")[1]) {
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

  if (answer.toString().length > 16) {
    let beforeDot = answer
      .toString()
      .slice(0, answer.toString().indexOf(".")).length;
    document.getElementById("resultArea").style.fontSize = "1.6rem";

    return answer
      .toFixed(16 - beforeDot - 1)
      .toString()
      .replace(".", ",");
  } else {
    return answer.toString().replace(".", ",");
  }
}

function print(value) {
  switch (value) {
    case "=":
      if (alreadyCalculate == false) {
        if (number1 == null) {
          break;
        }
        if (number2 == null) {
          number2 = parseFloat(
            document.getElementById("resultArea").innerText.replace(",", ".")
          );
          document.getElementById("equationArea").innerHTML +=
            number2.toString().replace(".", ",") + " =";
        }

        document.getElementById("resultArea").innerHTML = calculate(
          number1,
          number2
        );
      }

      defaultResult = true;
      alreadyCalculate = true;
      automaticCalculate = false;
      number1 = null;
      number2 = null;
      break;

    case ",":
      // if (canDigit == true) {
      if (
        document.getElementById("resultArea").innerText[
          document.getElementById("resultArea").innerText.length - 1
        ] == ","
      ) {
        document.getElementById("resultArea").innerHTML += "";
      } else if (defaultResult == true) {
        document.getElementById("resultArea").innerHTML = "0,";
        defaultResult = false;
        // automaticCount = true;
        // alreadyCount = false;
      } else {
        document.getElementById("resultArea").innerHTML += ",";
      }
      // }
      break;

    case "+":
    case "-":
    case "*":
    case "/":
      document.getElementById("resultArea").style.fontSize = "2rem";
      if (defaultResult == true) {
        document.getElementById("equationArea").innerHTML =
          document
            .getElementById("equationArea")
            .innerText.slice(
              0,
              document.getElementById("equationArea").innerText.length - 1
            ) + ` ${value} `;
      }
      if (number1 == null) {
        number1 = parseFloat(
          document.getElementById("resultArea").innerText.replace(",", ".")
        );
        document.getElementById("equationArea").innerHTML =
          number1.toString().replace(".", ",") + ` ${value} `;
        document.getElementById("resultArea").innerHTML = "0";
        defaultResult = true;
        alreadyCalculate = false;
      } else if (automaticCalculate == false) {
        number2 = parseFloat(
          document.getElementById("resultArea").innerText.replace(",", ".")
        );

        number1 = parseFloat(calculate(number1, number2));
        number2 = null;
        document.getElementById("equationArea").innerHTML =
          number1.toString().replace(".", ",") + ` ${value} `;

        document.getElementById("resultArea").innerHTML = number1
          .toString()
          .replace(".", ",");

        defaultResult = true;
        automaticCalculate = true;
        alreadyCalculate = false;
      }
      break;

    default:
      if (defaultResult == true) {
        if (alreadyCalculate == true) {
          document.getElementById("equationArea").innerHTML = "";
        }
        document.getElementById("resultArea").style.fontSize = "2rem";
        document.getElementById("resultArea").innerHTML = value;

        defaultResult = false;
        alreadyCalculate = false;
        automaticCalculate = false;
      } else {
        document.getElementById("resultArea").innerHTML += value;
      }
      break;
  }
}
