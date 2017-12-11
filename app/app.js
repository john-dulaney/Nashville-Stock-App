// Author(s): John Dulaney
// Purpose: Starts the routing for my app to run. 
// ┌(° ͜ʖ͡°)┘

const app = angular.module("StockApp", ['ngRoute']) //, 'angular-loading-bar'


// `https://www.alphavantage.co/query?function=${stockFunction}&symbol=${stockSymbol}&interval=${stockInterval}&apikey=${apiKey}`
// ----------------------------------^the market to draw from---------^3-4 letters-------------^interval of data--------^apikey
//i am an example api url - BITCOIN ONLY - to USD
// `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_INTRADAY&symbol=BTC&market=USD&apikey=ZZ2RS5PN56S260FBx`

// $.ajax({
//     url: `https://www.alphavantage.co/query?function=${stockFunction}&symbol=${stockSymbol}&interval=${stockInterval}&apikey=${apiKey}`
// });

// $("#stockToGet").click(function () {
//     stockThatGot = document.getElementById("getStock").value;
//     $("#GetStock").val(" ");
//     return false;
// });

