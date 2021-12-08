fetch('https://adventofcode.com/2021/day/8/input').then(function (response) {
    return response.text();
}).then(function (text) {
    var startTime = new Date();
    var inputArray = text.split('\n');
    inputArray.pop();

    var answerOne = 0;
    for(var iRow = 0; iRow < inputArray.length; iRow++) {
        var thisRowSplit = inputArray[iRow].split(' | ');
        var thisRowOutputSplit = thisRowSplit[1].split(' ');
        for(var iRowOut = 0; iRowOut < thisRowOutputSplit.length; iRowOut++) {
            var thisRowOutput = thisRowOutputSplit[iRowOut];
            if(thisRowOutput.length == 2 || thisRowOutput.length == 3 || thisRowOutput.length == 4 || thisRowOutput.length == 7) {
                answerOne++;
            }
        }
    }


    var answerTwo = 0;
    for(var iRow = 0; iRow < inputArray.length; iRow++) {
        var thisRowSplit = inputArray[iRow].split(' | ');
        var thisRowInputSplit = thisRowSplit[0].split(' ');
        var thisRowOutputSplit = thisRowSplit[1].split(' ');
        thisRowOutputSplit = thisRowOutputSplit.map(a => a.split('').sort().join(''));
        thisRowInputSplit = thisRowInputSplit.sort((a, b) => a.length < b.length ? -1 : 1);
        thisRowInputSplit = thisRowInputSplit.map(a => a.split('').sort().join(''));

        var number1 = thisRowInputSplit[0];
        var number4 = thisRowInputSplit[2];
        var number7 = thisRowInputSplit[1];
        var number8 = thisRowInputSplit[9];

        var resultMap = {
            '1' : number1, 
            '4' : number4,
            '7' : number7, 
            '8' : number8
        };
        resultMap[number1] = '1';
        resultMap[number4] = '4';
        resultMap[number7] = '7';
        resultMap[number8] = '8';

        // 5 length = 2, 3, 5
        for(var i = 3; i <= 5; i++) {
            var thisInput = thisRowInputSplit[i];
            // 3 contains 1
            // 5 contains 3/4 of 4
            // 2 is the other
            var containsOne = true;
            for(var iOne = 0; iOne < resultMap['1'].length; iOne++) {
                if(thisInput.indexOf(resultMap['1'][iOne]) == -1) {
                    containsOne = false;
                    break;
                }
            }
            if(containsOne) {
                resultMap['3'] = thisInput;
                resultMap[thisInput] = '3';
            } else {
                var containsFourCount = 0;
                for(var iFour = 0; iFour < resultMap['4'].length; iFour++) {
                    if(thisInput.indexOf(resultMap['4'][iFour]) > -1) {
                        containsFourCount++;
                    }
                }
                if(containsFourCount == 3) {
                    resultMap['5'] = thisInput;
                    resultMap[thisInput] = '5';
                } else {
                    resultMap['2'] = thisInput;
                    resultMap[thisInput] = '2';
                }
            }
        }
        // 6 length = 0, 6, 9
        for(var i = 6; i <= 8; i++) {
            var thisInput = thisRowInputSplit[i];
            // 6 does not contain 1
            // 9 contains 5
            // 0 is the other
            var containsOne = true;
            for(var iOne = 0; iOne < resultMap['1'].length; iOne++) {
                if(thisInput.indexOf(resultMap['1'][iOne]) == -1) {
                    containsOne = false;
                    break;
                }
            }
            if(!containsOne) {
                resultMap['6'] = thisInput;
                resultMap[thisInput] = '6';
            } else {
                var containsFive = true;
                for(var iFive = 0; iFive < resultMap['5'].length; iFive++) {
                    if(thisInput.indexOf(resultMap['5'][iFive]) == -1) {
                        containsFive = false;
                        break;
                    }
                }
                if(containsFive) {
                    resultMap['9'] = thisInput;
                    resultMap[thisInput] = '9';
                } else {
                    resultMap['0'] = thisInput;
                    resultMap[thisInput] = '0';
                }
            }
        }
        
        var thisResult = '';
        for(var iOut = 0; iOut < thisRowOutputSplit.length; iOut++) {
            var thisDigit = thisRowOutputSplit[iOut];
            thisResult += resultMap[thisDigit];
        }
        answerTwo += (thisResult * 1);
    }



    
    console.log('Total Time: ' + (new Date() - startTime) + 'ms');
    console.log('Answer One: ' + answerOne);
    console.log('Answer Two: ' + answerTwo);
});
