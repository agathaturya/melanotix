function toggleMute() {

    var video=document.getElementById("videoId");

    if(video.muted){
        video.muted = false;
    } else {
        debugger;
        video.muted = true;
        video.play()
    }

}

$(document).ready(function(){
    setTimeout(toggleMute,3000);
})