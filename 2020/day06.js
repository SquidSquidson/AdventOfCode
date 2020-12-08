fetch('https://adventofcode.com/2020/day/6/input').then(function (response) {
    return response.text();
}).then(function (text) {
    var startTime = new Date();
    var inputRows = text.split('\n');

    var groups = [];
    var currentGroup = {distinctYes:'',people:[]};
    var sumOfYes = 0;
    for(var iRow = 0; iRow < inputRows.length; iRow++){
        var thisRow = inputRows[iRow];
        if(thisRow){
            currentGroup.people.push(thisRow);
            for(var iYes = 0; iYes < thisRow.length; iYes++){
                var thisYes = thisRow[iYes];
                if(currentGroup.distinctYes.indexOf(thisYes) == -1){
                    currentGroup.distinctYes += thisYes;
                }
            }
        }else{
            sumOfYes += currentGroup.distinctYes.length;
            groups.push(currentGroup);
            currentGroup = {distinctYes:'',people:[]};
        }
    }
    console.log('Star One: ' + sumOfYes);
    
    var sumOfAllYes = 0;
    for(var iGroup = 0; iGroup < groups.length; iGroup++){
        var thisGroup = groups[iGroup];
        var firstPerson = thisGroup.people[0];
        for(var iYes = 0; iYes < firstPerson.length; iYes++){
            var thisYes = firstPerson[iYes];
            var allOthersHaveIt = true;
            for(var iPerson = 1; iPerson < thisGroup.people.length; iPerson++){
                var otherPerson = thisGroup.people[iPerson];
                if(otherPerson.indexOf(thisYes) == -1){
                    allOthersHaveIt = false;
                    break;
                }
            }
            if(allOthersHaveIt){
                sumOfAllYes++;
            }
        }
    }
    console.log('Star Two: ' + sumOfAllYes);

    console.log('Total Time: ' + (new Date() - startTime) + 'ms');
});