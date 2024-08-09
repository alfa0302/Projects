const apiKey='40c911c0e120829a6676258a4f4fb179';
const apiUrl=`https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&q=`;

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');

searchBtn.addEventListener('click',()=>{
  let city = searchBox.value.trim();
  if(city){
    updateWeather(city);
    document.querySelector('.weather-block').style.display = 'block';
    document.querySelector('.error').style.display = 'none';
  }else{
    document.querySelector('.error').style.display = 'block';
  }
  
  
})

async function updateWeather(city){
  const response = await fetch(apiUrl+city);
  if(response.status == 404){
    document.querySelector('.error').style.display = 'block';
    document.querySelector('.weather-block').style.display = 'none';
  }else{
    var data = await response.json();
    console.log(data);
    document.querySelector('.city').innerHTML= data.name;
    document.querySelector('.temp').innerHTML= Math.round(data.main.temp) + '&deg;c';
    document.querySelector('.humidity').innerHTML= data.main.humidity + '%';
    document.querySelector('.wind').innerHTML= data.wind.speed + ' km/h';

    updateWeatherIcon(data);
  }
}

function updateWeatherIcon(data){
  if(data.weather[0].main === 'Clouds'){
    document.querySelector('.weather-icon').src = 'images/clouds.png'
  }else if(data.weather[0].main === 'Clear'){
    document.querySelector('.weather-icon').src = 'images/clear.png'
  }else if(data.weather[0].main === 'Rain'){
    document.querySelector('.weather-icon').src = 'images/rain.png'
  }else if(data.weather[0].main === 'Drizzle'){
    document.querySelector('.weather-icon').src = 'images/drizzle.png'
  }else if(data.weather[0].main === 'Mist'){
    document.querySelector('.weather-icon').src = 'images/mist.png'
  }
}
