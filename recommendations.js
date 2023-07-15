'use strict';

// https://www.geeksforgeeks.org/how-to-retrieve-get-parameters-from-javascript/
const getParameter = (key) => {
    let address = window.location.search;
    let parameterList = new URLSearchParams(address);
    return parameterList.get(key);
}

document.getElementById("weather-header").textContent = "Today's weather for: " + getParameter("location");

function generateRecommendation() {
    
}