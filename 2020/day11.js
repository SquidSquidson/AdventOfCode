fetch('https://adventofcode.com/2020/day/11/input').then(function (response) {
    return response.text();
}).then(function (text) {
    var startTime = new Date();
    var inputRows = text.split('\n');

    var rows=[];
    for(var iRow = 1; iRow < inputRows.length; iRow++){
        var thisRow = inputRows[iRow-1];
        rows.push(thisRow.split(''));
    }
    
    var previousState = JSON.parse(JSON.stringify(rows));
    var nextState = JSON.parse(JSON.stringify(rows));
    var iterationCount = 0;
    do{
        iterationCount++;
        previousState = JSON.parse(JSON.stringify(nextState));
        for(var iRow = 0; iRow < previousState.length; iRow++){
            var thisRow = previousState[iRow];
            for(var iSeat = 0; iSeat < thisRow.length; iSeat++){
                var thisSeat = thisRow[iSeat];
                var adjacentSeats = {
                    ".":0,
                    "L":0,
                    "#":0
                };
                if(iSeat > 0){
                    var leftSeat = thisRow[iSeat-1];
                    adjacentSeats[leftSeat] = adjacentSeats[leftSeat] + 1;
                    if(iRow > 0){
                        var topLeftSeat = previousState[iRow-1][iSeat-1];
                        adjacentSeats[topLeftSeat] = adjacentSeats[topLeftSeat] + 1;
                    }
                    if(iRow < (previousState.length-1)){
                        var bottomLeftSeat = previousState[iRow+1][iSeat-1];
                        adjacentSeats[bottomLeftSeat] = adjacentSeats[bottomLeftSeat] + 1;
                    }
                }
                if(iSeat < (thisRow.length-1)){
                    var rightSeat = thisRow[iSeat+1];
                    adjacentSeats[rightSeat] = adjacentSeats[rightSeat] + 1;
                    if(iRow > 0){
                        var topRightSeat = previousState[iRow-1][iSeat+1];
                        adjacentSeats[topRightSeat] = adjacentSeats[topRightSeat] + 1;
                    }
                    if(iRow < (previousState.length-1)){
                        var bottomRightSeat = previousState[iRow+1][iSeat+1];
                        adjacentSeats[bottomRightSeat] = adjacentSeats[bottomRightSeat] + 1;
                    }
                }
                if(iRow > 0){
                    var topSeat = previousState[iRow-1][iSeat];
                    adjacentSeats[topSeat] = adjacentSeats[topSeat] + 1;
                }
                if(iRow < (previousState.length-1)){
                    var bottomSeat = previousState[iRow+1][iSeat];
                    adjacentSeats[bottomSeat] = adjacentSeats[bottomSeat] + 1;
                }
                if(thisSeat == 'L'){
                    if(adjacentSeats['#'] == 0){
                        nextState[iRow][iSeat] = '#';
                    }
                }else if(thisSeat == '#'){
                    if(adjacentSeats['#'] >= 4){
                        nextState[iRow][iSeat] = 'L';
                    }
                }
            }
        }
    }while(JSON.stringify(previousState) != JSON.stringify(nextState));

    var stringifiedState = JSON.stringify(nextState);
    console.log('Star One: ' + (stringifiedState.length - stringifiedState.split('#').join('').length));

    var previousStateTwo = JSON.parse(JSON.stringify(rows));
    var nextStateTwo = JSON.parse(JSON.stringify(rows));
    var iterationCount = 0;
    do{
        iterationCount++;
        previousStateTwo = JSON.parse(JSON.stringify(nextStateTwo));
        for(var iRow = 0; iRow < previousStateTwo.length; iRow++){
            var thisRow = previousStateTwo[iRow];
            for(var iSeat = 0; iSeat < thisRow.length; iSeat++){
                var thisSeat = thisRow[iSeat];
                var visibleSeats = {
                    ".":0,
                    "L":0,
                    "#":0
                };
                
                var foundTop = false;
                var foundBottom = false;
                var foundLeft = false;
                var foundRight = false;
                var foundTopLeft = false;
                var foundTopRight = false;
                var foundBottomRight = false;
                var foundBottomLeft = false;
                for(var iOut = 1; iOut < previousStateTwo.length; iOut++){
                    if(!foundTop){
                        var potential = (previousStateTwo[iRow - iOut] || [])[iSeat];
                        if(evaluatePotential(potential, visibleSeats)){
                            foundTop = true;
                        }
                    }
                    if(!foundBottom){
                        var potential = (previousStateTwo[iRow + iOut] || [])[iSeat];
                        if(evaluatePotential(potential, visibleSeats)){
                            foundBottom = true;
                        }
                    }
                    if(!foundLeft){
                        var potential = thisRow[iSeat - iOut];
                        if(evaluatePotential(potential, visibleSeats)){
                            foundLeft = true;
                        }
                    }
                    if(!foundRight){
                        var potential = thisRow[iSeat + iOut];
                        if(evaluatePotential(potential, visibleSeats)){
                            foundRight = true;
                        }
                    }
                    if(!foundTopLeft){
                        var potential = (previousStateTwo[iRow - iOut] || [])[iSeat - iOut];
                        if(evaluatePotential(potential, visibleSeats)){
                            foundTopLeft = true;
                        }
                    }
                    if(!foundTopRight){
                        var potential = (previousStateTwo[iRow - iOut] || [])[iSeat + iOut];
                        if(evaluatePotential(potential, visibleSeats)){
                            foundTopRight = true;
                        }
                    }
                    if(!foundBottomLeft){
                        var potential = (previousStateTwo[iRow + iOut] || [])[iSeat - iOut];
                        if(evaluatePotential(potential, visibleSeats)){
                            foundBottomLeft = true;
                        }
                    }
                    if(!foundBottomRight){
                        var potential = (previousStateTwo[iRow + iOut] || [])[iSeat + iOut];
                        if(evaluatePotential(potential, visibleSeats)){
                            foundBottomRight = true;
                        }
                    }

                    if(foundTop && foundTopLeft && foundTopRight && foundLeft && foundRight && foundBottom && foundBottomRight && foundBottomLeft){
                        break;
                    }
                }
                
                if(thisSeat == 'L'){
                    if(visibleSeats['#'] == 0){
                        nextStateTwo[iRow][iSeat] = '#';
                    }
                }else if(thisSeat == '#'){
                    if(visibleSeats['#'] >= 5){
                        nextStateTwo[iRow][iSeat] = 'L';
                    }
                }
            }
        }
    }while(JSON.stringify(previousStateTwo) != JSON.stringify(nextStateTwo));
    
    function evaluatePotential(potential, visibleSeats){
        if(potential == '#' || potential == 'L' || !potential){
            if(potential){
                visibleSeats[potential] = visibleSeats[potential] + 1;
            }
            return true;
        }
        return false;
    }

    var stringifiedState = JSON.stringify(nextStateTwo);
    console.log('Star Two: ' + (stringifiedState.length - stringifiedState.split('#').join('').length));
    
    console.log('Total Time: ' + (new Date() - startTime) + 'ms');
});
