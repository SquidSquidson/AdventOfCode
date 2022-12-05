fetch('https://adventofcode.com/2022/day/3/input').then(function (response) {
    return response.text();
}).then(function (text) {
    var startTime = new Date();
    var inputArray = text.split('\n');
    inputArray.pop();

    var scoreString = '-abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    var answerOne = 0;
    for(var iInput = 0; iInput < inputArray.length; iInput++) {
        var thisInput = inputArray[iInput];
        var thisInputOne = thisInput.substring(0, thisInput.length / 2).split('');
        var thisInputTwo = thisInput.substring(thisInput.length / 2).split('');
        var commonChar = thisInputOne.filter(value => thisInputTwo.includes(value))[0];
        answerOne += scoreString.indexOf(commonChar);
    }

    var answerTwo = 0;
    for(var iInput = 0; iInput < inputArray.length; iInput = iInput + 3) {
        var thisInputOne = inputArray[iInput].split('');
        var thisInputTwo = inputArray[iInput + 1].split('');
        var thisInputThree = inputArray[iInput + 2].split('');
        var firstCommonChars = thisInputOne.filter(value => thisInputTwo.includes(value));
        var secondCommonChars = firstCommonChars.filter(value => thisInputThree.includes(value));
        answerTwo += scoreString.indexOf(secondCommonChars[0]);
    }

    console.log('Total Time: ' + (new Date() - startTime) + 'ms');
    console.log('Answer One: ' + answerOne);
    console.log('Answer Two: ' + answerTwo);
});
