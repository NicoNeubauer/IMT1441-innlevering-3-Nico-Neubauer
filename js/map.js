
const mymap = L.map('mapid').setView([60.788938, 10.681592], 15); //velge start punkt
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoib2tvbGxvZW4iLCJhIjoiY2p0dHVqNjkzMHhzejRkbW1uOThuOGNnMyJ9.ZghCItafslYo45FTIpaZsw', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> '+
  'contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, '+
  'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>', //hente mappet
maxZoom: 17, //velge zoom level
id: 'mapbox.streets',
accessToken: 'pk.eyJ1Ijoib2tvbGxvZW4iLCJhIjoiY2p0dHVqNjkzMHhzejRkbW1uOThuOGNnMyJ9.ZghCItafslYo45FTIpaZsw'
}).addTo(mymap); //accses tocen for å indetifisere brukeren

document.getElementById("infotabel").addEventListener("click", e=>{ //hører på klikke på lista
  let hvor = [e.path[1].children[4].innerHTML]+`+`+[e.path[1].children[6].innerHTML]+`+` //legger de to siste valune i søket på sted.

  //legger data i linken og får tilbake infoen jeg trenger som json med kordinater

    fetch(`https://nominatim.openstreetmap.org/search?q=${hvor}&format=json&polygon=1&addressdetails=1`)
    .then(res=>res.json())
    .then(data=>{
    mymap.setView([data[0].lat, data[0].lon], 17);
    })
})
/* Kartet virker ikke helt som den skal den er treig og det har muligens med CSS å gjære fordig 
når den blir mindre eller større loader den fort og funker som den skal. jeg fikk også ikke til 
å gjøre det med en feilmelling jeg prøvde med if els og med å bruke functions med fikk ikke til på slutten desverre.
 */

