fetch('https://adventofcode.com/2022/day/6/input').then(function (response) {
    return response.text();
}).then(function (text) {
    var startTime = new Date();
    var inputArray = text.split('\n');
    inputArray.pop();

    var inputString = inputArray[0];
    
    var answerOne = 0;
    for(var iChar = 0; iChar < inputString.length; iChar++) {
        var charactersInQuestionSplit = inputString.substring(iChar, iChar + 4).split('');
        if(new Set(charactersInQuestionSplit).size == charactersInQuestionSplit.length) {
            answerOne = iChar + 4;
            break;
        }
    }

    var answerTwo = 0;
    for(var iChar = 0; iChar < inputString.length; iChar++) {
        var charactersInQuestionSplit = inputString.substring(iChar, iChar + 14).split('');
        if(new Set(charactersInQuestionSplit).size == charactersInQuestionSplit.length) {
            answerTwo = iChar + 14;
            break;
        }
    }
    
    console.log('Total Time: ' + (new Date() - startTime) + 'ms');
    console.log('Answer One: ' + answerOne);
    console.log('Answer Two: ' + answerTwo);
});
