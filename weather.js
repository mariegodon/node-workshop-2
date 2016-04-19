 var prompt = require("prompt");
 var request = require("request");
 var util = require("util");
 var emoji = require("node-emoji");
 var Table = require("cli-table");
 //console.log(util.inspect(dailyWeather, { showHidden: true, depth: 100, colors: true }));

 function getWeatherEmoji(weather) {
     var weather = weather.toLowerCase();
     if (weather.indexOf("drizzle") !== -1 || weather.indexOf("rain") !== -1) {
         return emoji.get("rain_cloud");
     }
     else if (weather.indexOf("cloudy") !== -1) {
         return emoji.get("barely_sunny");
     }
     else if (weather.indexOf("sun") !== -1 || weather.indexOf("sunny") !== -1 || weather.indexOf("clear") !== -1) {
         return emoji.get("sun_with_face");
     }
 }

 function weatherPhrase(temp) {
     if (temp >= 86) {
         return "Damn it is HOT!!";
     }
     else if (temp >= 68) {
         return "Its gettin hot in hurr";
     }
     else if (temp >= 59) {
         return "Ahh perfect temperature!";
     }
     else if (temp >= 41) {
         return "I said brr.. Its cold in here.. ";
     }
     else if (temp >= 23) {
         return "Time to go skiing";
     }
     else {
         return "WHY CANADA WHY?!?"
     }
 }

 prompt.start();

 var geoloc = "https://maps.googleapis.com/maps/api/geocode/json?address=";
 prompt.get(["What is your location?"], function(err, loc) {
     request(geoloc + loc["What is your location?"], function(err, result) {
         var resultObj = JSON.parse(result.body);
         //console.log(util.inspect(resultObj, { showHidden: false, depth: 10, colors: true }));
         var userLat = resultObj.results[0].geometry.location.lat;
         var userLong = resultObj.results[0].geometry.location.lng;

         var weather = "https://api.forecast.io/forecast/822174c59d0165f817985128d3aa46b3/";
         request(weather + userLat + "," + userLong, function(err, weatherJSON) {

             var weatherObj = JSON.parse(weatherJSON.body);
             var currentWeatherTemperature = weatherObj.currently.apparentTemperature;
             var currentWeatherSummary = weatherPhrase(currentWeatherTemperature);
             var currentEmoji = getWeatherEmoji(weatherObj.currently.summary);
             var currentWeatherPP = weatherObj.currently.precipProbability;
             var dailyWeather = weatherObj.daily.data;
             var weeklyConditions = {
                 first: {
                     "summary": weatherPhrase(dailyWeather[0].temperatureMax),
                     "temp": dailyWeather[0].temperatureMax,
                     "rain": dailyWeather[0].precipProbability,
                     "emoji": getWeatherEmoji(dailyWeather[0].summary)
                 },
                 second: {
                     summary: weatherPhrase(dailyWeather[1].temperatureMax),
                     temp: dailyWeather[1].temperatureMax,
                     rain: dailyWeather[1].precipProbability,
                     emoji: getWeatherEmoji(dailyWeather[1].summary)
                 },
                 third: {
                     summary: weatherPhrase(dailyWeather[2].temperatureMax),
                     temp: dailyWeather[2].temperatureMax,
                     rain: dailyWeather[2].precipProbability,
                     emoji: getWeatherEmoji(dailyWeather[2].summary)
                 },
                 fourth: {
                     summary: weatherPhrase(dailyWeather[3].temperatureMax),
                     temp: dailyWeather[3].temperatureMax,
                     rain: dailyWeather[3].precipProbability,
                     emoji: getWeatherEmoji(dailyWeather[3].summary)
                 },
                 fifth: {
                     summary: weatherPhrase(dailyWeather[4].temperatureMax),
                     temp: dailyWeather[4].temperatureMax,
                     rain: dailyWeather[4].precipProbability,
                     emoji: getWeatherEmoji(dailyWeather[4].summary)
                 }
             }
             var tableWeek = new Table({
                 head: ["Day", "Summary", emoji.get("question"), emoji.get("thermometer"), "POP"]
             });
             tableWeek.push({
                 "Sunday": [weeklyConditions.first.summary, weeklyConditions.first["emoji"], weeklyConditions.first.temp, weeklyConditions.first.rain]
             }, {
                 "Monday": [weeklyConditions.second.summary, weeklyConditions.second["emoji"], weeklyConditions.second.temp, weeklyConditions.second.rain]
             }, {
                 "Tuesday": [weeklyConditions.third.summary, weeklyConditions.third["emoji"], weeklyConditions.third.temp, weeklyConditions.third.rain]
             }, {
                 "Wednesday": [weeklyConditions.fourth.summary, weeklyConditions.fourth["emoji"], weeklyConditions.fourth.temp, weeklyConditions.fourth.rain]
             }, {
                 "Thursday": [weeklyConditions.fifth.summary, weeklyConditions.fifth["emoji"], weeklyConditions.fifth.temp, weeklyConditions.fifth.rain]
             });

             var tableCurr = new Table({
                 head: [" ", "Current Conditions", emoji.get("question"), emoji.get("thermometer"), "POP"]
             });
             tableCurr.push({
                 "NOW!": [currentWeatherSummary, currentEmoji, currentWeatherTemperature, currentWeatherPP]
             });

             console.log(tableCurr.toString());
             console.log("And for the rest of the week...")
             console.log(tableWeek.toString());

         });
     });
 });