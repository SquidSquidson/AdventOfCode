fetch('https://adventofcode.com/2020/day/5/input').then(function (response) {
    return response.text();
}).then(function (text) {
    var startTime = new Date();
    var inputRows = text.split('\n');
    var numberFB = 7;
    var numberLR = 3;

    var maxId = 0;
    var boardingPasses = [];
    for(var iRow = 1; iRow < inputRows.length; iRow++){
        var thisRow = inputRows[iRow - 1];
        var thisBoardingPass = {};
        var minRangeFB = 0;
        var maxRangeFB = Math.pow(2, numberFB) - 1;
        var minRangeLR = 0;
        var maxRangeLR = Math.pow(2, numberLR) - 1;

        for(var iFB = 1; iFB <= numberFB; iFB++){
            var thisFB = thisRow[iFB-1];
            var rangeReduction = Math.pow(2, numberFB) / Math.pow(2, iFB);
            if(thisFB == 'F'){
                maxRangeFB -= rangeReduction;
            }else{
                minRangeFB += rangeReduction;
            }
            thisBoardingPass.row = maxRangeFB;
        }
        for(var iLR = 1; iLR <= numberLR; iLR++){
            var thisLR = thisRow[iLR-1 + numberFB];
            var rangeReduction = Math.pow(2, numberLR) / Math.pow(2, iLR);
            if(thisLR == 'L'){
                maxRangeLR -= rangeReduction;
            }else{
                minRangeLR += rangeReduction;
            }
            thisBoardingPass.column = maxRangeLR;
        }
        thisBoardingPass.seatId = (thisBoardingPass.row * 8) + thisBoardingPass.column;
        if(thisBoardingPass.seatId > maxId){
            maxId = thisBoardingPass.seatId;
        }
        boardingPasses.push(thisBoardingPass);
    }
    console.log('Star One: ' + maxId);

    boardingPasses.sort(function compare(passA, passB) {
        if(passA.seatId < passB.seatId){
          return -1;
        }
        if(passA.seatId > passB.seatId){
          return 1;
        }
        return 0;
    });
    var previousSeatId;
    for(var iPass = 0; iPass < boardingPasses.length; iPass++){
        var thisPassSeatId = boardingPasses[iPass].seatId;
        var expectedPreviousSeatId = thisPassSeatId - 1;
        if(!previousSeatId || expectedPreviousSeatId == previousSeatId){
            previousSeatId = thisPassSeatId;
        }else{
            console.log('Star Two: ' + expectedPreviousSeatId);
            break;
        }
    }
    console.log('Total Time: ' + (new Date() - startTime) + 'ms');
});