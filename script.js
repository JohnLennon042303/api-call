async function getWeather() {
    const apiKey = "2330899c2d487949f3501e2df11c63c2
";
    const location = document.getElementById("locationInput").value;
    if (!location) {
        alert("Please enter a location.");
        return;
    }

    try {
        const response = await fetch(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${location}`);
        const data = await response.json();

        if (data.success === false) {
            alert(data.error.info);
            return;
        }

        const weatherInfo = data.current;
        const locationName = data.location.name;
        const temperature = weatherInfo.temperature;
        const weatherDescription = weatherInfo.weather_descriptions[0];
        const isDay = weatherInfo.is_day === "yes";
        
        
        document.getElementById("weatherDisplay").innerHTML = `
            <p><strong>${locationName}</strong></p>
            <p>Temperature: ${temperature}°C</p>
            <p>Condition: ${weatherDescription}</p>
        `;

        
        setBackground(weatherDescription, isDay);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("There was an error fetching the weather data.");
    }
}

function setBackground(description, isDay) {
    let bgColor;
    description = description.toLowerCase();

    if (description.includes("sun") || description.includes("clear")) {
        bgColor = isDay ? "#87CEEB" : "#2c3e50";
    } else if (description.includes("cloud")) {
        bgColor = isDay ? "#d3d3d3" : "#778899"; 
    } else if (description.includes("rain") || description.includes("storm")) {
        bgColor = "#5f9ea0"; 
    } else if (description.includes("snow")) {
        bgColor = "#f0f8ff"; 
    } else {
        bgColor = "#ffffff"; 
    }

    document.body.style.backgroundColor = bgColor;
}
