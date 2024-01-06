// Import the http module
var http = require("http")
require('dotenv').config();


// Get the address from the command line arguments
var address = process.argv[2]

const API_KEY = process.env.API_KEY;

// Build the URL for the OpenWeatherMap API call
var url = `http://api.openweathermap.org/data/2.5/weather?q=${address}&units=metric&appid=${API_KEY}`

// Create an HTTP server using the http module
var server = http.createServer(function(request,response){

    // Get the address from the query parameter
    //var address = request.url.split("?address=")[1];

    // Build the URL for the OpenWeatherMap API call
    //var url = `http://api.openweathermap.org/data/2.5/weather?q=${address}&units=metric&appid=${API_KEY}`;

    // Import the request module to make the API call
    var request = require("request");
    
    // Make the API call to the OpenWeatherMap API
    request(url, function(error, res, body) {
        
        // Parse the response from the API call as JSON
        var data = JSON.parse(body);
        
        // Write the response HTML to the client
        const cityName = data.name;
        const temperature = data.main.temp;
        const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
        const message = `City Name: ${cityName}<br>Temperature: ${temperature}&deg;C<br>Sunset Time: ${sunsetTime}`;

        response.write(`<html><body><div id='container'><h1>${message}</h1></div></body></html>`);
        
        // End the response
        response.end();
    });
    
}).listen(8081); // Listen for incoming HTTP requests on port 8081
