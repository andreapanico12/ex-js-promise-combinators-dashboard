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

  const fetchAirport = fetchJason(`https://boolean-spec-frontend.vercel.app/freetestapi/airports?search=${query}`)
  const result = await Promise.all
  ([fetchCity,fetchWeather,fetchAirport])

  dashboard ={ 
    city : result[0][0].name,
    country: result[0][0].country,
    temperature: result[1][0].temperature,
    weather:result[1][0].weather_description,
    airport:result[2][0].name
  }
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
      `${data.city} is in ${data.country}.\n` +
      `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`+
      `The main airport is ${data.airport}.\n`
      );
  })
  .catch(error => console.error(error.message))