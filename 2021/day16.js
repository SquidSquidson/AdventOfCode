fetch('https://adventofcode.com/2021/day/16/input').then(function (response) {
    return response.text();
}).then(function (text) {
    var startTime = new Date();
    var inputArray = text.split('\n');
    inputArray.pop();

    
    var inputString = inputArray[0];
    var hexMap = {'0':'0000','1':'0001','2':'0010','3':'0011','4':'0100','5':'0101','6':'0110','7':'0111','8':'1000','9':'1001','A':'1010','B':'1011','C':'1100','D':'1101','E':'1110','F':'1111'};
    var inputStringBinary = '';
    for(var iChar = 0; iChar < inputString.length; iChar++) {
        inputStringBinary += hexMap[inputString[iChar]];
    }

    var answerOne = 0;
    var initialPacket = {raw:inputStringBinary};
    function decipherPacket(packetInfo) {
        //first 3
        var packetVersionBinary = packetInfo.raw.substring(0,3) ;
        var packetVersion = parseInt(packetVersionBinary, 2);
        packetInfo.version = packetVersion;
        answerOne += packetVersion;
        //next 3
        var packetTypeIdBinary = packetInfo.raw.substring(3,6);
        var packetTypeId = parseInt(packetTypeIdBinary, 2);
        packetInfo.typeId = packetTypeId;

        if(packetTypeId == 4) {
            var literalValueRaw = packetInfo.raw.substring(6);
            var literalValueBinary = '';
            var foundLastChunk = false;
            while(!foundLastChunk) {
                var thisChunk = literalValueRaw.substring(0, 5);
                literalValueRaw = literalValueRaw.substring(5);
                if(thisChunk[0] == '0') {
                    foundLastChunk = true;
                }
                thisChunk = thisChunk.substring(1);
                literalValueBinary += thisChunk;
            }
            packetInfo.literalValue = parseInt(literalValueBinary, 2);
            return literalValueRaw;
        } else {
            var lengthTypeId = packetInfo.raw[6];
            packetInfo.lengthTypeId = lengthTypeId;
            if(lengthTypeId == '0') {
                // next 15 bits are a number that represents the total length in bits of the sub-packets contained by this packet
                var nextFifteenNumber = parseInt(packetInfo.raw.substring(7, 22), 2);
                var remainingRaw = packetInfo.raw.substring(22, 22 + nextFifteenNumber);
                packetInfo.children = packetInfo.children || [];
                while(remainingRaw.length > 6) {
                    var newPacket = {raw:remainingRaw};
                    packetInfo.children.push(newPacket);
                    remainingRaw = decipherPacket(newPacket);
                }
                return packetInfo.raw.substring(22 + nextFifteenNumber);
            } else {
                // next 11 bits are a number that represents the number of sub-packets immediately contained by this packet
                var nextElevenNumber = parseInt(packetInfo.raw.substring(7, 18), 2);
                var remainingRaw = packetInfo.raw.substring(18);
                packetInfo.children = packetInfo.children || [];
                for(var iPacket = 0; iPacket < nextElevenNumber; iPacket++) {
                    var newPacket = {raw:remainingRaw};
                    packetInfo.children.push(newPacket);
                    remainingRaw = decipherPacket(newPacket);
                }
                return remainingRaw;
            }
        }
    }
    decipherPacket(initialPacket);




    function valueOfPacket(packetInfo) {
        if(packetInfo.typeId == 0) {
            var runningSum = 0;
            for(var iChild = 0; iChild < packetInfo.children.length; iChild++) {
                runningSum += valueOfPacket(packetInfo.children[iChild]);
            }
            return runningSum;
        } else if(packetInfo.typeId == 1) {
            var runningMult = 1;
            for(var iChild = 0; iChild < packetInfo.children.length; iChild++) {
                runningMult = runningMult * valueOfPacket(packetInfo.children[iChild]);
            }
            return runningMult;
        } else if(packetInfo.typeId == 2) {
            var minimumValue;
            for(var iChild = 0; iChild < packetInfo.children.length; iChild++) {
                var thisChildValue = valueOfPacket(packetInfo.children[iChild]);
                if(!minimumValue) minimumValue = thisChildValue;
                if(minimumValue > thisChildValue) minimumValue = thisChildValue;
            }
            return minimumValue;
        } else if(packetInfo.typeId == 3) {
            var maximumValue;
            for(var iChild = 0; iChild < packetInfo.children.length; iChild++) {
                var thisChildValue = valueOfPacket(packetInfo.children[iChild]);
                if(!maximumValue) maximumValue = thisChildValue;
                if(maximumValue < thisChildValue) maximumValue = thisChildValue;
            }
            return maximumValue;
        } else if(packetInfo.typeId == 4) {
            return packetInfo.literalValue;
        } else if(packetInfo.typeId == 5) {
            var childOneValue = valueOfPacket(packetInfo.children[0]);
            var childTwoValue = valueOfPacket(packetInfo.children[1]);
            if(childOneValue > childTwoValue) return 1;
            return 0;
        } else if(packetInfo.typeId == 6) {
            var childOneValue = valueOfPacket(packetInfo.children[0]);
            var childTwoValue = valueOfPacket(packetInfo.children[1]);
            if(childOneValue < childTwoValue) return 1;
            return 0;
        } else if(packetInfo.typeId == 7) {
            var childOneValue = valueOfPacket(packetInfo.children[0]);
            var childTwoValue = valueOfPacket(packetInfo.children[1]);
            if(childOneValue == childTwoValue) return 1;
            return 0;
        }
    }
    var answerTwo = valueOfPacket(initialPacket);

    
    console.log('Total Time: ' + (new Date() - startTime) + 'ms');
    console.log('Answer One: ' + answerOne);
    console.log('Answer Two: ' + answerTwo);
});

