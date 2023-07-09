$(document).ready(function () {

    // API Key: 83a7a15df9bb440380724e35be5a7e68
    // http://api.voicerss.org/?key=1234567890QWERTY&hl=en-us&c=MP3&src=Hello, world!
    
    $('.playButton').on('click', function() {
        var apiKey = '83a7a15df9bb440380724e35be5a7e68';
        var text = this.innerHTML;
        var audioSrc  = 'http://api.voicerss.org/?key=' + apiKey + '&hl=en-us&c=MP3&f=44khz_16bit_stereo&src=' + encodeURIComponent(text);
        var audio = new Audio(audioSrc);
        audio.play();
    });
});