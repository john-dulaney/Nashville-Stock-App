// Author(s): John Dulaney
// Purpose: Starts the routing for my app to run. 
// ┌(° ͜ʖ͡°)┘

const app = angular.module("StockApp", ['ngRoute'])

//this is only here because im sick of tabbing to the api source
//i am an example api url - normal stock
// const exampleCall = () => {
//     const stockFunction = "TIME_SERIES_INTRADAY"
//                         //(1) intraday, (2) daily, (3) weekly, and (4) monthly.
//     const stockSymbol = "MSFT"
//                         // any equity symbol you want
//     const stockInterval = "1min"
//                         // 5min, 15min, 30min, 60min
//     const apiKey = "ZZ2RS5PN56S260FBx"
//                         //fixed
//                     }
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

