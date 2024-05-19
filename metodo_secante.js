function displayFunction() {
    let input = document.getElementById('myInput').value;
    let display = document.getElementById('display');



    // Formato de la function en un string LaTeX
    let latexFunction = '\\(' + input.replace(/\*/g, '\\cdot') + '\\)';


    // String LaTeX  para mostrar en el display
    display.innerHTML = 'Funcion: ' + latexFunction

    // convierte LaTeX en MathJax
    MathJax.typeset();
}
function secantMethod() {
    document.getElementById('tableContainer').innerHTML = '';
    let input = document.getElementById('myInput').value;
    let x0 = parseFloat(document.getElementById('x0').value);
    let x1 = parseFloat(document.getElementById('x1').value);
    let resultados = [];
    const iteraciones = 15;

    for (let i = 0; i < iteraciones; i++) {
        let fx0 = evaluateFunction(input, x0);
        let fx1 = evaluateFunction(input, x1);

        let xiPlus1 = x1 - ((fx1 * (x1 - x0)) / (fx1 - fx0));
        let error = Math.abs((xiPlus1 - x1) / xiPlus1) * 100;

        resultados.push([i + 1, x0, x1, xiPlus1, fx0, fx1, evaluateFunction(input, xiPlus1), error]);

        x0 = x1;
        x1 = xiPlus1;
        if (error == 0) {
            break;
        }
    }

    displayResults(resultados);
}

function evaluateFunction(func, x) {
    // Reemplazar '^' con '**' para el operador de exponenciación en JavaScript
    func = func.replace(/\^/g, '**');

    // Agregar un operador '*' entre una constante y 'x' si no está presente
    func = func.replace(/(\d)x/g, '$1*x');

    // Crear una función JavaScript dinámica a partir de la cadena de texto de la función proporcionada por el usuario
    let userFunction = new Function('x', 'return ' + func + ';');

    // Evaluar la función dinámica con el valor de x proporcionado
    return userFunction(x);

}

function displayResults(resultados) {
    let table = document.createElement('table');
    let tableHeader = '<tr><th>Iteración</th><th>xi-1</th><th>xi</th><th>xi+1</th><th>f(xi-1)</th><th>f(xi)</th><th>f(xi+1)</th><th>Error (%)</th></tr>';

    for (let i = 0; i < resultados.length; i++) {
        let row = '<tr>';
        for (let j = 0; j < resultados[i].length; j++) {
            row += '<td>' + resultados[i][j] + '</td>';
        }
        row += '</tr>';
        tableHeader += row;
    }

    table.innerHTML = tableHeader;
    document.getElementById('tableContainer').appendChild(table);
}