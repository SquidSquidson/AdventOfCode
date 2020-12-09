fetch('https://adventofcode.com/2020/day/9/input').then(function (response) {
    return response.text();
}).then(function (text) {
    var startTime = new Date();
    var inputRows = text.split('\n');

    var numbers = [];
    for(var iNumber = 1; iNumber < inputRows.length; iNumber++){
        var thisNumber = inputRows[iNumber-1];
        numbers.push(thisNumber * 1);
    }

    var pageSize = 25;
    var breakingNumber;
    for(var iNext = pageSize; iNext < numbers.length; iNext++){
        var thisNumber = numbers[iNext];
        var previousNumbers = numbers.slice(iNext - pageSize, iNext);
        previousNumbers.sort(function(a, b) {
            return a - b;
        });
        for(var iPrev = 0; iPrev < previousNumbers.length; iPrev++){
            var thisPrev = previousNumbers[iPrev];
            if(previousNumbers.indexOf(thisNumber - thisPrev) > -1){
                break;
            }
            if(thisPrev > thisNumber || iPrev == (previousNumbers.length - 1)){
                breakingNumber = thisNumber;
                iNext = numbers.length;
                break;
            }
        }
    }
    console.log('Star One: ' + breakingNumber);

    var foundNumberStartIndex;
    var foundNumberEndIndex;
    for(iStart = 0; iStart < numbers.length; iStart++){
        var thisStart = numbers[iStart];
        var runningTotal = thisStart;
        for(var iRun = iStart + 1; iRun < numbers.length; iRun++){
            var thisRun = numbers[iRun];
            runningTotal += thisRun;
            if(runningTotal > breakingNumber){
                break;
            }
            if(runningTotal == breakingNumber){
                foundNumberStartIndex = iStart;
                foundNumberEndIndex = iRun;
                break;
            }
        }
    }
    var numberRangeForStarTwo = numbers.slice(foundNumberStartIndex, foundNumberEndIndex + 1);
    numberRangeForStarTwo.sort(function(a, b) {
        return a - b;
    });
    console.log('Star Two: ' + (numberRangeForStarTwo[0] + numberRangeForStarTwo[numberRangeForStarTwo.length - 1]));

    console.log('Total Time: ' + (new Date() - startTime) + 'ms');
});
