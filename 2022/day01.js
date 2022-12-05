fetch('https://adventofcode.com/2022/day/1/input').then(function (response) {
    return response.text();
}).then(function (text) {
    var startTime = new Date();
    var inputArray = text.split('\n');
    inputArray.pop();

    var elfCalorieCounts = [];
    var currentCalorieCount = 0;
    for(var iCalorie = 0; iCalorie < inputArray.length; iCalorie++) {
        var thisCalorie = inputArray[iCalorie];
        if(!thisCalorie) {
            elfCalorieCounts.push(currentCalorieCount);
            currentCalorieCount = 0;
        } else {
            currentCalorieCount += Number(thisCalorie);
        }
    }
    elfCalorieCounts.sort((a,b) => a > b ? 1 : -1);
    var answerOne = elfCalorieCounts[elfCalorieCounts.length-1];

    var answerTwoElves = elfCalorieCounts.slice(-3);
    var answerTwo = 0;
    for(var iElf = 0; iElf < answerTwoElves.length; iElf++) {
        answerTwo += answerTwoElves[iElf];
    }

    console.log('Total Time: ' + (new Date() - startTime) + 'ms');
    console.log('Answer One: ' + answerOne);
    console.log('Answer Two: ' + answerTwo);
});
