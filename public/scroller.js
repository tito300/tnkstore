export let scroller = function(controller, divsClass){

var secs = document.querySelectorAll("." + divsClass);
var currentSection = 0;
document.querySelector(controller).addEventListener('click', move, true);

function move(e) {
     if (e.target.classList.contains('next') && currentSection < secs.length) {
        // console.log("fired");
        // debugger;
         secs[++currentSection].scrollIntoView({ behavior: 'smooth' , block: "start"});}

    else if (e.target.classList.contains('next') && currentSection === secs.length){

        currentSection = 0;

    }   
    
    // Same as above but for last section
    else if (e.target.classList.contains('previous') && currentSection === secs.length) {
        // debugger;
        currentSection--;
        secs[--currentSection].scrollIntoView({behavior: 'smooth'});
    }  else if (e.target.classList.contains('previous') && currentSection > 0) {
        // debugger;
        currentSection--
        secs[--currentSection].scrollIntoView({ behavior: 'smooth'});
  }
}

// Event to to run a function while scrolling to check for each section position
window.addEventListener("scroll", updateCurrent);



function updateCurrent(e) {

 // function that runs on each section while scrolling. 
  secs.forEach(function(c){
    
    // check if more than half of the section is in view then update the currentSection to reflect that
    if (c.getBoundingClientRect().top < (c.clientHeight/10)  &&  c.getBoundingClientRect().top > (-c.clientHeight/10))  {
       
        currentSection = parseInt(c.id); 

    }
  })
}
}