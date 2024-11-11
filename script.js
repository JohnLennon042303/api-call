async function getWeather() {
    const apiKey = "e9fe17b85b313e46254d8a5cde9cd85b";
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
        
        // Displaying weather information
        document.getElementById("weatherDisplay").innerHTML = `
            <p><strong>${locationName}</strong></p>
            <p>Temperature: ${temperature}°C</p>
            <p>Condition: ${weatherDescription}</p>
        `;

        // Set background color based on weather conditions
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
        bgColor = isDay ? "#87CEEB" : "#2c3e50"; // Lighter blue for day, dark blue for night
    } else if (description.includes("cloud")) {
        bgColor = isDay ? "#d3d3d3" : "#778899"; // Light grey for cloudy day, dark slate for night
    } else if (description.includes("rain") || description.includes("storm")) {
        bgColor = "#5f9ea0"; // Blue-gray for rainy weather
    } else if (description.includes("snow")) {
        bgColor = "#f0f8ff"; // Light blue-white for snowy weather
    } else {
        bgColor = "#ffffff"; // Default to white for unknown weather
    }

    document.body.style.backgroundColor = bgColor;
}
