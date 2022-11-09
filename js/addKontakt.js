document.querySelector("Button").addEventListener("click", e=>{ //event lisen på form button slik at koden kjører bare når den trengs


  //disse er får å finne input feltene som er på siden 
    const fornavn = document.getElementById("inputfor1");
    const etternavn = document.getElementById("inputett1");
    const epost = document.getElementById("inputep1");
    const tlf = document.getElementById("inputT1");
    const Gate = document.getElementById("inputg1");
    const Postnummer = document.getElementById("inputP1");
    const Sted = document.getElementById("inputS1");


    var formData = new FormData();
    formData.append("store", "niconeu"); //hvor ting blir send og hvis det ikke finnes en med dette navnet blr en ny stor laget.
    //ting som blir sentsom jason data
    formData.append("data", JSON.stringify({"givenName":`${fornavn.value}` ,
    "lastName":`${etternavn.value}` ,
    "Email":`${epost.value}` ,
    "tlf":`${tlf.value}`,
    "gate":`${Gate.value}`,
    "postNummer":`${Postnummer.value}`,
    "sted":`${Sted.value}`}));
    fetch("http://folk.ntnu.no/oeivindk/imt1441/storage/add.php", { //her velger jeg hvor ting skal og hva disse tingene skal hete.
      method: "POST",
      body: formData
    }).then(res=>res.json())
    .then(data=>{
    })
    fornavn.value = ""; //til slutt tømer vi innput felten for å signalisere til brukeren at ting er sendt og at det er klar til neste kontakt.
    etternavn.value = "";
    epost.value = ""
    tlf.value = "";
    Gate.value = "";
    Postnummer.value = "";
    Sted.value = "";
  })