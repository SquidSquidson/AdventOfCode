fetch('https://adventofcode.com/2022/day/2/input').then(function (response) {
    return response.text();
}).then(function (text) {
    var startTime = new Date();
    var inputArray = text.split('\n');
    inputArray.pop();

    var winnerOne = {
        A: {
            X:3,
            Y:6,
            Z:0
        },
        B: {
            X:0,
            Y:3,
            Z:6
        },
        C: {
            X:6,
            Y:0,
            Z:3
        }
    };
    var scoresOne = {
        X:1,
        Y:2,
        Z:3
    };

    var answerOne = 0;
    for(var iInput = 0; iInput < inputArray.length; iInput++) {
        var thisInputSplit = inputArray[iInput].split(' ');
        answerOne += winnerOne[thisInputSplit[0]][thisInputSplit[1]];
        answerOne += scoresOne[thisInputSplit[1]];
    }

    var scoresTwo = {
        A: {
            X:3,
            Y:1,
            Z:2
        },
        B: {
            X:1,
            Y:2,
            Z:3
        },
        C: {
            X:2,
            Y:3,
            Z:1
        }
    };
    var winnerTwo = {
        X:0,
        Y:3,
        Z:6
    };
    var answerTwo = 0;
    for(var iInput = 0; iInput < inputArray.length; iInput++) {
        var thisInputSplit = inputArray[iInput].split(' ');
        answerTwo += scoresTwo[thisInputSplit[0]][thisInputSplit[1]];
        answerTwo += winnerTwo[thisInputSplit[1]];
    }

    
    console.log('Total Time: ' + (new Date() - startTime) + 'ms');
    console.log('Answer One: ' + answerOne);
    console.log('Answer Two: ' + answerTwo);
});
