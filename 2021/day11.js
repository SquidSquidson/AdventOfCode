fetch('https://adventofcode.com/2021/day/11/input').then(function (response) {
    return response.text();
}).then(function (text) {
    var startTime = new Date();
    var inputArray = text.split('\n');
    inputArray.pop();

    var inputArraySplit = inputArray.map(a => a.split(''));

    var answerTwo;
    var totalFlashers = 0;
    function nextSequencePartOne(previousSequence, currentStep) {
        var resultingState = JSON.parse(JSON.stringify(previousSequence));
        var foundFlasher = false;
        for(var iRow = 0; iRow < 10; iRow++) {
            for(var iColumn = 0; iColumn < 10; iColumn++) {
                resultingState[iRow][iColumn]++;
                if(resultingState[iRow][iColumn] > 9) {
                    foundFlasher = true;
                }
            }
        }
        
        var flashers = [];
        while(foundFlasher) {
            foundFlasher = false;
            var currentIncrements = [];
            for(var iRow = 0; iRow < 10; iRow++) {
                for(var iColumn = 0; iColumn < 10; iColumn++) {
                    var currentAtPosition = resultingState[iRow][iColumn];
                    var currentIndex = iRow + ',' + iColumn;
                    if(currentAtPosition > 9 && flashers.indexOf(currentIndex) == -1) {
                        foundFlasher = true;
                        flashers.push(currentIndex);
                        if(iRow > 0) {
                            currentIncrements.push([iRow - 1, iColumn]);
                            if(iColumn > 0) {
                                currentIncrements.push([iRow - 1, iColumn - 1]);
                            }
                            if(iColumn < 9) {
                                currentIncrements.push([iRow - 1, iColumn + 1]);
                            }
                        }
                        if(iRow < 9) {
                            currentIncrements.push([iRow + 1, iColumn]);
                            if(iColumn > 0) {
                                currentIncrements.push([iRow + 1, iColumn - 1]);
                            }
                            if(iColumn < 9) {
                                currentIncrements.push([iRow + 1, iColumn + 1]);
                            }
                        }
                        if(iColumn > 0) {
                            currentIncrements.push([iRow, iColumn - 1]);
                        }
                        if(iColumn < 9) {
                            currentIncrements.push([iRow, iColumn + 1]);
                        }
                    }
                }
            }
            for(var iInc = 0; iInc < currentIncrements.length; iInc++) {
                resultingState[currentIncrements[iInc][0]][currentIncrements[iInc][1]]++;
            }
        }
        
        for(var iRow = 0; iRow < 10; iRow++) {
            for(var iColumn = 0; iColumn < 10; iColumn++) {
                if(resultingState[iRow][iColumn] > 9) {
                    resultingState[iRow][iColumn] = 0;
                }
            }
        }
        
        if(flashers.length == 100 && !answerTwo) {
            answerTwo = currentStep + 1;
        }
        totalFlashers += flashers.length;
        return resultingState;
    }

    var previousState = inputArraySplit;
    for(var i = 0; i < 100; i++) {
        previousState = nextSequencePartOne(previousState, i);
    }
    var answerOne = totalFlashers;

    var answerTwoI = 0;
    var previousState = inputArraySplit;
    while(!answerTwo) {
        previousState = nextSequencePartOne(previousState, answerTwoI);
        answerTwoI++;
    }

    console.log('Total Time: ' + (new Date() - startTime) + 'ms');
    console.log('Answer One: ' + answerOne);
    console.log('Answer Two: ' + answerTwo);
});
