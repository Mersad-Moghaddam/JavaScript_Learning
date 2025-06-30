// Functions in JS
function add(a, b) {
    return a + b;
}
console.log(add(1, 2));
function subtract(a, b) {
    return a - b;
}
console.log(subtract(5, 3));
function multiply(a, b) {
    return a * b;
}
console.log(multiply(4, 2));
function divide(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero");
    }
    return a / b;
}
console.log(divide(8, 2));
function modulus(a, b) {
    return a % b;
}
console.log(modulus(10, 3));
function power(base, exponent) {
    return Math.pow(base, exponent);
}
console.log(power(2, 3));
function squareRoot(number) {        
    return Math.sqrt(number);
}
console.log(squareRoot(16));