fetch('https://adventofcode.com/2021/day/10/input').then(function (response) {
    return response.text();
}).then(function (text) {
    var startTime = new Date();
    var inputArray = text.split('\n');
    inputArray.pop();

    var opens = ['(', '[', '{', '<'];
    var closes = [')', ']', '}', '>'];
    var invalids = [];
    var incompletes = [];
    var incompletesExpected = [];
    var invalidCounts = {')':0, ']':0, '}':0, '>':0};

    for(var iRow = 0; iRow < inputArray.length; iRow++) {
        var thisRow = inputArray[iRow];
        var expectedCloses = [];
        var isInvalid = false;
        for(var iColumn = 0; iColumn < thisRow.length; iColumn++) {
            var thisCharacter = thisRow[iColumn];
            if(opens.indexOf(thisCharacter) > -1) {
                expectedCloses.push(closes[opens.indexOf(thisCharacter)]);
            } else {
                if(expectedCloses.length == 0) {
                    invalids.push(iRow);
                    isInvalid = true;
                    invalidCounts[thisCharacter]++;
                    break;
                }
                var lastExpectedCLose = expectedCloses[expectedCloses.length - 1];
                if(thisCharacter == lastExpectedCLose) {
                    expectedCloses.pop();
                } else {
                    invalids.push(iRow);
                    isInvalid = true;
                    invalidCounts[thisCharacter]++;
                    break;
                }
            }
        }
        if(!isInvalid) {
            incompletes.push(iRow);
            incompletesExpected.push(expectedCloses);
        }
    }
    var answerOne = invalidCounts[')'] * 3 + invalidCounts[']'] * 57 + invalidCounts['}'] * 1197 + invalidCounts['>'] * 25137;

    var answerTwoScores = {')':1, ']':2, '}':3, '>':4};
    var incompleteScores = [];
    for(var iIncomplete = 0; iIncomplete < incompletesExpected.length; iIncomplete++) {
        var currentScore = 0;
        var currentIncompletesExpected = incompletesExpected[iIncomplete];
        for(var iChar = currentIncompletesExpected.length - 1; iChar >= 0 ; iChar--) {
            currentScore = currentScore * 5;
            currentScore += answerTwoScores[currentIncompletesExpected[iChar]];
        }
        incompleteScores.push(currentScore);
    }
    incompleteScores.sort((a,b) => a < b ? -1 : 1);
    var answerTwo = incompleteScores[Math.floor(incompleteScores.length / 2)];

    
    console.log('Total Time: ' + (new Date() - startTime) + 'ms');
    console.log('Answer One: ' + answerOne);
    console.log('Answer Two: ' + answerTwo);
});
