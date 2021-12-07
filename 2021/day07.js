fetch('https://adventofcode.com/2021/day/7/input').then(function (response) {
    return response.text();
}).then(function (text) {
    var startTime = new Date();
    var inputArray = text.split('\n');
    inputArray.pop();

    var positions = inputArray[0].split(',');
    positions = positions.map(a => a*1);
    positions.sort();
    var minPosition = positions[0];
    var maxPosition = positions[positions.length - 1];

    var answerOne;
    for(var iPosition = minPosition; iPosition < maxPosition; iPosition++) {
        var result = positions.map(a => a < iPosition ? iPosition - a : a - iPosition)
                              .reduce(( previousValue, currentValue ) => previousValue + currentValue, 0);
        if(!answerOne) answerOne = result;
        if(answerOne > result) answerOne = result;
    }

    var answerTwo;
    function getGas(crab, position) {
        var distance = crab < position ? position - crab : crab - position;
        return (distance * (distance + 1)) / 2;
    };
    for(var iPosition = minPosition; iPosition < maxPosition; iPosition++) {
        var result = positions.map(function(crab){return getGas(crab, iPosition)})
                              .reduce(( previousValue, currentValue ) => previousValue + currentValue, 0);
        if(!answerTwo) answerTwo = result;
        if(answerTwo > result) answerTwo = result;
    }


    
    console.log('Total Time: ' + (new Date() - startTime) + 'ms');
    console.log('Answer One: ' + answerOne);
    console.log('Answer Two: ' + answerTwo);
});
