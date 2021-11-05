const KEY = "HuKT2eLSs4It2FupYyMuTAusDPcE7YIF";

//get weather information
const getWeather = async (cityId) => {
	const base = "https://dataservice.accuweather.com/currentconditions/v1/";
	const query = `${cityId}?apikey=${KEY}`;

	const response = await fetch(base + query);

	const data = await response.json();

	return data[0];
};

//get city information
const getCity = async (city) => {
	const base =
		"https://dataservice.accuweather.com/locations/v1/cities/search";
	const qureies = `?apikey=${KEY}&q=${city}`;

	const response = await fetch(base + qureies);

	const data = await response.json();
	return data[0];
};
