let sumNumbers = () => {
    let sumResultDiv = document.getElementById('sumResult');
    let firstNumber = parseFloat(document.getElementById('firstNumber').value);
    let secondNumber = parseFloat(document.getElementById('secondNumber').value);

    let sumResult = firstNumber + secondNumber;
    sumResultDiv.innerHTML = `<h3>The sum of ${firstNumber} and ${secondNumber} is ${sumResult}</h3>`;
}