fetch('https://adventofcode.com/2022/day/5/input').then(function (response) {
    return response.text();
}).then(function (text) {
    var startTime = new Date();
    var inputArray = text.split('\n');
    inputArray.pop();

    var inputStacks = inputArray.slice(0,inputArray.indexOf('') - 1);
    var inputInstructions = inputArray.slice(inputArray.indexOf('') + 1);

    var stacks = [];
    var instructions = [];

    inputStacks.reverse().forEach(row => {
        for(var iPosition = 1; iPosition < row.length; iPosition += 4) {
            var thisPosition = row[iPosition];
            if(thisPosition.trim()) {
                stacks[(iPosition - 1)/4] = stacks[(iPosition - 1)/4] || [];
                stacks[(iPosition - 1)/4].push(thisPosition);
            }
        }
    });
    
    inputInstructions.forEach(row => {
        var parsedInstructionsSplit = row.split('move ').join('').split(' from ').join('-').split(' to ').join('-').split('-');
        instructions.push({
            amount: parsedInstructionsSplit[0],
            from: parsedInstructionsSplit[1],
            to: parsedInstructionsSplit[2]
        })
    });
    
    var partOneStacks = JSON.parse(JSON.stringify(stacks));
    instructions.forEach(instruction => {
        for(var i = 0; i < instruction.amount; i++) {
            partOneStacks[instruction.to - 1].push(partOneStacks[instruction.from - 1].pop());
        }
    });

    var answerOne = '';
    for(var iStack = 0; iStack < partOneStacks.length; iStack++) {
        answerOne += partOneStacks[iStack][partOneStacks[iStack].length - 1];
    }


    var partTwoStacks = JSON.parse(JSON.stringify(stacks));
    instructions.forEach(instruction => {
        partTwoStacks[instruction.to - 1] = partTwoStacks[instruction.to - 1].concat(partTwoStacks[instruction.from - 1].splice(-1 * instruction.amount));
    });

    var answerTwo = '';
    for(var iStack = 0; iStack < partTwoStacks.length; iStack++) {
        answerTwo += partTwoStacks[iStack][partTwoStacks[iStack].length - 1];
    }
    
    console.log('Total Time: ' + (new Date() - startTime) + 'ms');
    console.log('Answer One: ' + answerOne);
    console.log('Answer Two: ' + answerTwo);
});
