fetch('https://adventofcode.com/2020/day/12/input').then(function (response) {
    return response.text();
}).then(function (text) {
    var startTime = new Date();
    var inputRows = text.split('\n');

    var instructions = [];
    for(var iRow = 1; iRow < inputRows.length; iRow++){
        var thisRow = inputRows[iRow-1];
        var action = thisRow.substring(0,1);
        var value = thisRow.substring(1) * 1;
        var thisInstruction = {
            action:action,
            value:value
        };
        instructions.push(thisInstruction);
    }
    
    {
        var positionX = 0;
        var positionY = 0;
        var heading = 90;
        for(var iInstruction = 0; iInstruction < instructions.length; iInstruction++){
            var thisInstruction = instructions[iInstruction];
            if(['N','E','S','W'].indexOf(thisInstruction.action) > -1){
                var multiplier = ['N','E'].indexOf(thisInstruction.action) > -1 ? 1 : -1;
                if(['N','S'].indexOf(thisInstruction.action) > -1){
                    positionY += (multiplier * thisInstruction.value);
                }else{
                    positionX += (multiplier * thisInstruction.value);
                }
            }else if(['L','R'].indexOf(thisInstruction.action) > -1){
                var multiplier = thisInstruction.action == 'R' ? 1 : -1;
                heading += (thisInstruction.value * multiplier);
                if(heading < 0){
                    heading += 360;
                }else if(heading >= 360){
                    heading -= 360
                }
            }else if(thisInstruction.action == 'F'){
                var multiplier = [0,90].indexOf(heading) > -1 ? 1 : -1;
                if([0,180].indexOf(heading) > -1){
                    positionY += (multiplier * thisInstruction.value);
                }else{
                    positionX += (multiplier * thisInstruction.value);
                }
            }
        }
        console.log('Star One:' + (Math.abs(positionX) + Math.abs(positionY)));
    }

    {
        var positionX = 0;
        var positionY = 0;
        var waypointX = 10;
        var waypointY = 1;
        var temp;
        for(var iInstruction = 0; iInstruction < instructions.length; iInstruction++){
            var thisInstruction = instructions[iInstruction];
            if(['N','E','S','W'].indexOf(thisInstruction.action) > -1){
                var multiplier = ['N','E'].indexOf(thisInstruction.action) > -1 ? 1 : -1;
                if(['N','S'].indexOf(thisInstruction.action) > -1){
                    waypointY += (multiplier * thisInstruction.value);
                }else{
                    waypointX += (multiplier * thisInstruction.value);
                }
            }else if(['L','R'].indexOf(thisInstruction.action) > -1){
                var thisInstructionValueRight = thisInstruction.value;
                if(thisInstruction.action == 'L'){
                    thisInstructionValueRight = (thisInstructionValueRight * -1) + 360;
                }
                if(thisInstructionValueRight == 90){
                    temp = waypointX;
                    waypointX = waypointY;
                    waypointY = temp * -1;
                }else if(thisInstructionValueRight == 180){
                    waypointX = waypointX * -1;
                    waypointY = waypointY * -1;
                }else if(thisInstructionValueRight == 270){
                    temp = waypointX;
                    waypointX = waypointY * -1;
                    waypointY = temp;
                }
            }else if(thisInstruction.action == 'F'){
                positionY += (thisInstruction.value * waypointY);
                positionX += (thisInstruction.value * waypointX);
            }
        }
        console.log('Star Two:' + (Math.abs(positionX) + Math.abs(positionY)));
    }

    console.log('Total Time: ' + (new Date() - startTime) + 'ms');
});
