fetch('https://adventofcode.com/2021/day/15/input').then(function (response) {
    return response.text();
}).then(function (text) {
    var startTime = new Date();
    var inputArray = text.split('\n');
    inputArray.pop();

    var inputArraySS = [
        '1163751742',
        '1381373672',
        '2136511328',
        '3694931569',
        '7463417111',
        '1319128137',
        '1359912421',
        '3125421639',
        '1293138521',
        '2311944581'
    ];

    var cachedResultsCount = [[0]];
    for(var i = 1; i < inputArray.length; i++) {
        for(var iX = 0; iX < i; iX++) {
            if(!cachedResultsCount[i]) cachedResultsCount[i] = [];
            if(iX == 0) {
                cachedResultsCount[i][iX] = cachedResultsCount[i - 1][iX] + (inputArray[i][iX] * 1);
            } else {
                var leftNumber = cachedResultsCount[i][iX - 1];
                var topNumber = cachedResultsCount[i - 1][iX];
                cachedResultsCount[i][iX] = Math.min(leftNumber, topNumber) + (inputArray[i][iX] * 1);
            }
        }
        for(var iY = 0; iY < i; iY++) {
            if(!cachedResultsCount[iY]) cachedResultsCount[iY] = [];
            if(iY == 0) {
                cachedResultsCount[iY][i] = cachedResultsCount[iY][i - 1] + (inputArray[iY][i] * 1);
            } else {
                var leftNumber = cachedResultsCount[iY][i - 1];
                var topNumber = cachedResultsCount[iY - 1][i];
                cachedResultsCount[iY][i] = Math.min(leftNumber, topNumber) + (inputArray[iY][i] * 1);
            }
        }
        var leftNumber = cachedResultsCount[i][i - 1];
        var topNumber = cachedResultsCount[i - 1][i];
        cachedResultsCount[i][i] = Math.min(leftNumber, topNumber) + (inputArray[i][i] * 1);
    }

    var answerOne = cachedResultsCount[inputArray.length - 1][inputArray.length - 1];


    var newInputArray = JSON.parse(JSON.stringify(inputArray));
    for(var iRow = 0; iRow < newInputArray.length; iRow++) {
        var thisRow = newInputArray[iRow].split('').map(a => a * 1);
        var newRow = JSON.parse(JSON.stringify(newInputArray[iRow]));
        for(var iMult = 0; iMult < 4; iMult++) {
            var plusRow = thisRow.map(a => a == 9 ? 1 : a + 1);
            for(var jMult = 0; jMult < iMult; jMult++) {
                plusRow = plusRow.map(a => a == 9 ? 1 : a + 1);
            }
            newRow += plusRow.join('');
        }
        newInputArray[iRow] = newRow;
    }
    var newInputArrayLength = newInputArray.length;
    for(var iMult = 0; iMult < 4; iMult++) {
        var rowsToDupe = newInputArray.slice(-1 * newInputArrayLength);
        for(var iRow = 0; iRow < rowsToDupe.length; iRow++) {
            var thisRow = rowsToDupe[iRow].split('').map(a => a * 1);
            var newRow = thisRow.map(a => a == 9 ? 1 : a + 1);
            newInputArray.push(newRow.join(''));
        }
    }


    var cachedResultsCount = [[0]];
    cachedResultsCount[newInputArray.length - 1] = [];
    var cachedResultsDone = [[true]];
    cachedResultsDone[newInputArray.length - 1] = [];
    var current = [0,0]; //y,x
    function setCurrentToLowestIncomplete(){
        var foundMin;
        var foundMinCurrent;
        for(var iY = 0; iY < newInputArray.length; iY++) {
            for(var iX = 0; iX < newInputArray.length; iX++) {
                var cachedCount = (cachedResultsCount[iY] || [])[iX];
                var cachedDone = (cachedResultsDone[iY] || [])[iX];
                if(cachedCount) {
                    if(!cachedDone && !foundMin) {
                        foundMin = cachedCount;
                        foundMinCurrent = [iY,iX];
                    }
                    if(!cachedDone && cachedCount < foundMin) {
                        foundMin = cachedCount;
                        foundMinCurrent = [iY,iX];
                    }
                }
            }
        }
        current = foundMinCurrent;
    }
    var maxIterations = 999999999;
    while(!cachedResultsDone[newInputArray.length - 1][newInputArray.length - 1] && maxIterations > 0) {
        if(current[0] < newInputArray.length - 1) {
            if(!cachedResultsCount[current[0] + 1]) cachedResultsCount[current[0] + 1] = [];
            if(!cachedResultsDone[current[0] + 1]) cachedResultsDone[current[0] + 1] = [];
        }
        maxIterations--;
        var currentCount = cachedResultsCount[current[0]][current[1]];
        cachedResultsDone[current[0]][current[1]] = true;


        if(current[0] > 0) {
            //up
            if(!cachedResultsDone[current[0] - 1][current[1]]) {
                var potentialUp = currentCount + (newInputArray[current[0] - 1][current[1]] * 1);
                if(!cachedResultsCount[current[0] - 1][current[1]] || cachedResultsCount[current[0] - 1][current[1]] > potentialUp) {
                    cachedResultsCount[current[0] - 1][current[1]] = potentialUp;
                }
            }
        }
        if(current[0] < (newInputArray.length - 1)) {
            //down
            if(!cachedResultsDone[current[0] + 1][current[1]]) {
                var potentialDown = currentCount + (newInputArray[current[0] + 1][current[1]] * 1);
                if(!cachedResultsCount[current[0] + 1][current[1]] || cachedResultsCount[current[0] + 1][current[1]] > potentialDown) {
                    cachedResultsCount[current[0] + 1][current[1]] = potentialDown;
                }
            }
        }
        if(current[1] > 0) {
            //left
            if(!cachedResultsDone[current[0]][current[1] - 1]) {
                var potentialLeft = currentCount + (newInputArray[current[0]][current[1] - 1] * 1);
                if(!cachedResultsCount[current[0]][current[1] - 1] || cachedResultsCount[current[0]][current[1] - 1] > potentialLeft) {
                    cachedResultsCount[current[0]][current[1] - 1] = potentialLeft;
                }
            }
        }
        if(current[1] < (newInputArray.length - 1)) {
            //right
            if(!cachedResultsDone[current[0]][current[1] + 1]) {
                var potentialRight = currentCount + (newInputArray[current[0]][current[1] + 1] * 1);
                if(!cachedResultsCount[current[0]][current[1] + 1] || cachedResultsCount[current[0]][current[1] + 1] > potentialRight) {
                    cachedResultsCount[current[0]][current[1] + 1] = potentialRight;
                }
            }
        }
        setCurrentToLowestIncomplete();
    }

    var answerTwo = cachedResultsCount[newInputArray.length - 1][newInputArray.length - 1];

    
    console.log('Total Time: ' + (new Date() - startTime) + 'ms');
    console.log('Answer One: ' + answerOne);
    console.log('Answer Two: ' + answerTwo);
});
