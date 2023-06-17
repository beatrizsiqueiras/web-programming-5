let numberFactorial = () => {
    let factorialResultDiv = document.getElementById('factorialResult');
    let numberToCalc = parseInt(document.getElementById('numberToCalc').value);
    let factorialResult = 1;

    factorialResultDiv.innerHTML = '';

    for (let i = numberToCalc; i >= 1; i--) {
        factorialResult = factorialResult * i;
        if (i > 1) {
            factorialResultDiv.innerHTML += `${i} x `;
        } else {
            factorialResultDiv.innerHTML += `${i} = ${factorialResult} `;
        }
    }
}