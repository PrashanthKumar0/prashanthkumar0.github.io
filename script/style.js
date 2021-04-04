function $(_el){    return document.querySelector(_el);     };

function toggleNavDrawer(){
    let navbar=$('.nav-bar'); //maybe move this outside for some improvement
    if(navbar.classList.contains('open')){ 
        navbar.classList.remove('open');
        $('.nav-bar .nav-zip-slider').style='right:-25px;';
    } else {
        navbar.classList.add('open');
        $('.nav-bar.open .nav-zip-slider').style='right:'+$('.nav-drawer').offsetWidth+'px;';
    }
}


window.addEventListener('scroll',function(e){
    let yPos=Math.floor(window.scrollY) + innerHeight - 10;
    let navDrawer=$('.nav-drawer');
    let navigations=(navDrawer.children);

    for(let i=0;i<navigations.length;i++){
        if(navigations[i].tagName.match(/^a$/i)){
            let targetElem=$(navigations[i].getAttribute('href'));
            if(!targetElem){ //error checking
                console.error(' define an element with id '+navigations[i].getAttribute('href')+' for completing navigation');
                continue;
            }
            if( yPos > targetElem.offsetTop && yPos < targetElem.offsetHeight + targetElem.offsetTop){
                $('.drawer-item.active').classList.remove('active');
                navigations[i].classList.add('active');

            }
        }
    }


});



//todo : improve light theme 

function toggleTheme(){ 
    //no template literals ;)
    let darkThemeCss=''; //we can leave this empty  since theme is dark by default setting it to '' will take colors from colors.css
    // ':root{--color-primary:#212121;--color-secondary:#121212;--color-primary-theme:aqua;--color-secondary-theme:indigo;--text-primary:#dedede;--text-link:var(--color-primary-theme);}';
    let lightThemeCss=':root{--color-primary:#dedede;--color-secondary:#ededed;--color-primary-theme:rgb(0, 119, 255);--color-secondary-theme:rgb(255, 68, 93);--text-primary:#2b2b2b;--text-link:var(--color-primary-theme);--navbar-color:#2b2b2b;}';
    let themeIndicator=$('.theme-toggle');
    if(themeIndicator.classList.contains('bi-moon-stars-fill')){
        themeIndicator.classList.remove('bi-moon-stars-fill');
        themeIndicator.classList.add('bi-sun-fill');
        //toggle to light theme
        $('meta[name="theme-color"]').setAttribute('content','#ededed');
        $('#themeStyleSheet').innerHTML=lightThemeCss;
    }else{
        $('meta[name="theme-color"]').setAttribute('content','#121212');
        themeIndicator.classList.remove('bi-sun-fill');
        themeIndicator.classList.add('bi-moon-stars-fill');
        //toggle to dark theme
        $('#themeStyleSheet').innerHTML=darkThemeCss;
    }
}


function typeWriterEffect(c=0){

    let elem=$('#typeWriter span');
    // let elem=$('#typeWriter');
    let pauseIterations=10;
    
    let index=Number(elem.getAttribute('data-cur-index'));
    let arrContents=elem.getAttribute('data-replace').split(',');
    let content=arrContents[index];
    let nextTimeStep=Math.floor(Math.random()*350);
    let deleteTimeStep=50+40*(Math.random()*2-1); //50ms+-40 gap
    
    //write in forward mode
    if(c<=content.length)  elem.innerText=content.slice(0,c);
    //skip for pauseIterations steps ... then 

    //erase stuffs
    if(c>=content.length+pauseIterations) {
        elem.innerText=content.slice(0,content.length-(c-pauseIterations)-1);
        nextTimeStep=deleteTimeStep;
    }
    
    if(c>=(content.length*2)+pauseIterations){ //*2 to erase and write pauseIterations is duration to pause between
        elem.setAttribute('data-cur-index',(++index)%arrContents.length);
        c=0;
    }

    setTimeout(typeWriterEffect,nextTimeStep,++c);
}
document.body.onload=initUI;








function setupImgViewer(){
    let imgs=document.querySelectorAll('.img-showcase img');
    imgs.forEach(function(img){
        img.addEventListener('click',viewImage);
    });
}

function viewImage(e){
    let targImg=e.target;
    
    if(targImg.offsetWidth>targImg.offsetHeight){
        $('#imagePreviewImg').style.width='100%';    
        $('#imagePreviewImg').style.height='auto';    
    }else{
        $('#imagePreviewImg').style.width='auto';    
        $('#imagePreviewImg').style.height='100%';    
    }
    $('#imgPreview').classList.add('open');
    // $('#imgPreview').style.backgroundImage='url("'+targImg.src+'")';
    $('#imagePreviewImg').src=targImg.src;
    $('#imgPreviewCaption').innerText=targImg.getAttribute('alt');

}

function closeImageView(){
    $('#imgPreview').classList.remove('open');
}


function initUI(){
    $('#loader').classList.add('hide');
    $('#body-wrapper').style.opacity='1';
    typeWriterEffect();
    setupImgViewer();
}



