fetch('https://adventofcode.com/2020/day/8/input').then(function (response) {
    return response.text();
}).then(function (text) {
    var startTime = new Date();
    var inputRows = text.split('\n');

    var commands = [];
    for(var iRow = 1; iRow < inputRows.length; iRow++){
        var thisRow = inputRows[iRow-1];
        var thisRowSplit = thisRow.split(' ');
        var thisCommand = {
            action:thisRowSplit[0],
            amount:thisRowSplit[1]*1,
            visited: false
        }
        commands.push(thisCommand);
    }
    
    var starOneCommands = JSON.parse(JSON.stringify(commands));
    console.log('Star One: ' + runNextCommand(starOneCommands, 0));

    for(var iCommand = 0; iCommand < commands.length; iCommand++){
        var thisCommand = commands[iCommand];
        if(thisCommand.action == 'nop' || thisCommand.action == 'jmp'){
            var starTwoCommands = JSON.parse(JSON.stringify(commands));
            starTwoCommands[iCommand].action = thisCommand.action == 'nop' ? 'jmp' : 'nop';
            var resultAcc = runNextCommand(starTwoCommands, 0);
            if(window.done){
                console.log('Star Two: ' + resultAcc);
                break;
            }
        }
    }

    console.log('Total Time: ' + (new Date() - startTime) + 'ms');
});

function runNextCommand(commands, commandIndex){
    var currentCommand = commands[commandIndex];
    var thisStepAcc = 0;
    if(currentCommand.visited){
        return thisStepAcc;
    }else if(commandIndex == (commands.length - 1)){
        window.done = true;
        return thisStepAcc;
    }else{
        currentCommand.visited = true;
        var nextIndex = commandIndex + 1;
        if(currentCommand.action == 'acc'){
            thisStepAcc += currentCommand.amount;
        }
        if(currentCommand.action == 'jmp'){
            nextIndex = commandIndex + currentCommand.amount;
        }
        thisStepAcc += runNextCommand(commands, nextIndex);
    }
    return thisStepAcc;
}