fetch('https://adventofcode.com/2022/day/8/input').then(function (response) {
    return response.text();
}).then(function (text) {
    var startTime = new Date();
    var inputArray = text.split('\n');
    inputArray.pop();

    var shownTrees = [];
    for(var iRow = 0; iRow < inputArray.length; iRow++) {
        shownTrees.push([]);
        var thisRow = inputArray[iRow];
        var highestTree = -1;
        for(var iColumn = 0; iColumn < thisRow.length; iColumn++) {
            var thisTree = Number(thisRow[iColumn]);
            if(thisTree > highestTree) {
                shownTrees[iRow][iColumn] = true;
            }
            highestTree = Math.max(highestTree, thisTree);
        }
        highestTree = -1;
        for(var iColumn = thisRow.length - 1; iColumn >= 0; iColumn--) {
            var thisTree = Number(thisRow[iColumn]);
            if(thisTree > highestTree) {
                shownTrees[iRow][iColumn] = true;
            }
            highestTree = Math.max(highestTree, thisTree);
        }
    }
    for(var iColumn = 0; iColumn < inputArray[0].length; iColumn++) {
        var highestTree = -1;
        for(var iRow = 0; iRow < inputArray.length; iRow++) {
            var thisTree = Number(inputArray[iRow][iColumn]);
            if(thisTree > highestTree) {
                shownTrees[iRow][iColumn] = true;
            }
            highestTree = Math.max(highestTree, thisTree);
        }
        highestTree = -1;
        for(var iRow = inputArray.length - 1; iRow >= 0; iRow--) {
            var thisTree = Number(inputArray[iRow][iColumn]);
            if(thisTree > highestTree) {
                shownTrees[iRow][iColumn] = true;
            }
            highestTree = Math.max(highestTree, thisTree);
        }
    }

    var answerOne = 0;
    for(var iRow = 0; iRow < inputArray.length; iRow++) {
        for(var iColumn = 0; iColumn < inputArray[0].length; iColumn++) {
            if(shownTrees[iRow][iColumn]) {
                answerOne++;
            }
        }
    }

    var answerTwo = 0;
    for(var iRow = 1; iRow < inputArray.length - 1; iRow++) {
        for(var iColumn = 1; iColumn < inputArray[0].length - 1; iColumn++) {
            var thisPoint = Number(inputArray[iRow][iColumn]);
            var distanceLeft = 0;
            for(var jColumn = iColumn - 1; jColumn >= 0; jColumn--) {
                distanceLeft++;
                if(Number(inputArray[iRow][jColumn]) >= thisPoint) {
                    break;
                }
            }
            var distanceRight = 0;
            for(var jColumn = iColumn + 1; jColumn < inputArray[0].length; jColumn++) {
                distanceRight++;
                if(Number(inputArray[iRow][jColumn]) >= thisPoint) {
                    break;
                }
            }
            var distanceUp = 0;
            for(var jRow = iRow - 1; jRow >= 0; jRow--) {
                distanceUp++;
                if(Number(inputArray[jRow][iColumn]) >= thisPoint) {
                    break;
                }
            }
            var distanceDown = 0;
            for(var jRow = iRow + 1; jRow < inputArray[0].length; jRow++) {
                distanceDown++;
                if(Number(inputArray[jRow][iColumn]) >= thisPoint) {
                    break;
                }
            }
            var thisPointScore = distanceLeft * distanceRight * distanceUp * distanceDown;
            if(thisPointScore > answerTwo) {
                answerTwo = thisPointScore;
            }
        }
    }

    console.log('Total Time: ' + (new Date() - startTime) + 'ms');
    console.log('Answer One: ' + answerOne);
    console.log('Answer Two: ' + answerTwo);
});
