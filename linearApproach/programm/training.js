//read json from file
var fs = require('fs');
var json = JSON.parse(fs.readFileSync('data/xy.json', 'utf8'));

for (let set of json.data) {
    printArray(set.values)
    printStats(set)
}

function findStartPoint(array) {
    let startPoint = [];
    for (let line of array) {
        for (let i = line.length - 1; i >= 0; i--) {
            let value = line[i];
            if (value != 0) {
                startPoint.push(line.indexOf(value));
                startPoint.push(array.indexOf(line));
                return startPoint;
            }
        }
    }
}

function findEndPoint(array) {
    let endPoint = [];
    for (let i = array.length - 1; i >= 0; i--) {
        let line = array[i];
        for (let value of line) {
            if (value != 0) {
                endPoint.push(line.indexOf(value));
                endPoint.push(array.indexOf(line));
            }
        }
    }
    return endPoint;
}

function calculateSlope(array) {
    let startPoint = findStartPoint(array);
    let endPoint = findEndPoint(array);
    let slope = (endPoint[1] - startPoint[1]) / (endPoint[0] - startPoint[0]);
    return slope;
}


function linearRegression(inputArray) {

    let x = [];
    let y = [];

    for (let line of inputArray) {
        for (let value of line) {
            if (value != 0) {
                x.push(line.indexOf(value));
                y.push(inputArray.indexOf(line));
            }
        }
    }
    const sumX = x.reduce((prev, curr) => prev + curr, 0);
    const avgX = sumX / x.length;
    const xDifferencesToAverage = x.map((value) => avgX - value);
    const xDifferencesToAverageSquared = xDifferencesToAverage.map(
        (value) => value ** 2
    );
    const SSxx = xDifferencesToAverageSquared.reduce(
        (prev, curr) => prev + curr,
        0
    );
    const sumY = y.reduce((prev, curr) => prev + curr, 0);
    const avgY = sumY / y.length;
    const yDifferencesToAverage = y.map((value) => avgY - value);
    const xAndYDifferencesMultiplied = xDifferencesToAverage.map(
        (curr, index) => curr * yDifferencesToAverage[index]
    );
    const SSxy = xAndYDifferencesMultiplied.reduce(
        (prev, curr) => prev + curr,
        0
    );
    const slope = SSxy / SSxx;
    const intercept = avgY - slope * avgX;
    return [intercept, slope];
}



function printStats(array) {

    let simpleSlope = calculateSlope(array.values);
    let simpleAngle = Math.atan(simpleSlope) * 180 / Math.PI;
    let linReg = linearRegression(array.values);

    angle = Math.atan(linReg[1]) * 180 / Math.PI;

    console.log("--------------------Print Stats-----------------------");
    console.log(" ")
    console.log("Number of Lines: " + array.values.length);
    console.log("Number of Columns: " + array.values[0].length);
    console.log("Linear Regression: ");
    console.log("   Intercept " + linReg[0]);
    console.log("   Slope: " + linReg[1]) * -1;
    console.log("   Angle: " + angle * -1);
    console.log("Simple Approach: ");
    console.log("   Slope: " + simpleSlope * -1);
    console.log("   Angle: " + simpleAngle * -1);
    console.log(" ")
    console.log("Set Data Points: " + array.startPoint);
    console.log("Set Direction: " + array.startDir);
    console.log("Set Angle: " + (180 + array.startDir[0][0] * 180 / Math.PI));
    console.log("-------------------------------------------");
}







function printArray(array) {

    console.log("--------------------Print Array-----------------------");
    let lineOut = "";
    let index = 0;
    for (let line of array) {
        for (let value of line) {
            if (value == 0) {
                lineOut += " ";
            } else {
                lineOut += "#";
            }
        }
        console.log(lineOut);
        index++;
        lineOut = "";
    }
    console.log("-------------------------------------------");

}