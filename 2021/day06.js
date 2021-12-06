fetch('https://adventofcode.com/2021/day/6/input').then(function (response) {
    return response.text();
}).then(function (text) {
    var startTime = new Date();
    var inputArray = text.split('\n');
    inputArray.pop();

    var simulateOneStart = inputArray[0].split(',').join('');
    var currentStatus = simulateOneStart;
    for(var iDay = 0; iDay < 80; iDay++) {
        currentStatus = doIteration(currentStatus);
    }
    var answerOne = currentStatus.length;

    var resultMapEight = {}
    for(var iStart = 0; iStart < 9; iStart++) {
        var currentStatus = '' + iStart;
        for(var iDay = 0; iDay < 8; iDay++) {
            currentStatus = doIteration(currentStatus);
        }
        resultMapEight[iStart] = currentStatus;
    }
    var resultMapSixteen = doubleUpResult(resultMapEight);
    var resultMapThirtyTwo = doubleUpResult(resultMapSixteen);
    var resultMapSixtyFour = doubleUpResult(resultMapThirtyTwo);
    var resultMapOneTwentyEight = doubleUpResult(resultMapSixtyFour);
    var resultMapTwoFiftySix = doubleUpResult(resultMapOneTwentyEight, true);

    var answerTwo = 0;
    for(var iFinal = 0; iFinal < simulateOneStart.length; iFinal++) {
        answerTwo += (resultMapTwoFiftySix[simulateOneStart[iFinal]] * 1);
    }

    
    console.log('Total Time: ' + (new Date() - startTime) + 'ms');
    console.log('Answer One: ' + answerOne);
    console.log('Answer Two: ' + answerTwo);
});

function doubleUpResult(inputMap, lengthOnly) {
    var outputMap = {};
    for(var iStart = 0; iStart < 9; iStart++) {
        var thisInput = inputMap[iStart];
        var thisOutput = '';
        if(lengthOnly) {
            thisOutput = 0;
        }
        for(var iChar = 0; iChar < thisInput.length; iChar++) {
            if(lengthOnly) {
                thisOutput += inputMap[thisInput[iChar]].length;
            } else {
                thisOutput += inputMap[thisInput[iChar]];
            }
        }
        outputMap[iStart] = thisOutput;
    }
    return outputMap;
}

function doIteration(inputString) {
    var returnString = '';
    var newFish = '';
    for(var iInput = 0; iInput < inputString.length; iInput++) {
        var thisCharacter = inputString[iInput] * 1;
        if(thisCharacter == 0) {
            returnString += '6';
            newFish += '8';
        } else {
            returnString += '' + (thisCharacter - 1);
        }
    }
    return returnString + '' + newFish;
}