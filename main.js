
document.addEventListener("DOMContentLoaded", function () {

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

    let wind = ''
    let windir = ''
    let temp = ''
    let time = ''
    let country = ''
    let population = ''

    const url = 'https://geocoding-api.open-meteo.com/v1/search?name=' + city
    const options = {
        method: 'GET',
    }

    try {
        const response = await fetch(url, options)
        if (!response.ok) {
            invalidCity()
            return
        }

        const result = await response.json()

        const longitude = result['results'][0]['longitude']
        const latitude = result['results'][0]['latitude']

        country = result['results'][0]['country']
        population = result['results'][0]['population']
  
        const weather_url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`

        const weatherOptions = {
            method: 'GET',
        }

        try {
            const response = await fetch(weather_url, weatherOptions)
            if (!response.ok) {
                invalidCity()
                return
            }

            const weather_result = await response.json()


            const final_res = weather_result['current_weather']
        

            wind = final_res["windspeed"].toString()
            windir = final_res["winddirection"].toString()
            temp = final_res["temperature"].toString() + "℃"
            time = final_res["time"].toString()
     

        


        } catch (err) {
            console.log(err)
        }





        let countryHolder = document.getElementById("country")
        countryHolder.innerHTML = country

        let windHolder = document.getElementById("wind")
        windHolder.innerHTML = wind

        let populationHolder = document.getElementById("population")
        populationHolder.innerHTML = population

        let tempHolder = document.getElementById("temp")
        tempHolder.innerHTML = temp

        let windirHolder = document.getElementById("windir")
        windirHolder.innerHTML = windir

        function showClock() {
            return time.split("T")[1]; // gets "23:34"
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

function invalidCity() {

    let old = document.querySelector(".search input")
    let oldText = old.value

    let msg = "An error occured, try again!"
    old.value = msg
    old.style.color = "red"
    old.style.fontFamily = "lato"
    old.style.fontSize = "1rem"
    old.setAttribute("readonly", "readonly")

    setTimeout(function () {
        old.value = oldText
        old.style.color = "white"
        old.removeAttribute("readonly")
    }, 1000)
}

function showMenuBar() {

    let x = document.querySelectorAll("header > div")
    x[0].style.display = "flex"

    setTimeout(function () {
        x[0].style.opacity = "1"
    }, 80)

}

function hideMenuBar() {

    let x = document.querySelectorAll("header > div")
    x[0].style.display = "none"

    setTimeout(function () {
        x[0].style.opacity = "0"
    }, 80)
}