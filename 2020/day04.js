fetch('https://adventofcode.com/2020/day/4/input').then(function (response) {
    return response.text();
}).then(function (text) {
    var startTime = new Date();
    var inputRows = text.split('\n');
    var currentRecord = {};
    var records = [];
    for(var iRow = 0; iRow < inputRows.length; iRow++){
        var currentRow = inputRows[iRow];
        if(currentRow){
            var currentRowSplit = currentRow.split(' ');
            for(var iRowFields = 0; iRowFields < currentRowSplit.length; iRowFields++){
                var thisFieldSplit = currentRowSplit[iRowFields].split(':');
                currentRecord[thisFieldSplit[0]] = thisFieldSplit[1];
            }
        }else{
            records.push(currentRecord);
            currentRecord = {};
        }
    }

    var validRecords = [];
    var requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
    var optionalFields = ['cid'];
    for(var iRecord = 0; iRecord < records.length; iRecord++){
        var thisRecord = records[iRecord];
        var thisRecordValid = true;
        for(var iField = 0; iField < requiredFields.length; iField++){
            var thisFieldName = requiredFields[iField];
            if(!thisRecord[thisFieldName]){
                thisRecordValid = false;
                break;
            }
        }
        if(thisRecordValid){
            validRecords.push(thisRecord);
        }
    }
    console.log('Star One: ' + validRecords.length);

    var superValidRecords = [];
    var requiredFieldsRegexs = [
        /^(19[2-8][0-9]|199[0-9]|200[0-2])$/,
        /^(201[0-9]|2020)$/,
        /^(202[0-9]|2030)$/,
        /^(1[5-8][0-9]|19[0-3])cm|(59|6[0-9]|7[0-6])in$/,
        /^#[0-9abcdef]{6}$/,
        /^amb|blu|brn|gry|grn|hzl|oth$/,
        /^[0-9]{9}$/
    ];
    for(var iRecord = 0; iRecord < validRecords.length; iRecord++){
        var thisRecord = validRecords[iRecord];
        var thisRecordValid = true;
        for(var iField = 0; iField < requiredFields.length; iField++){
            var thisField = requiredFields[iField];
            var thisFieldRegex = requiredFieldsRegexs[iField];
            if(!thisFieldRegex.exec(thisRecord[thisField])){
                thisRecordValid = false;
                break;
            }
        }
        if(thisRecordValid){
            superValidRecords.push(thisRecord);
        }
    }
    console.log('Star Two: ' + superValidRecords.length);
    console.log('Total Time: ' + (new Date() - startTime) + 'ms');
});