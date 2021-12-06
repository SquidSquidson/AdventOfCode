fetch('https://adventofcode.com/2021/day/1/input').then(function (response) {
    return response.text();
}).then(function (text) {
    var startTime = new Date();
    var numberArray = text.split('\n');
    numberArray.pop();
    var numberIncreasing = 0;
    for(var iNumber = 1; iNumber < numberArray.length; iNumber++){
        var previousNumber = numberArray[iNumber - 1] * 1;
        var thisNumber = numberArray[iNumber] * 1;
        if(previousNumber < thisNumber) {
            numberIncreasing++;
        }
    }
    var windowIncreasing = 0;
    for(var iNumber = 3; iNumber < numberArray.length; iNumber++){
        var previousWindow = numberArray[iNumber - 3]*1 + numberArray[iNumber - 2]*1 + numberArray[iNumber - 1]*1;
        var thisWindow = numberArray[iNumber - 2]*1 + numberArray[iNumber - 1]*1 + numberArray[iNumber]*1;
        if(previousWindow < thisWindow) {
            windowIncreasing++;
        }
    }
    console.log('Total Time: ' + (new Date() - startTime) + 'ms');
    console.log('Answer One: ' + numberIncreasing);
    console.log('Answer Two: ' + windowIncreasing);
});
