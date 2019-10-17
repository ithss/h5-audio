(function ($, root) {  
    function render(data, i) { 
        let img = new Image();
        img.src = data[i].image;
        img.onload = function () {  
            $('.img-box img').attr('src', data[i].image);
            root.blurImg(img, $('body')); 
        }
        $('.song-name').text(data[i].song) 
        $('.singer-name').text(data[i].singer) 
        $('.album-name').text(data[i].album) 
        let a = data[i].duration;
        $('.all-time').text(('0'+parseInt(a/60)).slice(-2) + ':' + ('0' +parseInt(a%60)).slice(-2)); 
    }
    root.render = render;
})(window.Zepto, window.player || (window.player = {}));