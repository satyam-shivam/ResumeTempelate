// Smooth Scroll feature :
// ==========================

var navMenu = document.querySelectorAll('.nav-menu a');
// This variable is needed in both the functions below 
var interval;
for (let i=0; i<navMenu.length; i++){
        navMenu[i].addEventListener('click', function(event){
            event.preventDefault();
            let targetSectionId = this.textContent.toLowerCase();
            let targetSection = document.getElementById(targetSectionId);
            // Arguments for function can be passed as 3rd, 4th .. parameter
            interval = setInterval(scrollVertially,12,targetSection);
            // Some Points :
            //--------------
            // Below syntax makes a function call and uses that evaluated value every time 
            // in interval of 50ms , rather function evaluation/execution is needed every time 
            // So this is incorrect. 
            // interval = setInterval(scrollVertially(targetSection),12);
            // Or alternatively below syntax will also work , every time new function call is happenning.
            // interval = setInterval(function(){
            //     scrollVertially(targetSection);
            // },50);

    });
}

function scrollVertially(targetSection){
    var targetSectionCoordinate = targetSection.getBoundingClientRect();
    // Last section not necessarily reaches to top of viewport , so second 'OR' condition
    // makes sure that inteval is cleared when called/reached last section (here it's 'contact' section)
    // even if it's Y-coordinate is positive.
    if ((targetSectionCoordinate.y <= 0) || 
        (Math.abs(this.screen.height - targetSectionCoordinate.bottom) <= 5 )){
        console.log(Math.abs(this.screen.height - targetSectionCoordinate.bottom));
        clearInterval(interval);
        return
    }

    window.scrollBy(0,50);
}



// Auto Fill Skill Bar feature :
// ==============================
// -->> Approach 2:
var progressBars = document.querySelectorAll('.skills-progress > div');
window.addEventListener('scroll', checkScroll);

for (let bar of progressBars){
        bar.style.width = 0 + '%';
}

function checkScroll(){
    for (let bar of progressBars){
        let barCoordinate = bar.getBoundingClientRect();
        // Below if will run multiple times as long as this condition holds.
        // Ideally like approach 1 , we should have initialised only once for meeting this condition

        // setAttribute(): If the attribute already exists, the value is updated;
        // otherwise a new attribute is added with the specified name and value.
        if (barCoordinate.top > window.innerHeight){
            bar.style.width = 0 + '%';
            bar.setAttribute("data-visited", 'False');
        }
        else if (barCoordinate.top <= window.innerHeight && bar.getAttribute('data-visited') == 'False'){
            fillBar(bar);
            bar.setAttribute("data-visited", 'True');

        }
    }
}

function fillBar(bar){
    let currentWidth = 0;
    // let currentWidth = parseInt(bar.style.width.slice(0,-1));
    let targetWidth = bar.getAttribute('data-bar-width');
    let intervals = setInterval(function(){
            if (currentWidth >= targetWidth){
                clearInterval(intervals);
                return;
            }

            currentWidth++;
            bar.style.width = currentWidth + '%';
    },9);
}



// -->> Approach 1:

// var progressBars = document.querySelectorAll('.skills-progress > div');
// var skillsContainer = document.getElementById('skills-container');
// var animationDone = false;
// var barsInitialisedToZero = false;
// window.addEventListener('scroll', checkScroll);


// function initializeBars(){
//     for (let bar of progressBars){
//         bar.style.width = 0 + '%';
//     }
// }


// function fillBars(){
//     for (let bar of progressBars){
    // Use "var" rather than "let" below and only last bar will be filled !! 😇
//         let currentWidth = 0;
//         let targetWidth = bar.getAttribute('data-bar-width');
//         let intervals = setInterval(function(){
//             if (currentWidth > targetWidth){
//                 clearInterval(intervals);
//                 return;
//             }

//             currentWidth++;
//             bar.style.width = currentWidth + '%';
//         },9);
//     }
// }

// function checkScroll(){
//     var skillsCoordinate = skillsContainer.getBoundingClientRect();
//     if (!animationDone && skillsCoordinate.top < window.innerHeight){
//         // This variable to make sure initialization is done only once when tha later condition is met, 
//         // and not multiple times on scroll event when condition is still intact
//         animationDone = true;
//         // console.log('skill section visible');
//         fillBars();
//         barsInitialisedToZero = false;
//     }

//     else if (!barsInitialisedToZero && skillsCoordinate.top > window.innerHeight){
//         animationDone = false;
//         // This variable to make sure initialization is done only once when tha later condition is met, 
//         // and not multiple times on scroll event when condition is still intact
//         barsInitialisedToZero = true;
//         // initialize width of colored div's
//         initializeBars();
//         // console.log(' elif section called')
//     }
// }
