fetch('https://adventofcode.com/2021/day/14/input').then(function (response) {
    return response.text();
}).then(function (text) {
    var startTime = new Date();
    var inputArray = text.split('\n');
    inputArray.pop();

    var inputSequence = inputArray.shift();
    inputArray.shift();

    var productions = {};
    for(var iInput = 0; iInput < inputArray.length; iInput++) {
        var thisInputSplit = inputArray[iInput].split(' -> ');
        productions[thisInputSplit[0]] = thisInputSplit[1];
    }

    var previousResult = inputSequence;
    var nextResult;
    for(var iIteration = 0; iIteration < 10; iIteration++) {
        nextResult = previousResult[0];
        for(var iPosition = 1; iPosition < previousResult.length; iPosition++) {
            var thisTwoCharacters = previousResult[iPosition - 1] + '' + previousResult[iPosition];
            nextResult += productions[thisTwoCharacters];
            nextResult += previousResult[iPosition];
        }
        previousResult = nextResult;
    }
    
    var totals = {};
    for(var iChar = 0; iChar < nextResult.length; iChar++) {
        var thisChar = nextResult[iChar];
        totals[thisChar] = totals[thisChar] || 0;
        totals[thisChar]++;
    }
    
    var totalsKeys = Object.keys(totals);
    var maxCount;
    var minCount;
    for(var iTotal = 0; iTotal < totalsKeys.length; iTotal++) {
        var thisChar = totalsKeys[iTotal];
        var thisCharTotal = totals[thisChar];
        if(!maxCount) maxCount = thisCharTotal;
        if(!minCount) minCount = thisCharTotal;
        if(minCount > thisCharTotal) minCount = thisCharTotal;
        if(maxCount < thisCharTotal) maxCount = thisCharTotal;
    }
    var answerOne = maxCount - minCount;

    var previousResult = {};
    for(var iPosition = 1; iPosition < inputSequence.length; iPosition++) {
        var thisTwoCharacters = inputSequence[iPosition - 1] + '' + inputSequence[iPosition];
        previousResult[thisTwoCharacters] = previousResult[thisTwoCharacters] || 0;
        previousResult[thisTwoCharacters]++;
    }
    var runningCount = {};
    for(var iPosition = 0; iPosition < inputSequence.length; iPosition++) {
        runningCount[inputSequence[iPosition]] = runningCount[inputSequence[iPosition]] || 0;
        runningCount[inputSequence[iPosition]]++;
    }
    var nextResult;
    for(var iIteration = 0; iIteration < 40; iIteration++) {
        nextResult = {};
        var previousKeys = Object.keys(previousResult);
        for(var iPrev = 0; iPrev < previousKeys.length; iPrev++) {
            var thisKey = previousKeys[iPrev];
            var thisValue = previousResult[thisKey];
            var middleChar = productions[thisKey];
            nextResult[thisKey[0] + '' + middleChar] = nextResult[thisKey[0] + '' + middleChar] || 0;
            nextResult[thisKey[0] + '' + middleChar] += thisValue;
            nextResult[middleChar + '' + thisKey[1]] = nextResult[middleChar + '' + thisKey[1]] || 0;
            nextResult[middleChar + '' + thisKey[1]] += thisValue;
            runningCount[middleChar] = runningCount[middleChar] || 0;
            runningCount[middleChar] += thisValue;
        }
        previousResult = nextResult;
    }

    var runningCountKeys = Object.keys(runningCount);
    var maxCountTwo;
    var minCountTwo;
    for(var iTotal = 0; iTotal < runningCountKeys.length; iTotal++) {
        var thisChar = runningCountKeys[iTotal];
        var thisCharTotal = runningCount[thisChar];
        if(!maxCountTwo) maxCountTwo = thisCharTotal;
        if(!minCountTwo) minCountTwo = thisCharTotal;
        if(minCountTwo > thisCharTotal) minCountTwo = thisCharTotal;
        if(maxCountTwo < thisCharTotal) maxCountTwo = thisCharTotal;
    }
    var answerTwo = maxCountTwo - minCountTwo;

    
    console.log('Total Time: ' + (new Date() - startTime) + 'ms');
    console.log('Answer One: ' + answerOne);
    console.log('Answer Two: ' + answerTwo);
});
