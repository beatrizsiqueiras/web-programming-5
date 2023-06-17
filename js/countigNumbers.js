let countNumbers = () => {
    let count = 1;
    let countingNumbersDiv = document.getElementById('countingNumbers');

    function displayNumber() {
        if (count <= 100) {
            if (count === 1) {
                countingNumbersDiv.innerHTML += `START... ${count} ->`;
            } else if (count === 100) {
                countingNumbersDiv.innerHTML += ` ${count} ->...END`;
            } else {
                countingNumbersDiv.innerHTML += ` ${count} ->`;
            }
            count++;
            setTimeout(displayNumber, 100);
        }
    }
    displayNumber();
}