fetch("js/menu.json")
.then(res=>res.json())  //fetch jason dataen 
.then(data=>{
    const menu =document.querySelector("nav ul"); 
    data.forEach((menuItem, idx)=> {
        const li = document.createElement("li");
        let active = "";
        if (idx==0){ //bruker indexen for å se om den er aktive 
            active = 'class="active"';
        }
        li.innerHTML = `<a data-scriptsrc="${menuItem.scriptsrc}" data-id="${menuItem.id}" href=""${active}>${menuItem.html}</a>`;
        menu.appendChild(li); // setter opp tagger og andre ting som jeg kan refere til sene.
    });
    document.querySelectorAll("nav a").forEach(menuItem=>{
        menuItem.addEventListener("click", e=>{
            localStorage.setItem('activePage', e.target.dataset.id); //legger til local storage
            e.preventDefault();
            if (e.target.dataset.scriptsrc!="") {
                if(document.querySelector(`[src="${e.target.dataset.scriptsrc}"]`)==null){
                    const script = document.createElement("SCRIPT");
                    script.src =e.target.dataset.scriptsrc;
                    document.querySelector("head").appendChild(script);
                } //denne delen av skriptet er ansvarlig til å loade de riktige skriptene når de trengs. 
                  //disse blir satt i head dette er mulig fordi DOMen alerede er etablert.
            }

            document.querySelectorAll("body>section>section").forEach(section=>{
                if (e.target.dataset.id==section.id) {
                    section.classList.add("active");
                }
                else{
                    section.classList.remove("active");
                } //Denne if/else ser hvilken element (secsjon) som skal være active og gjr 
                  //eller tar bort aktive statusen til den riktige.  
            })
            document.querySelectorAll("nav a").forEach(menuItem=>{
                if (menuItem==e.target) {
                    menuItem.classList.add("active");
                }
                else {
                    menuItem.classList.remove("active");
                } //Denne if/else opptaterer nav baren og gjør at den blir displayed på riktig måte
            })
        })
    })
    if (localStorage.getItem('activePage')!=null) { //hva har blitt valgt sist 
        document.querySelector(`nav a[data-id="${localStorage.getItem('activePage')}"]`).click(); // click de som ble valg forrige gang
      } else { document.querySelector(`nav a`).click(); // vis ingen velg den første
    }   
});