//read json from file
var fs = require('fs');
var json = JSON.parse(fs.readFileSync('data/xy.json', 'utf8'));

for (let set of json.data) {
    printArray(set.values)
    printStats(set)
}


function linearFit(array) {
    //The function returns an array of size 3. The first element is the intercept, the second element is the slope and the third element is the correlation coefficient.

    let x = [];
    let y = [];
    let x2 = [];
    let y2 = [];
    let xy = [];
    let n = 0;
    let sumX = 0;
    let sumY = 0;
    let sumX2 = 0;
    let sumY2 = 0;
    let sumXY = 0;
    let a = 0;
    let b = 0;
    let r = 0;

    for (let line of array) {
        for (let value of line) {
            if (value != 0) {
                x.push(line.indexOf(value));
                y.push(array.indexOf(line));
            }
        }
    }

    n = x.length;

    for (let i = 0; i < n; i++) {
        x2.push(x[i] * x[i]);
        y2.push(y[i] * y[i]);
        xy.push(x[i] * y[i]);
    }

    for (let i = 0; i < n; i++) {
        sumX += x[i];
        sumY += y[i];
        sumX2 += x2[i];
        sumY2 += y2[i];
        sumXY += xy[i];
    }

    a = (sumY * sumX2 - sumX * sumXY) / (n * sumX2 - sumX * sumX);
    b = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    r = (n * sumXY - sumX * sumY) / Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

    return [a, b, r];
}



function printStats(array) {
    let linReg = linearFit(array.values)

    angle = Math.atan(linReg[1]) * 180 / Math.PI;

    console.log("--------------------Print Stats-----------------------");
    console.log(" ")
    console.log("Number of Lines: " + array.values.length);
    console.log("Number of Columns: " + array.values[0].length);
    console.log("Linear Regression: ");
    console.log("Intercept " + linReg[0]);
    console.log("Slope: " + linReg[1]);
    console.log("Error: " + linReg[2]);
    console.log("Angle: " + angle);
    console.log(" ")
    console.log("Set Data Points: " + array.startPoint);
    console.log("Set Direction: " + array.startDir);
    console.log("Set Angle: " + Math.atan(array.startDir[0] / array.startDir[1]) * 180 / Math.PI);
    console.log("-------------------------------------------");
}







function printArray(array) {

    console.log("--------------------Print Array-----------------------");
    console.log(" ")

    let lineOut = "";
    for (let line of array) {
        for (let value of line) {
            if (value == 0) {
                lineOut += " ";
            } else {
                lineOut += "#";
            }
        }
        console.log(lineOut);
        lineOut = "";
    }
    console.log(" ")
    console.log("-------------------------------------------");

}