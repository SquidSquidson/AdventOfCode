fetch('https://adventofcode.com/2021/day/9/input').then(function (response) {
    return response.text();
}).then(function (text) {
    var startTime = new Date();
    var inputArray = text.split('\n');
    inputArray.pop();

    var rowMax = inputArray.length - 1;
    var colMax = inputArray[0].length - 1;

    var answerOne = 0;
    var lowPoints = [];
    for(var iRow = 0; iRow < inputArray.length; iRow++) {
        for(var iColumn = 0; iColumn < inputArray[0].length; iColumn++) {
            var thisPoint = inputArray[iRow][iColumn] * 1;
            var pointInvalid = false;
            //look up
            if(iRow > 0) {
                var upPoint = inputArray[iRow - 1][iColumn] * 1;
                if(upPoint <= thisPoint) pointInvalid = true;
            }
            //look down
            if(!pointInvalid && iRow < rowMax) {
                var downPoint = inputArray[iRow + 1][iColumn] * 1;
                if(downPoint <= thisPoint) pointInvalid = true;
            }
            //look left
            if(!pointInvalid && iColumn > 0) {
                var leftPoint = inputArray[iRow][iColumn - 1] * 1;
                if(leftPoint <= thisPoint) pointInvalid = true;
            }
            //look right
            if(!pointInvalid && iColumn < colMax) {
                var rightPoint = inputArray[iRow][iColumn + 1] * 1;
                if(rightPoint <= thisPoint) pointInvalid = true;
            }
            if(!pointInvalid) {
                answerOne += (thisPoint + 1);
                lowPoints.push([iRow, iColumn, []]);
            }
        }
    }


    function findSurroundingUps(lowPoint, position) {
        var thisPositionNumber = inputArray[position[0]][position[1]] * 1;
        if(thisPositionNumber == 9) return;
        //look up
        if(position[0] > 0) {
            var upPoint = inputArray[position[0] - 1][position[1]] * 1;
            if(upPoint < 9 && upPoint > thisPositionNumber) {
                if(lowPoint[2].indexOf(JSON.stringify([position[0] - 1, position[1]])) == -1) {
                    lowPoint[2].push(JSON.stringify([position[0] - 1, position[1]]));
                }
                findSurroundingUps(lowPoint, [position[0] - 1, position[1]]);
            }
        }
        //look down
        if(position[0] < rowMax) {
            var downPoint = inputArray[position[0] + 1][position[1]] * 1;
            if(downPoint < 9 && downPoint > thisPositionNumber) {
                if(lowPoint[2].indexOf(JSON.stringify([position[0] + 1, position[1]])) == -1) {
                    lowPoint[2].push(JSON.stringify([position[0] + 1, position[1]]));
                }
                findSurroundingUps(lowPoint, [position[0] + 1, position[1]]);
            }
        }
        //look left
        if(position[1] > 0) {
            var leftPoint = inputArray[position[0]][position[1] - 1] * 1;
            if(leftPoint < 9 && leftPoint > thisPositionNumber) {
                if(lowPoint[2].indexOf(JSON.stringify([position[0], position[1] - 1])) == -1) {
                    lowPoint[2].push(JSON.stringify([position[0], position[1] - 1]));
                }
                findSurroundingUps(lowPoint, [position[0], position[1] - 1]);
            }
        }
        //look right
        if(position[1] < colMax) {
            var rightPoint = inputArray[position[0]][position[1] + 1] * 1;
            if(rightPoint < 9 && rightPoint > thisPositionNumber) {
                if(lowPoint[2].indexOf(JSON.stringify([position[0], position[1] + 1])) == -1) {
                    lowPoint[2].push(JSON.stringify([position[0], position[1] + 1]));
                }
                findSurroundingUps(lowPoint, [position[0], position[1] + 1]);
            }
        }
        return;
    }
    for(var iLows = 0; iLows < lowPoints.length; iLows++) {
        findSurroundingUps(lowPoints[iLows], [lowPoints[iLows][0], lowPoints[iLows][1]]);
    }
    lowPoints.sort((a,b) => a[2].length > b[2].length ? -1 : 1);
    var answerTwo = (lowPoints[0][2].length + 1) * (lowPoints[1][2].length + 1) * (lowPoints[2][2].length + 1);

    
    console.log('Total Time: ' + (new Date() - startTime) + 'ms');
    console.log('Answer One: ' + answerOne);
    console.log('Answer Two: ' + answerTwo);
});

