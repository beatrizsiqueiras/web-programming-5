let buttonToChange = document.getElementById('buttonToChange');

const changeButtonColor = () => {
    buttonToChange.innerHTML = "You clicked";
    buttonToChange.style.cssText =
        'background-color: green;' +
        'border: 0px green';
};

buttonToChange.addEventListener('mouseout', function () {
    Swal.fire({
        icon: 'success',
        title: 'You left.',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    })
});