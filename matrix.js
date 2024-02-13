function generateMatrices() {
    createMatrix('The 1st Matrix', 'matrix1', document.getElementById('matrix1Rows').value, document.getElementById('matrix1Cols').value);
    createMatrix('The 2nd Matrix', 'matrix2', document.getElementById('matrix2Rows').value, document.getElementById('matrix2Cols').value);
}

const createMatrix = (title, containerId, rows, cols) => {
    let container = document.getElementById(containerId);
    container.innerHTML = '';
    let table = document.createElement('table');
    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            let input = document.createElement('input');
            input.type = 'number';
            input.value = Math.floor(Math.random() * 100);
            td.appendChild(input);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
};

const showResult = (title, containerId, rows, cols, dataArray) => {
    let container = document.getElementById(containerId);
    container.innerHTML = '';
    let table = document.createElement('table');

    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            let span = document.createElement('span');
            let index = i * cols + j;
            span.innerHTML = dataArray[index];
            td.appendChild(span);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
};

const showResult2D = (title, containerId, dataArray) => {
    let container = document.getElementById(containerId);
    container.innerHTML = '';
    let table = document.createElement('table');

    dataArray.forEach(row => {
        let tr = document.createElement('tr');
        row.forEach(val => {
            let td = document.createElement('td');
            td.textContent = val;
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });

    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
};

function performOperation(operation) {
    let matrix1 = getMatrixData2D('matrix1');
    let matrix2 = getMatrixData2D('matrix2');
    console.log("1st Matrix", matrix1);
    console.log("2nd Matrix", matrix2);

    let result;
    if (operation === 'add') {
        result = addMatrices(matrix1, matrix2);
    } else if (operation === 'subtract') {
        result = subtractMatrices(matrix1, matrix2);
    } else if (operation === 'multiply') {
        result = multiplyMatrices(matrix1, matrix2);
    } else {
        console.error("Unsupported operation");
        result = null;
    }

    if (result) {
        console.log(`Operation ${operation}`, result);
        showResult2D('The Result', 'matrix3', result);
    } else {
        console.error("Operation failed or the matrices were not of compatible dimensions.");
    }
}




const getMatrixData2D = function (matrixId) {
    let matrixData = [];
    let rows = parseInt(document.getElementById(matrixId + 'Rows').value, 10);
    let cols = parseInt(document.getElementById(matrixId + 'Cols').value, 10);
    let inputs = document.querySelectorAll(`#${matrixId} input`);
    for (let i = 0; i < rows; i++) {
        let rowData = [];
        for (let j = 0; j < cols; j++) {
            let index = i * cols + j;
            rowData.push(parseInt(inputs[index].value, 10));
        }
        matrixData.push(rowData);
    }
    return matrixData;
};

function addMatrices(matrix1, matrix2) {
    if (matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length) {
        console.error("Matrix dimensions do not match for addition.");
        return;
    }
    return matrix1.map((row, i) => row.map((val, j) => val + matrix2[i][j]));
}

const subtractMatrices = function (matrix1, matrix2) {
    if (matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length) {
        console.error("Matrix dimensions do not match for subtraction.");
        return;
    }
    return matrix1.map((row, i) => row.map((val, j) => val - matrix2[i][j]));
};

const multiplyMatrices = (matrix1, matrix2) => {
    if (matrix1[0].length !== matrix2.length) {
        console.error("Matrix dimensions do not match for multiplication.");
        return;
    }
    return matrix1.map(row => matrix2[0].map((_, colIndex) => row.reduce((sum, cell, rowIndex) => sum + cell * matrix2[rowIndex][colIndex], 0)));
};
