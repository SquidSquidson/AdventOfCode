fetch('https://adventofcode.com/2021/day/2/input').then(function (response) {
    return response.text();
}).then(function (text) {
    var startTime = new Date();
    var inputArray = text.split('\n');
    inputArray.pop();

    var horizontalAmount = 0;
    var verticalAmount = 0;
    for(var iInput = 0; iInput < inputArray.length; iInput++) {
        var thisInputSplit = inputArray[iInput].trim().split(' ');
        var thisInputCommand = thisInputSplit[0].toLowerCase();
        var thisInputAmount = thisInputSplit[1] * 1;
        if(thisInputCommand == 'forward') {
            horizontalAmount = horizontalAmount + thisInputAmount;
        } else if(thisInputCommand == 'up') {
            verticalAmount = verticalAmount - thisInputAmount;
        } else if(thisInputCommand == 'down') {
            verticalAmount = verticalAmount + thisInputAmount;
        }
    }

    var aim = 0;
    var horizontalAmountTwo = 0;
    var verticalAmountTwo = 0;
    for(var iInput = 0; iInput < inputArray.length; iInput++) {
        var thisInputSplit = inputArray[iInput].trim().split(' ');
        var thisInputCommand = thisInputSplit[0].toLowerCase();
        var thisInputAmount = thisInputSplit[1] * 1;
        if(thisInputCommand == 'forward') {
            horizontalAmountTwo = horizontalAmountTwo + thisInputAmount;
            verticalAmountTwo = verticalAmountTwo + (aim * thisInputAmount);
        } else if(thisInputCommand == 'up') {
            aim = aim - thisInputAmount;
        } else if(thisInputCommand == 'down') {
            aim = aim + thisInputAmount;
        }
    }



    console.log('Total Time: ' + (new Date() - startTime) + 'ms');
    console.log('Answer One: ' + (horizontalAmount * verticalAmount));
    console.log('Answer Two: ' + (horizontalAmountTwo * verticalAmountTwo));
});
