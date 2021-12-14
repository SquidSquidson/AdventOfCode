fetch('https://adventofcode.com/2021/day/13/input').then(function (response) {
    return response.text();
}).then(function (text) {
    var startTime = new Date();
    var inputArray = text.split('\n');
    inputArray.pop();

    var grid = [];
    var folds = [];
    var isFold = false;
    var maxX = 0;
    var maxY = 0;
    for(var iInput = 0; iInput < inputArray.length; iInput++) {
        var thisRow = inputArray[iInput].trim();
        if(thisRow.length == 0) {
            isFold = true;
        } else {
            if(isFold) {
                var thisFold = thisRow.split('fold along ').join('').split('=');
                folds.push(thisFold);
            }else {
                var thisPoint = thisRow.split(',');
                maxX = Math.max(thisPoint[0] * 1, maxX);
                maxY = Math.max(thisPoint[1] * 1, maxY);
                grid[thisPoint[1]] = grid[thisPoint[1]] || [];
                grid[thisPoint[1]][thisPoint[0]] = 1;
            }
        }
    }

    var answerOne = 0;
    for(var iFold = 0; iFold < folds.length; iFold++) {
        var thisFold = folds[iFold];
        if(thisFold[0] == 'x') {
            var thisFoldNumber = (thisFold[1] * 1);
            for(var iX = 1; iX <= maxX - thisFoldNumber; iX++) {
                var foldSide = thisFoldNumber + iX;
                var otherSide = thisFoldNumber - iX;

                for(var iY = 0; iY <= maxY; iY++) {
                    grid[iY] = grid[iY] || [];
                    grid[iY][otherSide] = grid[iY][otherSide] || grid[iY][foldSide] || '';
                }
            }
            maxX = (thisFold[1] * 1);
        } else {
            var thisFoldNumber = (thisFold[1] * 1);
            for(var iY = 1; iY <= maxY - thisFoldNumber; iY++) {
                var foldSide = thisFoldNumber + iY;
                var otherSide = thisFoldNumber - iY;

                grid[foldSide] = grid[foldSide] || [];
                grid[otherSide] = grid[otherSide] || [];
                for(var iX = 0; iX <= maxX; iX++) {
                    grid[otherSide][iX] = grid[otherSide][iX] || grid[foldSide][iX] || '';
                }
            }
            maxY = (thisFold[1] * 1);
        }
        if(iFold == 0) {
            for(var iY = 0; iY <= maxY; iY++) {
                for(var iX = 0; iX <= maxX; iX++) {
                    answerOne += (grid[iY] || [])[iX] ? 1 : 0;
                }
            }
        }
    }
    
    function printGrid() {
        var resultGrid = '';
        for(var iY = 0; iY <= maxY; iY++) {
            var thisLine = '';
            for(var iX = 0; iX <= maxX; iX++) {
                thisLine += (grid[iY] || [])[iX] ? '\u2588' : ' ';
            }
            resultGrid += thisLine;
            resultGrid += '\n';
        }
        console.log('---------------------------------------------');
        console.log(resultGrid);
        console.log('---------------------------------------------');
    }

    
    console.log('Total Time: ' + (new Date() - startTime) + 'ms');
    console.log('Answer One: ' + answerOne);
    console.log('Answer Two: ');
    printGrid();
});
