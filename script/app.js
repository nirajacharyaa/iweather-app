const cityForm = document.querySelector("form");
const weatherCard = document.querySelector(".weatherCard");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const updateUI = (data) => {
	const cityDetails = data.cityDetails;
	const weather = data.weather;

	details.innerHTML = `

			<div class="details">
				<h2 class="city-name">${cityDetails.EnglishName}</h2>
				<div class="weather-condition">
					<h5>${weather.WeatherText}</h5>
				</div>
				<div class="temp">
					<span>${weather.Temperature.Metric.Value}</span>
					<span>&deg;C</span>
				</div>
			</div>

	`;

	// update icon and images
	let iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
	icon.setAttribute("src", iconSrc);

	let timeSrc = null;

	if (weather.IsDayTime) {
		timeSrc = "img/day.svg";
	} else {
		timeSrc = "img/night.svg";
	}
	time.setAttribute("src", timeSrc);

	//remove display-none
	weatherCard.classList.remove("d-none");
	details.classList.remove("d-none");
};

const updateCity = async (city) => {
	const cityDetails = await getCity(city);
	const weather = await getWeather(cityDetails.Key);

	return {
		cityDetails,
		weather,
	};
};

cityForm.addEventListener("submit", (e) => {
	e.preventDefault();

	// get city value
	const city = cityForm.city.value.trim();
	cityForm.reset();

	//update the ui with new city
	updateCity(city)
		.then((data) => updateUI(data))
		.catch((err) => console.log(err));

	// store the latest entered location in local storage for next time
	localStorage.setItem("city", city);
});

if (localStorage.getItem("city")) {
	updateCity(localStorage.getItem("city"))
		.then((data) => updateUI(data))
		.catch((err) => console.log(err));
}
