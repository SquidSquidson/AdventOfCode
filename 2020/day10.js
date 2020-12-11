fetch('https://adventofcode.com/2020/day/10/input').then(function (response) {
    return response.text();
}).then(function (text) {
    var startTime = new Date();
    var inputRows = text.split('\n');

    var jolts = [];
    for(var iRow = 1; iRow < inputRows.length; iRow++){
        jolts.push(inputRows[iRow-1] * 1);
    }

    var joltsSorted = JSON.parse(JSON.stringify(jolts)).sort(function(a, b) {
        return a - b;
    });
    joltsSorted.unshift(0);
    joltsSorted.push(joltsSorted[joltsSorted.length-1] + 3);
    var differences = {
        1:0,
        2:0,
        3:0
    }
    for(var iJolt = 1; iJolt < joltsSorted.length; iJolt++){
        var thisJolt = joltsSorted[iJolt];
        var prevJolt = joltsSorted[iJolt-1];
        var joltDifference = thisJolt - prevJolt;
        if(joltDifference > 3){
            break;
        }
        differences[joltDifference] = (differences[joltDifference] + 1);
    }
    console.log('Star One:' + (differences[1] * differences[3]));

    var joltsDescendantsSums = {};
    for(var iJolt = 0; iJolt < joltsSorted.length; iJolt++){
        var thisJolt = joltsSorted[iJolt];
        joltsDescendantsSums[thisJolt] = {};
        var numberPossibilities = 0;
        for(var iDescendant = 1; iDescendant <= 3; iDescendant++){
            var thisDescendant = thisJolt - iDescendant;
            if(joltsSorted.indexOf(thisDescendant) > -1){
                numberPossibilities += joltsDescendantsSums[thisDescendant];
            }
        }
        joltsDescendantsSums[thisJolt] = numberPossibilities || 1;
    }
    console.log('Star Two: ' + joltsDescendantsSums[joltsSorted[joltsSorted.length-1]]);

    console.log('Total Time: ' + (new Date() - startTime) + 'ms');
});
