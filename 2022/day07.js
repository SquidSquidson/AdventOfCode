fetch('https://adventofcode.com/2022/day/7/input').then(function (response) {
    return response.text();
}).then(function (text) {
    var startTime = new Date();
    var inputArray = text.split('\n');
    inputArray.pop();

    var directoryStructure = {};
    var currentDirectoryPath = [];
    for(var iLine = 0; iLine < inputArray.length; iLine++) {
        var thisLine = inputArray[iLine];
        var currentDirectoryPathString = currentDirectoryPath.join('/') || '/';
        var parentDirectoryPathString = currentDirectoryPath.slice(0, currentDirectoryPath.length - 1).join('/') || '/';
        if(thisLine.startsWith('$ cd ')) {
            // update directory
            var directoryToGoTo = thisLine.split('$ cd ').join('');
            if(directoryToGoTo == '..') {
                currentDirectoryPath.pop();
            } else if(directoryToGoTo == '/') {
                currentDirectoryPath = [''];
            } else {
                currentDirectoryPath.push(directoryToGoTo);
            }
        } else if(thisLine.startsWith('$ ls')) {
            // do nothing?
            directoryStructure[currentDirectoryPathString] = {
                name: currentDirectoryPath[currentDirectoryPath.length - 1],
                path: currentDirectoryPathString || '/',
                parentPath: parentDirectoryPathString,
                children: [],
                directChildrenSize: 0
            };
        } else if(thisLine.startsWith('dir')) {
            // directory
            var directoryName = thisLine.split('dir ').join('');
            directoryStructure[currentDirectoryPathString].children.push({name: directoryName});
        } else {
            // file
            var fileInfo = thisLine.split(' ');
            directoryStructure[currentDirectoryPathString].children.push({name: fileInfo[1], size: Number(fileInfo[0])});
            directoryStructure[currentDirectoryPathString].directChildrenSize += Number(fileInfo[0]);
        }
    }

    var directoryPaths = Object.keys(directoryStructure);
    for(var iDirectory = 0; iDirectory < directoryPaths.length; iDirectory++) {
        var thisDirectoryPath = directoryPaths[iDirectory];
        var thisDirectorySize = 0;
        var directoryAndChildrenPaths = directoryPaths.filter(path => path.indexOf(thisDirectoryPath) == 0);
        for(var jDirectory = 0; jDirectory < directoryAndChildrenPaths.length; jDirectory++) {
            thisDirectorySize += directoryStructure[directoryAndChildrenPaths[jDirectory]].directChildrenSize;
        }
        directoryStructure[thisDirectoryPath].size = thisDirectorySize;
    }

    var answerOne = 0;
    for(var iDirectory = 0; iDirectory < directoryPaths.length; iDirectory++) {
        var thisDirectoryPath = directoryPaths[iDirectory];
        var thisDirectorySize = directoryStructure[thisDirectoryPath].size;
        if(thisDirectorySize <= 100000) {
            answerOne += thisDirectorySize;
        }
    }

    var emptySpace = 70000000 - directoryStructure['/'].size;
    var spaceRequired = 30000000 - emptySpace;
    var answerTwo = 70000000;
    for(var iDirectory = 0; iDirectory < directoryPaths.length; iDirectory++) {
        var thisDirectoryPath = directoryPaths[iDirectory];
        var thisDirectorySize = directoryStructure[thisDirectoryPath].size;
        if(thisDirectorySize < answerTwo && thisDirectorySize >= spaceRequired) {
            answerTwo = thisDirectorySize;
        }
    }

    console.log('Total Time: ' + (new Date() - startTime) + 'ms');
    console.log('Answer One: ' + answerOne);
    console.log('Answer Two: ' + answerTwo);
});
