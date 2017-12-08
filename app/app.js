// Author(s): John Dulaney
// Purpose: Starts the routing for my app to run. 
// ┌(° ͜ʖ͡°)┘

const app = angular.module("StockApp", ['ngRoute'])


// `https://www.alphavantage.co/query?function=${stockFunction}&symbol=${stockSymbol}&interval=${stockInterval}&apikey=${apiKey}`

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

