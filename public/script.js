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


document.querySelectorAll(".add-btn").forEach((c)=> { c.addEventListener("click", addItem); }) 
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


    let offset = (imgH2.getBoundingClientRect().top - window.innerHeight) / 6;
    let scrollerIn = false;
    // logIt(part3.getBoundingClientRect().top);

    

     imgArrow.style.display = "none";  imgScroll.style.display = "none";

    scrollerAnimation(sect, imgArrow, imgScroll); 
    
    
   

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

            img.style.backgroundPositionY = 85+ offset + "px";
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



function addItem(e){
    e.preventDefault();
    // debugger;
    let url = "/cart/add/" + this.dataset.id;
    fetch(url, {
        method: "GET",
        headers: {
            'Content-type': 'application/json'
        },
        credentials: 'same-origin'
    }).then(dataRes=> dataRes.json())
      .then(finaldata=> {
        document.querySelector(".fa-shopping-cart").textContent = finaldata.total;
        console.dir(this);
        let FlashContElement = this.parentElement.parentElement;
        console.dir(FlashContElement);
        FlashContElement.querySelector(".flash-success").classList.add("added");
        setTimeout(()=>{FlashContElement.querySelector(".flash-success").classList.toggle("added");}, 2000)
    });
}