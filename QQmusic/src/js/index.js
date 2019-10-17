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
            for(let i = 0; i < len; i++){
                let dom = $('<li class="song"></li>');
                $(dom).text(data[i].song+'-'+data[i].singer+'----'+data[index].album)
                $(dom).appendTo($('.wrapper'))
            }
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
        sliderMove();
    }else{
        audio.pause();
        clearInterval(timer);
        clearInterval(timer2);
    }
})
$('.pro-bottom').on('click', function (e) {  
    console.log('click')
    var x = e.pageX - $('.cur-time').width();
    var now = x/($('.pro-bottom').width())*(audio.gettime().t);
    audio.settime(now);
    $('.cur-time').text(('0'+parseInt(now/60)).slice(-2) + ':' + ('0' +parseInt(now%60)).slice(-2));
    $('.pro-top').width(x);
})
var flag = 'none';
$('.btn.list').on('click', function () {  
    if(flag == 'none'){
        flag = 'block';
    }else{
        flag = 'none';
    }    
    $('.song').css({
            display: flag,
        })
})

$('.song').on('tap', function (e) {  
    index = $(e.target).index();
    console.log(index)
    response(index);
})
function response(index) {
    clearInterval(timer);
    clearInterval(timer2);
    initial = 0;
    audio.getAudio(database[index].audio);
    root.render(database, index);
    audio.play();
    rotating();
    sliderMove();
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
var timer2 = null;

function sliderMove() {  
    timer2 = setInterval(() => {
        var t = audio.gettime().t;
        var c = audio.gettime().c;
        $('.pro-top').css({
            width: c/t*100 + '%'
        })
        $('.cur-time').text(('0'+parseInt(c/60)).slice(-2) + ':' + ('0' +parseInt(c%60)).slice(-2));         
    }, 1000);        
}


getData("../mock/data.json");

