fetch('https://adventofcode.com/2021/day/17/input').then(function (response) {
    return response.text();
}).then(function (text) {
    var startTime = new Date();
        var inputArray = text.split('\n');
        inputArray.pop();

        var inputString = inputArray[0];

        var coordsX = inputString.split('target area: ').join('').split(', ')[0].split('x=').join('').split('..');
        var coordsY = inputString.split('target area: ').join('').split(', ')[1].split('y=').join('').split('..');
        var minX = coordsX[0] > coordsX[1] ? coordsX[1]*1 : coordsX[0]*1;
        var maxX = coordsX[0] > coordsX[1] ? coordsX[0]*1 : coordsX[1]*1;
        var minY = coordsY[0] > coordsY[1] ? coordsY[1]*1 : coordsY[0]*1;
        var maxY = coordsY[0] > coordsY[1] ? coordsY[0]*1 : coordsY[1]*1;

        // setting it to Math.abs(minY) will overshoot by 1.  Setting it to 1 less than that.  
        // arc always hits 0.  Next step into negative will always be initial Y velocity amount.  
        var maxPossibleYSpeed = Math.abs(minY) - 1;

        var answerOne = (maxPossibleYSpeed * (maxPossibleYSpeed + 1)) / 2;

        var minPossibleYSpeed = minY;

        var minPossibleXSpeed = 0;
        var nextNumber = 0;
        while(!(nextNumber >= minX && nextNumber <= maxX)) {
            minPossibleXSpeed++;
            nextNumber = (minPossibleXSpeed * (minPossibleXSpeed + 1)) / 2;
        }

        var maxPossibleXSpeed = maxX;


        function doesTrajectoryLandInZone(xSpeed, ySpeed) {
            var currentXSpeed = xSpeed*1;
            var currentYSpeed = ySpeed*1;

            var lastPoint = [0,0];
            var maxIterations = 999;
            while(lastPoint[0] <= maxX && lastPoint[1] >= minY && maxIterations > 0) {
                maxIterations--;
                var newPoint = JSON.parse(JSON.stringify(lastPoint));
                newPoint[0] += currentXSpeed;
                newPoint[1] += currentYSpeed;
                lastPoint = newPoint;
                currentXSpeed = Math.max(currentXSpeed - 1, 0);
                currentYSpeed = currentYSpeed - 1;

                if(newPoint[0] >= minX && newPoint[0] <= maxX && newPoint[1] >= minY && newPoint[1] <= maxY) {
                    return true;
                }
            }
            return false;
        }

        var answerTwo = 0;
        for(var iX = minPossibleXSpeed; iX <= maxPossibleXSpeed; iX++) {
            for(var iY = minPossibleYSpeed; iY <= maxPossibleXSpeed; iY++) {
                if(doesTrajectoryLandInZone(iX, iY)) {
                    answerTwo++;
                }
            }
        }


        console.log('Total Time: ' + (new Date() - startTime) + 'ms');
        console.log('Answer One: ' + answerOne);
        console.log('Answer Two: ' + answerTwo);
});
