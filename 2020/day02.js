fetch('https://adventofcode.com/2020/day/2/input').then(function (response) {
    return response.text();
}).then(function (text) {
    var startTime = new Date();
    var passwordRuleArray = text.split('\n');
    var numberValid = 0;
    var numberInvalid = 0;
    for(var iPassword = 0; iPassword < passwordRuleArray.length; iPassword++){
        var thisRule = passwordRuleArray[iPassword];
        if(thisRule){
            var thisSplit = thisRule.split(' ');
            var thisRange = thisSplit[0].split('-');
            var thisCharacter = thisSplit[1].split(':').join('');
            var thisPassword = thisSplit[2];
            var thisPasswordMinusCharacter = thisPassword.split(thisCharacter).join('');
            var numberThisCharacter = thisPassword.length - thisPasswordMinusCharacter.length;
            if(numberThisCharacter >= thisRange[0]*1 && numberThisCharacter <= thisRange[1]*1){
                numberValid++;
            }else{
                numberInvalid++;
            }
        }
    }
    console.log('Number Valid 1: ' + numberValid);
    console.log('Number Invalid 1: ' + numberInvalid);


    numberValid = 0;
    numberInvalid = 0;
    for(var iPassword = 0; iPassword < passwordRuleArray.length; iPassword++){
        var thisRule = passwordRuleArray[iPassword];
        if(thisRule){
            var thisSplit = thisRule.split(' ');
            var thisRange = thisSplit[0].split('-');
            var thisCharacter = thisSplit[1].split(':').join('');
            var thisPassword = thisSplit[2];
            if((thisPassword[thisRange[0]*1-1] == thisCharacter || thisPassword[thisRange[1]*1-1] == thisCharacter) && !(thisPassword[thisRange[0]*1-1] == thisCharacter && thisPassword[thisRange[1]*1-1] == thisCharacter)){
                numberValid++;
            }else{
                numberInvalid++;
            }
        }
    }

    console.log('Number Valid 2: ' + numberValid);
    console.log('Number Invalid 2: ' + numberInvalid);
    console.log('Total Time: ' + (new Date() - startTime) + 'ms');
});
