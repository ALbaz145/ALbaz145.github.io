function displayFunction() {
    let input = document.getElementById('myInput').value;
    let display = document.getElementById('display');

    // Parse the function and calculate its derivative
    let firstDerivative = math.derivative(input, 'x').toString();
    let secondDerivative = math.derivative(firstDerivative, 'x').toString();

    // Format the function into a LaTeX string
    let latexFunction = '\\(' + input.replace(/\*/g, '\\cdot') + '\\)';
    let latexFirstDerivative = '\\(' + firstDerivative.replace(/\*/g, '\\cdot') + '\\)';
    let latexSecondDerivative = '\\(' + secondDerivative.replace(/\*/g, '\\cdot') + '\\)';

    // Insert the LaTeX string into the paragraph element
    display.innerHTML = 'Function: ' + latexFunction + '<br>First Derivative: ' + latexFirstDerivative + '<br>Second Derivative: ' + latexSecondDerivative;

    // Render the LaTeX string with MathJax
    MathJax.typeset();
}