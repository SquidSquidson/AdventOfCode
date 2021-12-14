fetch('https://adventofcode.com/2021/day/12/input').then(function (response) {
    return response.text();
}).then(function (text) {
    var startTime = new Date();
    var inputArray = text.split('\n');
    inputArray.pop();

    var destinationMap = {};
    for(var iInput = 0; iInput < inputArray.length; iInput++) {
        var thisInput = inputArray[iInput].split('-');
        destinationMap[thisInput[0]] = destinationMap[thisInput[0]] || [];
        destinationMap[thisInput[0]].push(thisInput[1]);
        destinationMap[thisInput[1]] = destinationMap[thisInput[1]] || [];
        destinationMap[thisInput[1]].push(thisInput[0]);
    }

    function isLowerCase(testString) {
        return testString.toLowerCase() == testString;
    }
    
    var steps = {0:[['end']]};
    var finals = [];
    var noNext = false;
    function findNextSteps(nextIndex) {
        var previousSteps = steps[nextIndex - 1];
        steps[nextIndex] = [];
        for(var iPrev = 0; iPrev < previousSteps.length; iPrev++) {
            var thisPrevious = previousSteps[iPrev];
            var thisPreviousLast = thisPrevious[thisPrevious.length - 1];
            if(thisPreviousLast != 'start') {
                for(var iNext = 0; iNext < destinationMap[thisPreviousLast].length; iNext++) {
                    var thisNext = destinationMap[thisPreviousLast][iNext];
                    if(!isLowerCase(thisNext) || thisPrevious.indexOf(thisNext) == -1) {
                        var nextSteps = JSON.parse(JSON.stringify(thisPrevious));
                        nextSteps.push(thisNext);
                        steps[nextIndex].push(nextSteps);
                        if(thisNext == 'start') {
                            finals.push(nextSteps);
                        }
                    }
                }
            }
        }
        if(steps[nextIndex].length == 0) {
            noNext = true;
        }
    }
    var i = 0;
    while(!noNext) {
        i++;
        findNextSteps(i);
    }
    var answerOne = finals.length;

    var stepsTwo = {0:[{steps:['end']}]};
    var finalsTwo = [];
    var noNextTwo = false;
    function findNextStepsTwo(nextIndex) {
        var previousSteps = stepsTwo[nextIndex - 1];
        stepsTwo[nextIndex] = [];
        for(var iPrev = 0; iPrev < previousSteps.length; iPrev++) {
            var thisPrevious = previousSteps[iPrev];
            var thisPreviousLast = thisPrevious.steps[thisPrevious.steps.length - 1];
            if(thisPreviousLast != 'start') {
                for(var iNext = 0; iNext < destinationMap[thisPreviousLast].length; iNext++) {
                    var thisNext = destinationMap[thisPreviousLast][iNext];
                    if(thisNext != 'end') {
                        if(!isLowerCase(thisNext) || thisPrevious.steps.indexOf(thisNext) == -1) {
                            var nextSteps = JSON.parse(JSON.stringify(thisPrevious));
                            nextSteps.steps.push(thisNext);
                            stepsTwo[nextIndex].push(nextSteps);
                            if(thisNext == 'start') {
                                finalsTwo.push(nextSteps);
                            }
                        }
                        if(isLowerCase(thisNext) && thisPrevious.steps.indexOf(thisNext) > -1) {
                            if(!thisPrevious.alreadyDoubleLower) {
                                var nextSteps = JSON.parse(JSON.stringify(thisPrevious));
                                nextSteps.alreadyDoubleLower = true;
                                nextSteps.steps.push(thisNext);
                                stepsTwo[nextIndex].push(nextSteps);
                                if(thisNext == 'start') {
                                    finalsTwo.push(nextSteps);
                                }
                            }
                        }
                    }
                }
            }
        }
        if(stepsTwo[nextIndex].length == 0) {
            noNextTwo = true;
        }
    }
    var i = 0;
    while(!noNextTwo) {
        i++;
        findNextStepsTwo(i);
    }
    var answerTwo = finalsTwo.length;


    
    console.log('Total Time: ' + (new Date() - startTime) + 'ms');
    console.log('Answer One: ' + answerOne);
    console.log('Answer Two: ' + answerTwo);
});
