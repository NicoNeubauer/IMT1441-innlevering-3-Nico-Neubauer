//lage noen konst som gjør ting lettere etterpå
const tabel1 = document.getElementById("table1")
const search1 = document.getElementById('search')

fetch('http://folk.ntnu.no/oeivindk/imt1441/storage/getAll.php?store=niconeu') //hvor infoen er fra
 .then(res=>res.json())
 .then(data=>{

  search1.addEventListener('input', e=>{ //denne kodebiten sørger for at når søkefeltet er tomt vises det ikke no på siden 
if(e.target.value!=""){ // når søkefeltet er ikke lik ingenting vises infoen
  visStudenter(data.data.filter(filter));
}else{
  tabel1.innerHTML=""; // når den er tom vivev ikke noe
}
});
 
function filter(kontakt) { //denne filterfunsjoen gjør at vi kan søke på fornavn eller etternavn
const namel = kontakt.lastName.toLowerCase().indexOf(search1.value.toLowerCase())>-1; //etternavn søk
const namef = kontakt.givenName.toLowerCase().indexOf(search1.value.toLowerCase())>-1; //fornavn søk
return namel||namef; //returne resutat av søket
}

function visStudenter(data) { //visStudenter funsjonen lager <td> ellementer for infoen som skal vises fra serveren
  tabel1.innerHTML = '';
  data.forEach(kontakt=>{ // for eatch at vi får med alle
    const tr = document.createElement('TR');
    tr.innerHTML = `<td>${kontakt.givenName}</td> <td>${kontakt.lastName}</td> <td>${kontakt.Email}</td> <td>${kontakt.tlf}</td> <td>${kontakt.gate}</td> <td>${kontakt.postNummer}</td> <td>${kontakt.sted}</td> `;
    tabel1.appendChild (tr); //henger den i DOMen
    
  });
}
//for å ta tak i innput feltene
const fornavn = document.getElementById("inputfor2");
const etternavn = document.getElementById("inputett2");
const epost = document.getElementById("inputep2");
const tlf = document.getElementById("inputT2");
const Gate = document.getElementById("inputg2");
const Postnummer = document.getElementById("inputP2");
const Sted = document.getElementById("inputS2");

document.querySelector("table").addEventListener("click", e=>{
  fornavn.value = [e.path[1].children[0].innerHTML];
  etternavn.value =[e.path[1].children[1].innerHTML];
  epost.value =[e.path[1].children[2].innerHTML];
  tlf.value =[e.path[1].children[3].innerHTML];
  Gate.value =[e.path[1].children[4].innerHTML];
  Postnummer.value =[e.path[1].children[5].innerHTML];
  Sted.value =[e.path[1].children[6].innerHTML];

});
document.getElementById("edit").addEventListener("click", e=>{ //event lisen på knapen nederst


    var formData = new FormData();
    formData.append("store", "niconeu");//at det blir sendet til niconeu severen
    //det som blir sent , som jason
    formData.append("data", JSON.stringify({
      "givenName":`${fornavn.value}` ,
      "lastName":`${etternavn.value}` ,
      "Email":`${epost.value}` ,
      "tlf":`${tlf.value}`,
      "gate":`${Gate.value}`,
      "postNummer":`${Postnummer.value}`,
      "sted":`${Sted.value}`
    }));
    fetch("http://folk.ntnu.no/oeivindk/imt1441/storage/add.php", { //adresen til serveren
      method: "POST",
      body: formData
      //for å kunne se at ting blir sent korecte
    }).then(res=>res.json())
    .then(data=>{
        console.log (data);
    })
    //til slutt tømer vi innput felten for å signalisere til brukeren at ting er sendt og at det er klar til neste kontakt.
    fornavn.value = "";
    etternavn.value = "";
    epost.value = ""
    tlf.value = "";
    Gate.value = "";
    Postnummer.value = "";
    Sted.value = "";
  })

});
/* siste delen av denne filen er den samme som addKontakt.js fordi jeg ikke fikk til den
 med å edite ting som ligger i storen jeg tror at jeg må gi ting en idx og indentifisere 
 spesifike kontakter på den måten men jeg fikke ikke det til.
*/
