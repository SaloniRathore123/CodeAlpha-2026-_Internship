let screen = document.getElementById('screen');

function getValue(value){
     screen.value += value;
}

function clearScreen(value){
    screen.value = "";
}

function deleteNumbers(value) {
    screen.value = screen.value.slice(0, -1);
}

function calculate() {
    try {
        //Why I use eval() function
        //eval convert string into numbers
        screen.value = eval(screen.value);
    } catch (error) {
        screen.value = "Error";
        setTimeout(clearScreen, 1000);
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key >= 0 && e.key <= 9) getValue(e.key);
    if (e.key === '+') getValue('+');
    if (e.key === '-') getValue('-');
    if (e.key === '*') getValue('*');
    if (e.key === '/') getValue('/');
    if (e.key === 'Enter' || e.key === '=') calculate();
    if (e.key === 'Backspace') deleteNumbers();
    if (e.key === 'Escape') clearScreen();
});