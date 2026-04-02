// get HTML elements
let historyBox = document.getElementById("historyBox");
let cityInput = document.getElementById("cityInput");

// this will get cities from localStorage
function getCities(){
    let data = localStorage.getItem("cities");
    if(data == null){
        return [];
    } else {
        return JSON.parse(data);
    }
}

// this will save city to localStorage
function saveCity(city){
    let list = getCities();
    if(!list.includes(city)){   // ✅ fixed condition
        list.push(city);
    }
    localStorage.setItem("cities", JSON.stringify(list));
}

// this is going to show history buttons
function showHistory(){
    historyBox.innerHTML = "";
    let list = getCities();
    for(let i = 0; i < list.length; i++){
        let city = list[i];
        let btn = document.createElement("button");
        btn.innerText = city;
        btn.className = "button";
        btn.onclick = function(){
            getWeather(city);
        };
        historyBox.appendChild(btn);
    }
}
// we first get the city and now here we are setting the city to local storage so it may stay there even if the browser gets refreshed. The json.stringfy converts the array to string because local storage cannot store array directly.

// when user clicks this will search 
function searchWeather(){
    let city = cityInput.value;
    if(city === ""){
        console.log("Enter city name");
        return;
    }
    getWeather(city);
}

// this is the main function to fetch weather data through API.
async function getWeather(city){
    console.log("Start");
    console.log("Fetching the data");
    try{
        let response = await fetch("https://wttr.in/" + city + "?format=j1");
        let data = await response.json();

        //this will  display weather info
        document.getElementById("cityText").innerText = city;
        document.getElementById("tempText").innerText = data.current_condition[0].temp_C + " C";
        document.getElementById("weatherText").innerText = data.current_condition[0].weatherDesc[0].value;
        document.getElementById("humidityText").innerText = data.current_condition[0].humidity;
        document.getElementById("windText").innerText = data.current_condition[0].windspeedKmph;

        // here we have saved city and updated the history
        saveCity(city);
        showHistory();

    } catch(error){
        console.log("Error fetching data");
        document.getElementById("cityText").innerText = "Not Found";
        document.getElementById("tempText").innerText = "-";
        document.getElementById("weatherText").innerText = "-";
        document.getElementById("humidityText").innerText = "-";
        document.getElementById("windText").innerText = "-";
    }

   
}

// this will show history on page load
showHistory();
