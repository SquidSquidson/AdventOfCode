fetch('https://adventofcode.com/2021/day/3/input').then(function (response) {
    return response.text();
}).then(function (text) {
    var startTime = new Date();
    var inputArray = text.split('\n');
    inputArray.pop();

    var columnPositionFrequency = {};
    for(var iColumn = 0; iColumn < inputArray[0].length; iColumn++) {
        columnPositionFrequency[iColumn] = {'0':0,'1':0};
    }
    for(var iRow = 0; iRow < inputArray.length; iRow++) {
        var thisRow = inputArray[iRow];
        for(var iColumn = 0; iColumn < thisRow.length; iColumn++) {
            var thisBit = thisRow[iColumn];
            columnPositionFrequency[iColumn][thisBit]++;
        }
    }
    var mostCommonSequence = '';
    var leastCommonSequence = '';
    for(var iColumn = 0; iColumn < inputArray[0].length; iColumn++) {
        var numberZero = columnPositionFrequency[iColumn]['0'];
        var numberOne = columnPositionFrequency[iColumn]['1'];
        if(numberZero > numberOne) {
            mostCommonSequence += '0';
            leastCommonSequence += '1';
        } else {
            mostCommonSequence += '1';
            leastCommonSequence += '0';
        }
    }
    var answerOne = parseInt(mostCommonSequence, 2) * parseInt(leastCommonSequence, 2);


    var countMapTwo = {};
    var startsZero = inputArray.filter(row => row[0] == '0');
    var startsOne = inputArray.filter(row => row[0] == '1');
    if(columnPositionFrequency[0][1] >= columnPositionFrequency[0][0]) {
        countMapTwo['most0'] = startsOne;
        countMapTwo['least0'] = startsZero;
    } else {
        countMapTwo['most0'] = startsZero;
        countMapTwo['least0'] = startsOne;
    }
    var mostPreviousResult = '';
    var leastPreviousResult = '';
    for(var iColumn = 1; iColumn < (inputArray[0].length + 1); iColumn++) {
        var mostPrevious = countMapTwo['most' + (iColumn - 1)];
        if(mostPrevious && mostPrevious.length > 1) {
            var mostPreviousZero = mostPrevious.filter(row => row[iColumn] == '0');
            var mostPreviousOne = mostPrevious.filter(row => row[iColumn] == '1');
            if(mostPreviousOne.length >= mostPreviousZero.length) {
                countMapTwo['most' + iColumn] = mostPreviousOne;
            } else {
                countMapTwo['most' + iColumn] = mostPreviousZero;
            }
        } else {
            if(!mostPreviousResult) {
                mostPreviousResult = mostPrevious[0];
            }
        }


        var leastPrevious = countMapTwo['least' + (iColumn - 1)];
        if(leastPrevious && leastPrevious.length > 1) {
            var leastPreviousZero = leastPrevious.filter(row => row[iColumn] == '0');
            var leastPreviousOne = leastPrevious.filter(row => row[iColumn] == '1');
            if(leastPreviousOne.length >= leastPreviousZero.length) {
                countMapTwo['least' + iColumn] = leastPreviousZero;
            } else {
                countMapTwo['least' + iColumn] = leastPreviousOne;
            }
        } else {
            if(!leastPreviousResult) {
                leastPreviousResult = leastPrevious[0];
            }
        }
    }
    var answerTwo = parseInt(mostPreviousResult, 2) * parseInt(leastPreviousResult, 2);
    
    console.log('Total Time: ' + (new Date() - startTime) + 'ms');
    console.log('Answer One: ' + answerOne);
    console.log('Answer Two: ' + answerTwo);
});
