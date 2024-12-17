
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from '../images/icon-location.svg';
import{validateIP, addTitleLayer} from './helpers';

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('button');

const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');

btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

const myIcon = L.icon({
    iconUrl: icon,
    iconSize:     [30, 40], // size of the icon
   // shadowSize:   [50, 64], // size of the shadow
    //iconAnchor:   [22, 94],
})

const mapArea = document.querySelector('.map');
const map = L.map(mapArea,{
    center: [51.505, -0.09],
    zoom: 13,
    zoomControl: false,
})

addTitleLayer(map);
//hi!!!!!!!
//L.marker([51.505, -0.09]).addTo(map);

L.marker([51.505, -0.09], {icon: myIcon}).addTo(map);

function getData() {
    if(validateIP(ipInput.value))
    {
    fetch(`https://geo.ipify.org/api/v1/?apiKey=at_h2WlNss5VQUNoZoOovQG3yGCOOBp3&ipAddress=${ipInput.value}`)
    .then(response => response.json())
    .then(date=>setInfo(date))
    }
}

function handleKey(event){
    if(event.key === 'Enter'){
        getData();
    }
}

function setInfo(mapDate){
    console.log(mapDate);

    const {lat, lng, location, timezone, region} = mapDate.location;

    ipInfo.innerText = mapDate.ip;
    locationInfo.innerText = mapDate.location.country+' '+ mapDate.location.region;
    timezoneInfo.innerText = mapDate.location.timezone;
    ispInfo.innerText = mapDate.isp;

    map.setView([lat, lng], 13);
    L.marker([lat, lng], {icon: myIcon}).addTo(map);
}

