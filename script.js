// URL PRINCIPALE: https://boolean-spec-frontend.vercel.app/freetestapi

/*recuperare simultaneamente
- Nome completo della città e paese (/destinations?search={query}, result.name e result.country)

Il meteo attuale (/weathers?search={query}, result.temperature e result.weather_description)

Il nome dell'aereoporto principale (/airports?search={query}, result.name)
*/

async function fetchJason(url){
  const res = await fetch(url)
  const obj = await res.json();
  return obj
}


async function getDashboardData(query){

let dashboard

try {
  const fetchCity = fetchJason(`https://boolean-spec-frontend.vercel.app/freetestapi/destinations?search=${query}`)

  const fetchWeather = fetchJason(`https://boolean-spec-frontend.vercel.app/freetestapi/weathers?search=${query}`)
  console.log(fetchWeather)

  const fetchAirport = fetchJason(`https://boolean-spec-frontend.vercel.app/freetestapi/airports?search=${query}`)

  const result = await Promise.allSettled
  ([fetchCity,fetchWeather,fetchAirport])
  console.log(result[0].value[0].name)

  if (result[0].status === "rejected") {
    console.error("Errore nel recupero della città.");
  }
  
  if (result[1].status === "rejected") {
    console.error("Errore nel recupero del meteo.");
  }
  
  if (result[2].status === "rejected") {
    console.error("Errore nel recupero dell'aeroporto.");
  }

 const cityData    = result[0].status === "fulfilled" ? result[0].value[0] : null;
 const weatherData = result[1].status === "fulfilled" ? result[1].value[0] : null;
 const airportData = result[2].status === "fulfilled" ? result[2].value[0] : null;


 dashboard = {
  city:       cityData?.name || null,
  country:    cityData?.country || null,
  temperature: weatherData?.temperature || null,
  weather:     weatherData?.weather_description || null,
  airport:     airportData?.name || null
};
}
catch(error){
  throw new Error(`Errore nel completamento della richiesta`)
}
return dashboard

 
}

  getDashboardData("london")
  .then(data => {
    console.log(`Dashboard data:`,data);
    console.log(
      (data.city && data.country ? `${data.city} is in ${data.country}.\n` : "") +
      (data.temperature && data.weather ? `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n` : "" ) +
      (data.airport ? `The main airport is ${data.airport}.\n` : "" )
      );
  })
  .catch(error => console.error(error.message))