app.filter('convertToTwelve ', function () {
    return function (inputTime) {
      var splitTime = inputTime.split(':');
      splitTime[0] = splitTime[0] % 12;
  
      return splitTime.join(':');        
    };
  });