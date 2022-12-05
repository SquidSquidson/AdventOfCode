fetch('https://adventofcode.com/2022/day/4/input').then(function (response) {
    return response.text();
}).then(function (text) {
    var startTime = new Date();
    var inputArray = text.split('\n');
    inputArray.pop();

    var answerOne = 0;
    inputArray.forEach(inputRow => {
        var inputRowSplit = inputRow.split(',');
        var inputRowCoords = inputRowSplit.map(coord => coord.split('-').map(a => Number(a)));
        if((inputRowCoords[0][0] <= inputRowCoords[1][0] && inputRowCoords[0][1] >= inputRowCoords[1][1]) || (inputRowCoords[1][0] <= inputRowCoords[0][0] && inputRowCoords[1][1] >= inputRowCoords[0][1])) {
            answerOne++;
        }
    });

    var answerTwo = 0;
    inputArray.forEach(inputRow => {
        var inputRowSplit = inputRow.split(',');
        var inputRowCoords = inputRowSplit.map(coord => coord.split('-').map(a => Number(a)));
        if((inputRowCoords[0][0] >= inputRowCoords[1][0] && inputRowCoords[0][0] <= inputRowCoords[1][1])
            || (inputRowCoords[0][1] >= inputRowCoords[1][0] && inputRowCoords[0][1] <= inputRowCoords[1][1])
            || (inputRowCoords[1][0] >= inputRowCoords[0][0] && inputRowCoords[1][0] <= inputRowCoords[0][1])
            || (inputRowCoords[1][1] >= inputRowCoords[0][0] && inputRowCoords[1][1] <= inputRowCoords[0][1])) {
            answerTwo++;
        }
    });

    
    console.log('Total Time: ' + (new Date() - startTime) + 'ms');
    console.log('Answer One: ' + answerOne);
    console.log('Answer Two: ' + answerTwo);
});
