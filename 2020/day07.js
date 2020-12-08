fetch('https://adventofcode.com/2020/day/7/input').then(function (response) {
    return response.text();
}).then(function (text) {
    var startTime = new Date();
    var inputRows = text.split('\n');

    var rules = {};
    var rulesReversed = {};
    for(var iRow = 1; iRow < inputRows.length; iRow++){
        var thisRule = inputRows[iRow-1];
        var thisRuleSplit = thisRule.split(' bags contain ');
        var wrappingBag = thisRuleSplit[0];
        var contentBags = thisRuleSplit[1].split(' bags').join('').split(' bag').join('').split('.').join('').split(', ');
        var theseContentBags = [];
        if(contentBags.length > 1 || contentBags[0] != 'no other'){
            for(var iContentBag = 0; iContentBag < contentBags.length; iContentBag++){
                var thisContentBagSplit = contentBags[iContentBag].split(' ');
                var thisContentBagCount = thisContentBagSplit.shift();
                var thisContentBagColor = thisContentBagSplit.join(' ');
                theseContentBags.push({
                    qty: (thisContentBagCount * 1),
                    color: thisContentBagColor
                });

                rulesReversed[thisContentBagColor] = rulesReversed[thisContentBagColor] || [];
                if(rulesReversed[thisContentBagColor].indexOf(wrappingBag) == -1){
                    rulesReversed[thisContentBagColor].push(wrappingBag);
                }
            }
        }
        rules[wrappingBag] = rules[wrappingBag] || {};
        rules[wrappingBag].contentRules = theseContentBags;
    }

    console.log('Star One: ' + findWrappingBags(rulesReversed, 'shiny gold').length);

    console.log('Star Two: ' + (findChildrenBagsCount(rules, 'shiny gold') - 1));

    console.log('Total Time: ' + (new Date() - startTime) + 'ms');
});

function findWrappingBags(rulesReversed, bagColor){
    var wrappingBags = [];
    if(rulesReversed[bagColor]){
        for(var iBag = 0; iBag < rulesReversed[bagColor].length; iBag++){
            var thisBag = rulesReversed[bagColor][iBag];
            if(wrappingBags.indexOf(thisBag) == -1){
                wrappingBags.push(thisBag);
                var nextLevelBags = findWrappingBags(rulesReversed, thisBag);
                for(var iNextBag = 0; iNextBag < nextLevelBags.length; iNextBag++){
                    var nextBag = nextLevelBags[iNextBag];
                    if(wrappingBags.indexOf(nextBag) == -1){
                        wrappingBags.push(nextBag);
                    }
                }
            }
        }
    }
    return wrappingBags;
}

function findChildrenBagsCount(rules, bagColor){
    var childBagCount = 1;
    for(var iBag = 0; iBag < rules[bagColor].contentRules.length; iBag++){
        var thisContentRule = rules[bagColor].contentRules[iBag];
        childBagCount += (thisContentRule.qty * findChildrenBagsCount(rules, thisContentRule.color));
    }
    return childBagCount;
}