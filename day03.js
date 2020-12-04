fetch('https://adventofcode.com/2020/day/3/input').then(function (response) {
    return response.text();
}).then(function (text) {
    var startTime = new Date();
    var inputRows = text.split('\n');
    var stepSize = 3;
    var rowWidth = inputRows[0].length;
    var numberOfTrees = 0;
    for(var iRow = 1; iRow < inputRows.length; iRow++){
        var thisRow = inputRows[iRow];
        var currentLocationContents = thisRow[(iRow * stepSize) % rowWidth];
        if(currentLocationContents == '#'){
            numberOfTrees++;
        }
    }
    console.log('Star One: ' + numberOfTrees);

    numberOfTrees = 0;
    numberOfTrees = stepDownTrees(inputRows, 1, 1);
    numberOfTrees = numberOfTrees * stepDownTrees(inputRows, 3, 1);
    numberOfTrees = numberOfTrees * stepDownTrees(inputRows, 5, 1);
    numberOfTrees = numberOfTrees * stepDownTrees(inputRows, 7, 1);
    numberOfTrees = numberOfTrees * stepDownTrees(inputRows, 1, 2);
    console.log('Star Two: ' + numberOfTrees);
    console.log('Total Time: ' + (new Date() - startTime) + 'ms');
});

function stepDownTrees(inputRows, stepSize, jumpSize){
    var rowWidth = inputRows[0].length;
    var numberOfTrees = 0;
    for(var iRow = jumpSize; iRow < inputRows.length; iRow = iRow + jumpSize){
        var thisRow = inputRows[iRow];
        var currentLocationContents = thisRow[(iRow * stepSize / jumpSize) % rowWidth];
        if(currentLocationContents == '#'){
            numberOfTrees++;
        }
    }
    return numberOfTrees;
}