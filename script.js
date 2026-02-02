const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("city");
const result = document.getElementById("result");

//City name → latitude / longitude
const cities = {
    istanbul:  { lat: 41.01, lon: 28.97 }, nishinomiyako: { lat: 41.01, lon: 28.97 }, nishinomiya:     { lat: 41.01, lon: 28.97 }, "tokyo-takhuto": { lat: 41.01, lon: 28.97 }, constantinople: { lat: 41.01, lon: 28.97 },    //Tokyoは、漢語由来なためにしのみやにした。
    adapazari: { lat: 40.78, lon: 30.40 }, kawashiro:     { lat: 40.78, lon: 30.40 },
    polatli:   { lat: 39.57, lon: 32.09 }, polatlı:       { lat: 39.57, lon: 32.09 }, isenaga:         { lat: 39.57, lon: 32.09 },
    iznik:     { lat: 40.42, lon: 29.71 }, İznik:         { lat: 40.42, lon: 29.71 }, iżnik:           { lat: 40.42, lon: 29.71 }, İżnik:           { lat: 40.42, lon: 29.71 }, nikaiya:        { lat: 40.42, lon: 29.71 },
    ankara:    { lat: 39.93, lon: 32.86 }, karasato:      { lat: 39.93, lon: 32.86 }, miyako:        { lat: 39.93, lon: 32.86 },
    kırıkkale: { lat: 39.84, lon: 33.36 }, kirikkale:     { lat: 39.84, lon: 33.36 }, iwasaki:         { lat: 39.84, lon: 33.36 },
    sungurlu:  { lat: 40.16, lon: 34.37 }, yatosa:        { lat: 40.16, lon: 34.37 },
    çorum:     { lat: 40.54, lon: 34.95 }, corum:         { lat: 40.54, lon: 34.95 }, kunitani:        { lat: 40.54, lon: 34.95 },
    sinop:     { lat: 42.02, lon: 35.15 }, sakitsu:       { lat: 42.02, lon: 35.15 },
    fethiye:   { lat: 36.65, lon: 29.12 }, telmessos:     { lat: 36.65, lon: 29.12 }, terumesu:        { lat: 36.65, lon: 29.12 },
    izmir:     { lat: 38.42, lon: 27.14 }, İzmir:         { lat: 38.42, lon: 27.14 }, iżmir:           { lat: 38.42, lon: 27.14 }, İżmir:           { lat: 38.42, lon: 27.14 }, mirana:         { lat: 38.42, lon: 27.14 },
    antalya:   { lat: 36.90, lon: 30.69 }, atariya: { lat: 36.90, lon: 30.69 },
    bursa:     { lat: 40.19, lon: 29.06 }, furusa: { lat: 40.19, lon: 29.06 },
    nicosia:   { lat: 35.17, lon: 33.35 }, shiramiya: {lat: 35.17, lon: 33.35 }
};

function normalizeCityName(input) {
    return input
        .trim()
        .replace(/İ/g, "i")  //First, replace “İ” with “i”
        .replace(/I/g, "i")  
        .replace(/ı/g, "i")  
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") 
        .toLowerCase();
}


form.addEventListener("submit",function(e){
    e.preventDefault();

    //Use the created function to convert characters like “İ” to “i”
    const city = normalizeCityName(cityInput.value);

    if(city === ""){
        result.innerHTML = "<p>Please enter a city name. </p>"; 
        return;
    }

    if(!cities[city]){
        result.innerHTML = "<p>This city is not supported.</p>";
        return;
    }

    const {lat, lon} = cities[city];

    const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${lat}&longitude=${lon}` +
    `&current_weather=true`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        const tempC = data.current_weather.temperature;
        const tempF = (tempC * 9 / 5) + 32;
        const wind = data.current_weather.windspeed;

        //Temperature and Wind Speed
        result.innerHTML = `
        <h2>${city.toUpperCase()}</h2>
        <p>Temperature：${tempC} ℃ / ${tempF.toFixed(1)} ℉</p>   
        <p>Wind speed：${wind} km/h</p>
      `;
    })
    .catch(() => {
        result.innerHTML = "<p>Failed to retrieve weather information.</p>"; 
    });
});
  