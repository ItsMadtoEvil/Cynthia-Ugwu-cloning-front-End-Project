const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
});
function firstPageAnimation(){
    var tl = gsap.timeline();
    tl.from("#nav",{
        y: '-10',
        opacity: 0,
        duration:1.5,
        ease: Expo.easeInOut
    })
    .to(".boundingelem",{
        y:'0',
        ease: Expo.easeInOut,
        duration: 1.5,
        delay: -1,
        stagger: .3
    })
    .from("#homefooter",{
        y: '-10',
        opacity: 0,
        duration:1.5,
        delay: -1,
        ease: Expo.easeInOut
    });
}
function circleSkewnessMotion(){
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;
    var timeout;
    window.addEventListener("mousemove",function(dets){
        clearTimeout(timeout);
        var xdiff=dets.clientX - xprev;
        var ydiff=dets.clientY - yprev;

        xprev=dets.clientX;
        yprev=dets.clientY;

        xscale = gsap.utils.clamp(0.8,1.2,xdiff);
        yscale = gsap.utils.clamp(0.8,1.2,ydiff);

        circleMouseFollower(xscale,yscale);
        timeout=setTimeout(function(){
            document.querySelector("#minicircle").style.transform=`translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`
        },100);
    })
}
function circleMouseFollower(xscale,yscale){
    window.addEventListener("mousemove",function(dets){
        document.querySelector("#minicircle").style.transform=`translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`
    })
}

document.querySelectorAll(".elem").forEach( function(elem){
    var diffrot = 0;
    var rot = 0;
    elem.addEventListener("mouseleave",function(dets){
        
        gsap.to(elem.querySelector("img"),{
            opacity: 0,
            ease: Power3,
            duration : 0.5
        });
    })
    elem.addEventListener("mousemove",function(dets){
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX-rot;
        rot = dets.clientX;
        
        gsap.to(elem.querySelector("img"),{
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            rotation:gsap.utils.clamp(-20,20,diffrot*0.5),
        });
    
    });
});
function updateCurrentYear() {
    var currentYearElement = document.getElementById('current-year');
    var currentYear = new Date().getFullYear();
    currentYearElement.textContent = currentYear;
}

updateCurrentYear();
setInterval(updateCurrentYear, 60000);

function updateDateTime() {
    var currentTimeElement = document.getElementById('current-time');
    var currentDate = new Date();
    
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    currentTimeElement.textContent = `${hours}:${minutes}:${seconds}`;
}

updateDateTime();
setInterval(updateDateTime, 1000);

circleSkewnessMotion();
circleMouseFollower();
firstPageAnimation();