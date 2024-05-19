function displayFunction() {
    let input = document.getElementById('myInput').value;
    let display = document.getElementById('display');



    // Formato de la function en un string LaTeX
    let latexFunction = '\\(' + input.replace(/\*/g, '\\cdot').replace(/e/g, 'e') + '\\)';


    // String LaTeX  para mostrar en el display
    display.innerHTML = 'Funcion: ' + latexFunction

    // convierte LaTeX en MathJax
    MathJax.typeset();
}


function fixedPointMethod() {
    document.getElementById('tableContainer').innerHTML = '';
    let input = document.getElementById('myInput').value;
    let x0 = parseFloat(document.getElementById('x0').value);
    let resultados = [];
    const iteraciones = 15;
    
    let g = function(x) {
        return Math.cbrt(10*x + 5);
    };

    for (let i = 0; i < iteraciones; i++) {
        let xiPlus1 = g(x0);
        let error = Math.abs((xiPlus1 - x0) / xiPlus1) * 100;

        resultados.push([i + 1, x0, xiPlus1, error]);

        x0 = xiPlus1;
        if (error == 0) {
            break;
        }
    }
    displayResults(resultados);

}



function displayResults(resultados) {
    let table = document.createElement('table');
    let tableHeader = '<tr><th>Iteración</th><th>x0</th><th>xi+1</th><th>Error (%)</th></tr>';

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