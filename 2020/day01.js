fetch('https://adventofcode.com/2020/day/1/input').then(function (response) {
    return response.text();
}).then(function (text) {
    var startTime = new Date();
    var numberArray = text.split('\n');
    for(var iNumber = 0; iNumber < numberArray.length; iNumber++){
        var thisNumber = numberArray[iNumber];
        var otherNumber = 2020 - thisNumber;
        if(numberArray.indexOf(otherNumber + '') > -1){
            var answerOne = answerOne ? answerOne : thisNumber * otherNumber;
            break;
        }
    }

    for(var iNumber = 0; iNumber < numberArray.length; iNumber++){
        var thisNumber = numberArray[iNumber];
        var otherNumber = 2020 - thisNumber;
        for(var jNumber = 0; jNumber < numberArray.length; jNumber++){
            var thisNumberTwo = numberArray[jNumber];
            var otherNumberTwo = otherNumber - thisNumberTwo;
            if(numberArray.indexOf(otherNumberTwo + '') > -1){
                var answerTwo = answerTwo ? answerTwo : thisNumber * thisNumberTwo * otherNumberTwo;
                iNumber = numberArray.length + 1;
                break;
            }
        }
    }
    console.log('Total Time: ' + (new Date() - startTime) + 'ms');
    console.log('Answer One: ' + answerOne);
    console.log('Answer Two: ' + answerTwo);
});
