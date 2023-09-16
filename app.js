 const getLoc = async () => {
    const url = 'http://ip-api.com/json/?fields=country,city,lat,lon,timezone';

    const response = await fetch(url);
    const data = await response.json();

    return data;
 }


const getWeather = async (lat, lon) => {

    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f0894defae7c5584798f8812232a40c2`;
    
    const response = await fetch(url);
    const data = await response.json();

    return data;
}


function getDayOrNight(){
    let DayOrNight;
    let d = new Date(); 

    if(d.getHours() >= 6 && d.getHours() <= 19){
        DayOrNight = 'Day '
    } else{
        DayOrNight = 'Night'
    }
}


function getIcon(weMain){ 
    let icon;
    switch(weMain) {
        case 'Thunderstorm': 
            icon = `${weMain}.svg`;
            break;
        case 'Drizzle':
            icon = `${weMain}.svg`;
            break;
        case 'Rain':
            icon = `${weMain}.svg`;
            break;
        case 'Snow':
            icon = `${weMain}.svg`;
            break;
        case 'Clear':
            const DayOrNight = getDayOrNight();
            icon = `${weMain}-${DayOrNight}.svg`;
        break;
        case 'Clouds':
            icon = `${weMain}.svg`;
            break;
        case 'Atmospher':
            icon = `${weMain}.png`;
            break;
    }
    return icon;
}


function getTemp(weTemp){  
    const k = weTemp;
    const f = (k - 273.15) * 9/5 + 32;
    const c = k - 273.15;

   
    return temp = {kel:Math.floor(k), far:Math.floor(f),
    can:Math.floor(c)}; // kel = کلوین / far = فارنهایت / can = سانتیگراد
}

// loti = location time zone
const loti = document.querySelector('.timezone'); 
const icon = document.querySelector('.icon');
// dese = degree-section
const dese = document.querySelector('.degree-section');
// deg = degree
const deg = document.querySelector('.degree-section h2');

const unit = document.querySelector('.degree-section span');

// tede = temperature-description
const tede = document.querySelector('.temperature-description');

getLoc().then(locData => {
    const timeZone = locData.timezone;
    console.log(timeZone);
    loti.textContent = timeZone;
    return getWeather(locData.lat, locData.lon)
}).then(weData => {
    console.log(weData);
    const weTemp = weData.main.temp;
    const weMain = weData.weather[0].main;
    const weDes = weData.weather[0].description;
    console.log(weTemp, weMain, weDes);

    const iconName = getIcon(weMain);
    icon.innerHTML = `<img src = 'icons/${iconName}'></img>`;

    deg.textContent = Math.floor(weTemp);
    unit.textContent = 'K';

    dese.addEventListener('click', function(e){
        if(unit.textContent == 'K'){
            deg.textContent = getTemp(weTemp).far;
            unit.textContent = 'F';
        } else if(unit.textContent == 'F'){
            deg.textContent = getTemp(weTemp).can;
            unit.textContent = 'C';
        } else{
            deg.textContent = getTemp(weTemp).kel;
            unit.textContent = 'K';
        }
    })

    tede.textContent = weDes;
    
})

