function displayFunction() {
    let input = document.getElementById('myInput').value;
    let display = document.getElementById('display');

    let primeraDerivada = math.derivative(input, 'x').toString();
    let segundaDerivada = math.derivative(primeraDerivada, 'x').toString();

    // Formato de la function en un string LaTeX
    let latexFunction = '\\(' + input.replace(/\*/g, '\\cdot') + '\\)';
    let latexprimeraDerivada = '\\(' + primeraDerivada.replace(/\*/g, '\\cdot') + '\\)';
    let latexsegundaDerivada = '\\(' + segundaDerivada.replace(/\*/g, '\\cdot') + '\\)';

    // String LaTeX  para mostrar en el display
    display.innerHTML = 'Funcion: ' + latexFunction + '<br>Primera Derivada: ' + latexprimeraDerivada + '<br>Segunda Derivada: ' + latexsegundaDerivada;

    // convierte LaTeX en MathJax
    MathJax.typeset();
}
function newtonRaphson() {
    let input = document.getElementById('myInput').value;
    let valorInicial = parseFloat(document.getElementById('valorInicial').value);
    let resultados = [];
    let iteraciones = 15;

    for (let i = 0; i < iteraciones; i++) {
        let funcionEvaluada = math.parse(input).evaluate({x: valorInicial});
        let primeraDerivadaFunc = math.derivative(input, 'x');
        let segundaDerivadaFunc = math.derivative(primeraDerivadaFunc, 'x');
    
        let primeraDerivada = primeraDerivadaFunc.evaluate({x: valorInicial});
        let segundaDerivada = segundaDerivadaFunc.evaluate({x: valorInicial});

        let newtonRaphson = valorInicial - ((funcionEvaluada * primeraDerivada) / (Math.pow(primeraDerivada, 2) - (funcionEvaluada * segundaDerivada)));
        error = (Math.abs(newtonRaphson - valorInicial))/(newtonRaphson) * 100;
        resultados.push([i+1, newtonRaphson, error]);
        valorInicial = newtonRaphson;
    
    }
    //console.log('funvion evaluada:' + funcionEvaluada);
    //console.log('First Derivative: ' + primeraDerivada);
    //console.log('Second Derivative: ' + segundaDerivada);
    //console.log('Newton Raphson: ' + newtonRaphson);
    console.log(resultados);

    let table = document.createElement('table');

    for (let i = 0; i < resultados.length; i++) {
        let row = document.createElement('tr');

        for (let j = 0; j < resultados[i].length; j++) {
            let cell = document.createElement('td');

            cell.textContent = resultados[i][j];
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    let tableContainer = document.getElementById('tableContainer');
    tableContainer.appendChild(table);
}