let formElement = document.querySelector("form");
let inputElement = document.querySelector("#mainInput");
let btnElement = document.querySelector("#mainBtn");
getWeather();

formElement.addEventListener("submit", function (e) {
  e.preventDefault();
  getWeather();
});

async function getWeather() {
  let request = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=26710a97782d462e971133604241512&q=cairo&days=3`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (request.ok === true) {
    console.log(request);

    let data = await request.json();
    displayWeather(data);
  }
}
function displayWeather(list) {
  let blackBox = "";
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = new Date();

  const dayOne = days[today.getDay()];
  const dateOne = `${today.getDate()} ${today.toLocaleString("default", {
    month: "long",
  })}`;

  const dayTwo = days[(today.getDay() + 1) % 7];
  const dayAfterOne = new Date(today);
  dayAfterOne.setDate(today.getDate() + 1);
  const dateTwo = `${dayAfterOne.getDate()} ${dayAfterOne.toLocaleString(
    "default",
    { month: "long" }
  )}`;

  const dayThree = days[(today.getDay() + 2) % 7];
  const dayAfterTwo = new Date(today);
  dayAfterTwo.setDate(today.getDate() + 2);
  const dateThree = `${dayAfterTwo.getDate()} ${dayAfterTwo.toLocaleString(
    "default",
    { month: "long" }
  )}`;

  blackBox = `
      <div class="col-md-12 col-lg-4 one sePro">
        <div class="cardOne h-100" >
          <div class="header-card-one py-2 px-2 d-flex justify-content-between">
            <div><span>${dayOne}</span></div>
            <div><span>${dateOne}</span></div>
          </div>
  
          <div class="ps-3 body-card-one">
            <h4 id="counteryCard" class="pt-4">${list.location.name}</h4>
            <div id="WeatherDegreeOne" class="weather-details-one text-center text-white">
              ${list.current.temp_c}<span class="upper">o</span>C
            </div>
  
            <div>
              <img src="${list.forecast.forecastday[0].day.condition.icon}" class="img-fluid" alt="">
            </div>
            <div class="mt-4">
              <span id="weatherStatusOne">${list.forecast.forecastday[0].day.condition.text}</span>
            </div>
  
            <div class="d-flex gap-3 py-4 details-one">
              <span><img src="images/icon-umberella.png" class="pe-2" alt="">20%</span>
              <span><img src="images/icon-wind.png" alt="" class="pe-2">18km/h</span>
              <span><img src="images/icon-compass.png" class="pe-2" alt="">East</span>
            </div>
          </div>
        </div>
      </div>
  
      <div class="col-md-12 col-lg-4 two sePro">
        <div class="cardTwo  text-center h-100">
          <div class="headerCardTwo py-2 px-2">
            <span>${dayTwo}</span>
          </div>
  
          <div class="ps-3 body-card-two">
            <div class="text-center py-5">
              <img src="${list.forecast.forecastday[1].day.condition.icon}" class="img-fluid" alt="">
            </div>
  
            <div class="weather-details-Two text-white">
              <p>${list.forecast.forecastday[1].day.maxtemp_c}<span class="upper-two">o</span>C</p>
              <span>${list.forecast.forecastday[1].day.mintemp_c}<span class="upper-two">o</span>C</span>
            </div>
            <div class="mt-4">
              <span id="weatherStatusTwo">${list.forecast.forecastday[1].day.condition.text}</span>
            </div>
          </div>
        </div>
      </div>
  
      <div class="col-md-12 col-lg-4 three sePro">
        <div class="cardThree text-center h-100">
          <div class="headerCardThree py-2 px-2">
            <span>${dayThree}</span>
          </div>
  
          <div class="ps-3 body-card-three">
            <div class="text-center py-5">
              <img src="${list.forecast.forecastday[2].day.condition.icon}" class="img-fluid" alt="">
            </div>
  
            <div class="weather-details-three text-white">
              <p>${list.forecast.forecastday[2].day.maxtemp_c}<span class="upper-two">o</span>C</p>
              <span>${list.forecast.forecastday[2].day.mintemp_c}<span class="upper-two">o</span>C</span>
            </div>
            <div class="mt-4">
              <span id="weatherStatusThree">${list.forecast.forecastday[2].day.condition.text}</span>
            </div>
          </div>
        </div>
      </div>
    `;

  document.getElementById("mainWeather").innerHTML = blackBox;
}

async function getWeatherTwo(code) {
  let request = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=26710a97782d462e971133604241512&q=${code}&days=3`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (request.ok === true) {
    console.log(request);

    let data = await request.json();
    console.log(data);
    displayWeather(data);
    console.log(data);
  }
}

inputElement.addEventListener("input", function (e) {
  console.log(e.target.value);
  var searchPro = e.target.value;
  getWeatherTwo(searchPro);
});
