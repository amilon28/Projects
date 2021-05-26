"use strict";

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand += number;
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;

    if (this.previousOperand !== "") {
      this.compute();
    }

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let result;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case "+":
        result = prev + current;
        break;

      case "-":
        result = prev - current;
        break;

      case "x":
        result = prev * current;
        break;

      case "/":
        result = prev / current;
        break;

      default:
        return;
    }

    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = "";
  }

  displayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits} `;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.displayNumber(
      this.currentOperand
    );

    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.displayNumber(
        this.previousOperand
      )}${this.operation}

      `;
    } else {
      this.previousOperandTextElement.innerText = this.previousOperand;
    }
  }
}

// Select Elements
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalBtn = document.querySelector("[data-equal]");
const deleteBtn = document.querySelector("[data-delete]");
const resetBtn = document.querySelector("[data-reset]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

const theme1 = document.querySelector("[data-theme-1]");
const theme2 = document.querySelector("[data-theme-2]");
const theme3 = document.querySelector("[data-theme-3]");
// theme elements
const screen = document.querySelector(".output");
const keypad = document.querySelector("[data-keypad]");
const title = document.querySelector(".preference");
const switchContainer = document.querySelector(
  "[data-switch-themes-container]"
);
//--------------------------------------------------------------
// Calculate logic

const calc = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((number) => {
  number.addEventListener("click", function () {
    calc.appendNumber(number.innerText);
    calc.updateDisplay();
  });
});

operationButtons.forEach((opeartion) => {
  opeartion.addEventListener("click", function () {
    calc.chooseOperation(opeartion.innerText);
    calc.updateDisplay();
  });
});

resetBtn.addEventListener("click", function () {
  calc.clear();
  calc.updateDisplay();
});

equalBtn.addEventListener("click", function () {
  calc.compute();
  calc.updateDisplay();
});

deleteBtn.addEventListener("click", function () {
  calc.delete();
  calc.updateDisplay();
});

// Switch themes
// Theme 1
theme1.addEventListener("click", function () {
  theme1.style.opacity = 1;
  theme2.style.opacity = 0;
  theme3.style.opacity = 0;
  theme1.style.backgroundColor = "hsl(6, 63%, 50%)";
  switchContainer.style.backgroundColor = "hsl(223, 31%, 20%)";
  document.body.style.backgroundColor = "hsl(222, 26%, 31%)";
  screen.style.backgroundColor = "hsl(224, 36%, 15%)";
  deleteBtn.style.backgroundColor = "hsl(225, 21%, 49%)";
  resetBtn.style.backgroundColor = "hsl(225, 21%, 49%)";
  deleteBtn.style.color = "hsl(0, 0, 100%)";
  resetBtn.style.color = "hsl(0, 0, 100%)";
  deleteBtn.style.boxShadow = "0 .4rem .1rem hsl(224, 28%, 35%)";
  resetBtn.style.boxShadow = "0 .4rem .1rem hsl(224, 28%, 35%)";
  equalBtn.style.backgroundColor = "hsl(6, 63%, 50%)";
  equalBtn.style.boxShadow = "0 .4rem .1rem hsl(6, 70%, 34%)";
  keypad.style.backgroundColor = "hsl(223, 31%, 20%)";
  title.style.color = "#fff";
  previousOperandTextElement.style.color = "rgba(255,255,255,.75)";
  currentOperandTextElement.style.color = "#fff";

  numberButtons.forEach((btn) => {
    btn.style.backgroundColor = "hsl(30, 25%, 89%)";
    btn.style.color = "hsl(221, 14%, 31%)";
    btn.style.boxShadow = " 0 0.4rem 0.1rem hsl(28, 16%, 65%)";
  });

  operationButtons.forEach((btn) => {
    btn.style.backgroundColor = "#E5E4E0";
    btn.style.color = "#32322A";
    btn.style.boxShadow = " 0 0.4rem 0.1rem #A69D90";
  });
});

// Theme 2
theme2.addEventListener("click", function () {
  theme1.style.opacity = 0;
  theme2.style.opacity = 1;
  theme3.style.opacity = 0;
  theme2.style.backgroundColor = "#C05703";
  switchContainer.style.backgroundColor = "#D5CCCC";
  document.body.style.backgroundColor = "#E6E6E6";
  screen.style.backgroundColor = "#EEEEEE";
  deleteBtn.style.backgroundColor = "#388187";
  resetBtn.style.backgroundColor = "#388187";
  deleteBtn.style.color = "#F2FFFF";
  resetBtn.style.color = "#F2FFFF";
  deleteBtn.style.boxShadow = "0 .4rem .1rem #1B6166";
  resetBtn.style.boxShadow = "0 .4rem .1rem #1B6166";
  equalBtn.style.backgroundColor = "#C85401";
  equalBtn.style.boxShadow = "0 .4rem .1rem #C85401";
  keypad.style.backgroundColor = "#D3CDCD";
  title.style.color = "#35362E";
  previousOperandTextElement.style.color = "#35362ecc";
  currentOperandTextElement.style.color = "#35362E";

  numberButtons.forEach((btn) => {
    btn.style.backgroundColor = "#E5E4E0";
    btn.style.color = "#32322A";
    btn.style.boxShadow = " 0 0.4rem 0.1rem #A69D90";
  });

  operationButtons.forEach((btn) => {
    btn.style.backgroundColor = "#E5E4E0";
    btn.style.color = "#32322A";
    btn.style.boxShadow = " 0 0.4rem 0.1rem #A69D90";
  });
});

// Theme 3
theme3.addEventListener("click", function () {
  theme1.style.opacity = 0;
  theme2.style.opacity = 0;
  theme3.style.opacity = 1;
  theme3.style.backgroundColor = "hsl(176, 100%, 44%)";
  switchContainer.style.backgroundColor = "hsl(268, 71%, 12%)";
  document.body.style.backgroundColor = "hsl(268, 75%, 9%)";
  screen.style.backgroundColor = "hsl(268, 71%, 12%)";
  deleteBtn.style.backgroundColor = "hsl(281, 89%, 26%)";
  resetBtn.style.backgroundColor = "hsl(281, 89%, 26%)";
  deleteBtn.style.color = "#F2FFFF";
  resetBtn.style.color = "#F2FFFF";
  deleteBtn.style.boxShadow = "0 .4rem .1rem hsl(285, 91%, 52%)";
  resetBtn.style.boxShadow = "0 .4rem .1rem hsl(285, 91%, 52%)";
  equalBtn.style.backgroundColor = "hsl(176, 100%, 44%)";
  equalBtn.style.boxShadow = "0 .4rem .1rem hsl(177, 92%, 70%)";
  keypad.style.backgroundColor = "hsl(268, 71%, 12%)";
  title.style.color = "hsl(52, 100%, 62%)";
  previousOperandTextElement.style.color = "hsl(52, 100%, 70%)";
  currentOperandTextElement.style.color = "hsl(52, 100%, 62%)";

  numberButtons.forEach((btn) => {
    btn.style.backgroundColor = "hsl(268, 47%, 21%)";
    btn.style.color = "hsl(52, 100%, 62%)";
    btn.style.boxShadow = " 0 0.4rem 0.1rem hsl(290, 70%, 36%)";
  });

  operationButtons.forEach((btn) => {
    btn.style.backgroundColor = "hsl(268, 47%, 21%)";
    btn.style.color = "hsl(52, 100%, 62%)";
    btn.style.boxShadow = " 0 0.4rem 0.1rem hsl(290, 70%, 36%)";
  });
});
