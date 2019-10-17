var root = window.player;
var index = 0;
var database, len, timer, initial = 0;
var audio = root.audioManager;
function getData(url){
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            database = data;
            len = data.length;
            root.render(data, 0);
            audio.getAudio(data[index].audio);

        },
        error: function () { 
             
        },
    });
}

$('.btn.prev').on('click', () =>{
    index == 0 ? index = len-1 : index --;
    response(index);
})

$('.btn.next').on('click', () =>{
    index == len-1 ? index = 0 : index ++;
    response(index);
})

$('.btn.play').on('click', () =>{
    if(audio.status == 'pause'){
        audio.play();
        rotating();
    }else{
        audio.pause();
        clearInterval(timer);
    }
})

function response(index) {
    clearInterval(timer);
    initial = 0;
    audio.getAudio(database[index].audio);
    root.render(database, index);
    audio.play();
    rotating();
}
function rotating() {  
    timer = setInterval(() => {
        initial += 1;
        $('.img-box img').css({
            transform: 'rotate('+ initial +'deg)',
            transformOrigin: '94.5px 94.5px',
        })
    }, 50);
}

getData("../mock/data.json");

