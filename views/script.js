import {scroller} from './scroller.js';
import {scrollerAnimation} from './fade-in-out-betweenSections.js';



const img = document.querySelector(".img");
const imgH2 = document.querySelector("h2");
const imgP = document.querySelector(".text");
const imgArrow = document.querySelector(".arrow");
const imgScroll = document.querySelector(".scroll");
const discoverBtn = document.querySelector(".btn");
const sect = document.querySelectorAll(".section");
const cU = document.querySelector(".contact-us");
const model = document.querySelector(".model");
const part3 =document.querySelector(".part3");
const blocks =document.querySelectorAll(".block");
const block1 = document.querySelector(".block-1")



document.addEventListener("DOMContentLoaded", runLoader);
scroller("body", "section");

(()=> { imgArrow.style.display = "block";  imgScroll.style.display = "block" })();
imgScroll.addEventListener("click", hide);
imgArrow.addEventListener("click", hide);


function hide() {

    imgArrow.style.display = "none";  imgScroll.style.display = "none";
}



window.addEventListener("scroll", animateDom);
let counter = 0;
function animateDom(e) {


    let offset = (imgH2.getBoundingClientRect().top - window.innerHeight) / 7;
    let scrollerIn = false;
    // logIt(part3.getBoundingClientRect().top);


    function logIt(c) {
        // debugger
        counter++
        if(counter === 6){

            console.log(c);
            // debugger;
            counter=0;
        }
    }
    

     imgArrow.style.display = "none";  imgScroll.style.display = "none";
    //  logIt("debugger");
    scrollerAnimation(sect, imgArrow, imgScroll);
    // setTimeout(() => { // Timer to solve scroll problem and catch values after scroll is done
    //     for ( let x = 0; x<sect.length; x++) {
    //         // debugger;
            
    //         if(sect[x].getBoundingClientRect().top < 150 && sect[x].getBoundingClientRect().top > -100 && sect[x+1]) {
    //             // debugger;
    //             // console.log(sect[x].getBoundingClientRect().top);
    //             scrollerIn = true;
    //             setTimeout(()=> {imgArrow.style.display = "block";  imgScroll.style.display = "block"}, 20);
    
    //             break; 
    //         }
    //         // } else { 
    //         //     scrollerIn = false;
    //         // }
    //     }
    // }, 1000);
    
   

    // console.log(window.scrollY);

        if (imgH2.getBoundingClientRect().top - window.innerHeight <= -100) {

            imgH2.classList.add("slidein");
            imgP.classList.add("slidein");
            
        } else if (imgH2.getBoundingClientRect().top - window.innerHeight >= 20) {

            imgH2.classList.remove("slidein");
            imgP.classList.remove("slidein");
        } 

        if (block1.getBoundingClientRect().top -window.innerHeight <= -150) {
            // debugger;
            blocks.forEach((c)=> {

                c.classList.add("block-animate");
            }) }
            
        else if (part3.getBoundingClientRect().top -window.innerHeight >= 100) {


            blocks.forEach((c)=> {

                c.classList.remove("block-animate");
            })
            }

        if ( imgH2.getBoundingClientRect().top - window.innerHeight <= 0 && imgH2.getBoundingClientRect().top - window.innerHeight >= -1300) {

            img.style.backgroundPositionY = 100 + offset + "px";
        }


            
        }


discoverBtn.addEventListener("click", openBoxModel)
document.querySelector(".contact").addEventListener("click", openBoxModel);
document.querySelectorAll(".model").forEach((c)=> {c.addEventListener("click", closeModelBox)});


function openBoxModel(e) {
    // debugger;
    if(e.target.classList.contains("contact")) {
        // debugger;
        cU.style.display = "flex";
        cU.classList.remove("hideAfter");
        cU.classList.add("show-flex");  
    } else {

        model.style.display = "flex";
        model.classList.remove("hideAfter");
        model.classList.add("show-flex");    
    }
}




function closeModelBox(e) {

    console.log("click");
    // debugger;
    if (e.target.classList.contains("x") || e.target.classList.contains("model")) {
        // debugger;
        document.querySelector(".model").style.display = "none";
        document.querySelector(".contact-us").style.display = "none";


    }
    
    // document.querySelector(".model").classList.remove("show-flex");
    // document.querySelector(".model").classList.add("hideAfter");
}


function runLoader() {
    // debugger;
    setTimeout(() => {
        window.scroll(0,0);
        document.querySelector(".loading").classList.add("hide-loader");
        document.querySelector(".loading-img").classList.add("hide-loader");
    }, 20);
}