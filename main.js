
document.addEventListener("DOMContentLoaded", function() {

    let srch_bar = document.querySelector(".search input")
    srch_bar.value = "Peshawar"

    let temp = document.getElementById("temp")
    temp.style.fontSize = "4rem"
    temp.style.color = "white"
   
    let screen = document.getElementsByClassName("main")
    screen[0].style.opacity = "1"

    checkWeather()
})

async function checkWeather(city) {

    var srch = document.querySelector(".search input")
    var city = srch.value

    const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'bc03e5183dmsh112b1bdaef6753ap1f4079jsn3a46c0b958ab',
            'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
        }
    }

    try {
        const response = await fetch(url, options)
        if (!response.ok) {
            invalidCity()
            return
        }

        const result = await response.json()

        let humidity = result["humidity"] + "%"
        let wind = result["wind_speed"]
        let windeg = result["wind_degrees"]
        let feel = result["feels_like"] + "%"
        let temp = result["temp"] + "℃"


        let humidityHolder = document.getElementById("humidity")
        humidityHolder.innerHTML = humidity

        let windHolder = document.getElementById("wind")
        windHolder.innerHTML = wind

        let feelHolder = document.getElementById("feel")
        feelHolder.innerHTML = feel

        let tempHolder = document.getElementById("temp")
        tempHolder.innerHTML = temp

        let windegHolder = document.getElementById("windeg")
        windegHolder.innerHTML = windeg

        function showClock() {
            var time = new Date();
            return time.toLocaleString('en-us', { hour: 'numeric', minute: 'numeric', hour12: true })
        }
        const clock = document.getElementById("clock")

        // the clock updates every second
        setInterval(function () {
            const d = showClock();
            clock.innerHTML = d
        }, 1000)


    } catch (error) {
        console.error(error);
    }
}

function invalidCity () {

    let old = document.querySelector(".search input")
    let oldText = old.value

    let msg = "An error occured, try again!"
    old.value = msg
    old.style.color = "red"
    old.style.fontFamily = "lato"
    old.style.fontSize = "1rem"
    old.setAttribute("readonly", "readonly")

    setTimeout(function() {
        old.value = oldText
        old.style.color = "white"
        old.removeAttribute("readonly")
    }, 1000)
}

function showMenuBar () {

    let x = document.querySelectorAll("header > div")
    x[0].style.display = "flex"

    setTimeout(function() {
        x[0].style.opacity= "1"
    }, 80)

}

function hideMenuBar () {
    
    let x = document.querySelectorAll("header > div")
    x[0].style.display = "none"

    setTimeout(function() {
        x[0].style.opacity= "0"
    }, 80)
}