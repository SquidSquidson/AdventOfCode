fetch('https://adventofcode.com/2021/day/5/input').then(function (response) {
    return response.text();
}).then(function (text) {
    var startTime = new Date();
    var inputArray = text.split('\n');
    inputArray.pop();

    var markMap = [];
    var answerOne = 0;
    for(var iLine = 0; iLine < inputArray.length; iLine++) {
        var thisLineSplit = inputArray[iLine].split(' -> ');
        var thisLineStartX = thisLineSplit[0].split(',')[0];
        var thisLineStartY = thisLineSplit[0].split(',')[1];
        var thisLineEndX = thisLineSplit[1].split(',')[0];
        var thisLineEndY = thisLineSplit[1].split(',')[1];
        if(thisLineStartX == thisLineEndX) {
            var loopStart = Math.min(thisLineStartY, thisLineEndY);
            var loopEnd = Math.max(thisLineStartY, thisLineEndY);
            for(var iLoop = loopStart; iLoop <= loopEnd; iLoop++) {
                markMap[iLoop] = markMap[iLoop] || [];
                if(markMap[iLoop][thisLineStartX]) {
                    if(markMap[iLoop][thisLineStartX] == 1) {
                        answerOne++;
                    }
                    markMap[iLoop][thisLineStartX] = markMap[iLoop][thisLineStartX] + 1;
                } else {
                    markMap[iLoop][thisLineStartX] = 1;
                }
            }
        } else if(thisLineStartY == thisLineEndY) {
            var loopStart = Math.min(thisLineStartX, thisLineEndX);
            var loopEnd = Math.max(thisLineStartX, thisLineEndX);
            for(var iLoop = loopStart; iLoop <= loopEnd; iLoop++) {
                markMap[thisLineStartY] = markMap[thisLineStartY] || [];
                if(markMap[thisLineStartY][iLoop]) {
                    if(markMap[thisLineStartY][iLoop] == 1) {
                        answerOne++;
                    }
                    markMap[thisLineStartY][iLoop] = markMap[thisLineStartY][iLoop] + 1;
                } else {
                    markMap[thisLineStartY][iLoop] = 1;
                }
            }
        }
    }



    var answerTwo = answerOne*1;
    for(var iLine = 0; iLine < inputArray.length; iLine++) {
        var thisLineSplit = inputArray[iLine].split(' -> ');
        var thisLineStartX = thisLineSplit[0].split(',')[0]*1;
        var thisLineStartY = thisLineSplit[0].split(',')[1]*1;
        var thisLineEndX = thisLineSplit[1].split(',')[0]*1;
        var thisLineEndY = thisLineSplit[1].split(',')[1]*1;
        if(thisLineStartX != thisLineEndX && thisLineStartY != thisLineEndY) {
            var incrementY = thisLineStartY < thisLineEndY;
            var incrementX = thisLineStartX < thisLineEndX;

            var iX = thisLineStartX;
            if(incrementY) {
                for(var iY = thisLineStartY; iY <= thisLineEndY; iY++) {
                    markMap[iY] = markMap[iY] || [];
                    if(markMap[iY][iX]) {
                        if(markMap[iY][iX] == 1) {
                            answerTwo++;
                        }
                        markMap[iY][iX] = markMap[iY][iX] + 1;
                    } else {
                        markMap[iY][iX] = 1;
                    }

                    iX = incrementX ? iX + 1 : iX - 1;
                }
            } else {
                for(var iY = thisLineStartY; thisLineEndY <= iY; iY--) {
                    markMap[iY] = markMap[iY] || [];
                    if(markMap[iY][iX]) {
                        if(markMap[iY][iX] == 1) {
                            answerTwo++;
                        }
                        markMap[iY][iX] = markMap[iY][iX] + 1;
                    } else {
                        markMap[iY][iX] = 1;
                    }

                    iX = incrementX ? iX + 1 : iX - 1;
                }
            }
        }
    }


    
    console.log('Total Time: ' + (new Date() - startTime) + 'ms');
    console.log('Answer One: ' + answerOne);
    console.log('Answer Two: ' + answerTwo);
});
