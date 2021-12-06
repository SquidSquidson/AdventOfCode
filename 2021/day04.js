fetch('https://adventofcode.com/2021/day/4/input').then(function (response) {
    return response.text();
}).then(function (text) {
    var startTime = new Date();
    var inputArray = text.split('\n');
    inputArray.pop();

    var calledNumbers = inputArray.shift().split(',');
    inputArray.shift();//remove blank row

    var currentBoard = 0;
    var currentBoardRow = 0;
    var rawBoardData = {};
    var boardIndex = {};
    var newBoard = true;
    for(var iRow = 0; iRow < inputArray.length; iRow++) {
        if(newBoard) {
            rawBoardData[currentBoard] = {
                rows:[[],[],[],[],[]],
                columns:[[],[],[],[],[]],
                allNums:[]
            };
            newBoard = false;
        }
        var thisRow = inputArray[iRow].trim();
        if(thisRow.length > 0) {
            var thisRowSplit = thisRow.trim().split('  ').join(' ').split(' ');
            for(var iColumn = 0; iColumn < thisRowSplit.length; iColumn++) {
                var thisNumber = thisRowSplit[iColumn];
                if(!boardIndex[thisNumber]) boardIndex[thisNumber] = [];
                boardIndex[thisNumber].push(currentBoard);
                rawBoardData[currentBoard].rows[currentBoardRow].push(thisNumber);
                rawBoardData[currentBoard].columns[iColumn].push(thisNumber);
                rawBoardData[currentBoard].allNums.push(thisNumber);
            }
            currentBoardRow++;
        } else {
            currentBoard++;
            newBoard = true;
            currentBoardRow = 0;
        }
    }
    
    var answerOne = 0;
    var boardData = JSON.parse(JSON.stringify(rawBoardData));
    for(var iCall = 0; iCall < calledNumbers.length; iCall++) {
        var thisCall = calledNumbers[iCall];
        var indexedBoards = boardIndex[thisCall];
        if(indexedBoards) {
            for(var iBoard = 0; iBoard < indexedBoards.length; iBoard++) {
                var thisBoardWon = false;
                var thisBoard = boardData[indexedBoards[iBoard]];
                
                for(var iRow = 0; iRow < thisBoard.rows.length; iRow++) {
                    var thisRow = thisBoard.rows[iRow];
                    if(thisRow.indexOf(thisCall) > -1) {
                        thisRow.splice(thisRow.indexOf(thisCall), 1);
                        if(thisRow.length == 0) thisBoardWon = true;
                    }
                }
                for(var iColumn = 0; iColumn < thisBoard.columns.length; iColumn++) {
                    var thisColumn = thisBoard.columns[iColumn];
                    if(thisColumn.indexOf(thisCall) > -1) {
                        thisColumn.splice(thisColumn.indexOf(thisCall), 1);
                        if(thisColumn.length == 0) thisBoardWon = true;
                    }
                }
                thisBoard.allNums.splice(thisBoard.allNums.indexOf(thisCall), 1);

                if(thisBoardWon) {
                    for(var iAll = 0; iAll < thisBoard.allNums.length; iAll++) {
                        answerOne += (thisBoard.allNums[iAll] * 1)
                    }
                    answerOne = answerOne * thisCall;
                    iCall = calledNumbers.length;
                    break;
                }
            }
        }
    }


    var answerTwo = 0;
    var boardData = JSON.parse(JSON.stringify(rawBoardData));
    for(var iCall = 0; iCall < calledNumbers.length; iCall++) {
        var thisCall = calledNumbers[iCall];
        var indexedBoards = boardIndex[thisCall];
        if(indexedBoards) {
            for(var iBoard = 0; iBoard < indexedBoards.length; iBoard++) {
                var thisBoardWon = false;
                var thisBoard = boardData[indexedBoards[iBoard]];
                if(thisBoard) {
                    for(var iRow = 0; iRow < thisBoard.rows.length; iRow++) {
                        var thisRow = thisBoard.rows[iRow];
                        if(thisRow.indexOf(thisCall) > -1) {
                            thisRow.splice(thisRow.indexOf(thisCall), 1);
                            if(thisRow.length == 0) thisBoardWon = true;
                        }
                    }
                    for(var iColumn = 0; iColumn < thisBoard.columns.length; iColumn++) {
                        var thisColumn = thisBoard.columns[iColumn];
                        if(thisColumn.indexOf(thisCall) > -1) {
                            thisColumn.splice(thisColumn.indexOf(thisCall), 1);
                            if(thisColumn.length == 0) thisBoardWon = true;
                        }
                    }
                    thisBoard.allNums.splice(thisBoard.allNums.indexOf(thisCall), 1);
                    
                    if(thisBoardWon) {
                        if(Object.keys(boardData).length == 1) {
                            for(var iAll = 0; iAll < thisBoard.allNums.length; iAll++) {
                                answerTwo += (thisBoard.allNums[iAll] * 1)
                            }
                            answerTwo = answerTwo * thisCall;
                            iCall = calledNumbers.length;
                            break;
                        } else {
                            delete boardData[indexedBoards[iBoard]];
                        }
                    }
                }
            }
        }
    }

    
    console.log('Total Time: ' + (new Date() - startTime) + 'ms');
    console.log('Answer One: ' + answerOne);
    console.log('Answer Two: ' + answerTwo);
});

