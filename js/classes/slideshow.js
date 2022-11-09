class slideshow {
  constructor(selector, images) {
  this.img = images; //at man kan ha bilder utafor og at bruken kan lettere velge dem selv

  const slideshow = document.querySelector(selector);
  this.slide1 = document.createElement('DIV');//lage div slide 1 kan sitte i
  slideshow.appendChild(this.slide1);           //legge den i DOMen
  this.slide2 = document.createElement('DIV'); //lager div for slide2
  slideshow.appendChild(this.slide2);           //legge den i DOMen
  this.addStyles(selector);
  this.slide1.style.backgroundImage = `url('${this.img[0]}')`; //hva er neste bildet
  


  setTimeout(()=>{
    this.slide1.style.opacity = 1; //fade in
  }, 1);                          
   
 this.currentSlide = 1;   
  this.nextSlide();
  
  this.slide2.addEventListener('transitionend',this.changeImage.bind(this)) // eventlisten på når det neste bildet kommer
}            

  nextSlide() {
    setTimeout(()=>{
      this.slide2.style.backgroundImage = this.slide1.style.backgroundImage; //bytte bildet som vises
      this.slide2.style.opacity = 1; // hvor lang en transidjon tar per bildet (7s)
    }, 7000); 
  }

  changeImage(){
    if (this.slide2.style.backgroundImage==this.slide1.style.backgroundImage) { //bytter på hva som er slide 1 og hva som er slide 2
      this.slide1.style.backgroundImage = `url('${this.img[this.currentSlide]}')`;
      this.slide2.style.opacity = 0;                                       
      this.currentSlide++;     
      this.currentSlide = this.currentSlide%this.img.length; 
      this.nextSlide();      //neste slide 
    }
  }
//hær lager jeg all CSS at personen som bruker slideshowet ikke trenger å tenke på denog at han ikke må lime inn ting i cssen
  addStyles(selector){ 
    const style = document.createElement("style");
    style.innerHTML = `
    ${selector} div {
      /*
      Det er to DIV tagger inne i den som inneholder slideshowet, en ligger over
      den andre og den nærmest brukeren brukes for å fade mellom to bilder.
      */
      top: 0;
      left: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      background-color: #FFF;
      opacity: 0;
      transition: opacity 4s;
    }

    ${selector}>div:first-child {
      /*
      Dette er den bakerste
      */
      z-index: 0;
    }

    ${selector}>div:last-child {
      /*
      Dette er den fremste (den som fades inn)
      */
      z-index: 1;
    }`;
    document.querySelector("head").appendChild(style); //legge den i DOMen
  }
}
const images = ["img/682px-Kitten_in_Rizal_Park,_Manila.jpg", //bildesamlingen man trenger for å kjøre slideshowet
                "img/9343-a-cute-orange-kitten-isolated-on-a-white-background-pv.jpg",
                "img/kittens-2641211_960_720.jpg",
                "img/kittens-2677249_960_720.jpg"]

new slideshow('.slideshow' , images); //hær kjører vi slideshowet
