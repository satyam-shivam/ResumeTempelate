// Smooth Scroll feature :
// ==========================

var navMenu = document.querySelectorAll('.nav-menu a');
// This variable is needed in both the functions below 
var interval;
for (let i=0; i<navMenu.length; i++){
        navMenu[i].addEventListener('click', function(event){
            event.preventDefault();
            var targetSectionId = this.textContent.toLowerCase();
            targetSection = document.getElementById(targetSectionId);
            // Arguments for function can be passed as 3rd, 4th .. parameter
            interval = setInterval(scrollVertially,12,targetSection);
            // Some Points :
            //--------------
            // Below syntax makes a function call and uses that evaluated value every time 
            // in interval of 50ms , rather function evaluation/execution is needed every time 
            // So this is incorrect. 
            // interval = setInterval(scrollVertially(targetSection),50);
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
        ((screen.height - screen.height%10) == (targetSectionCoordinate.bottom - targetSectionCoordinate.bottom%10))){
        clearInterval(interval);
        return
    }

    window.scrollBy(0,50);
}