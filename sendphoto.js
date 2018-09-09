document.getElementById("capture").onclick = function() {

        const canvas = document.createElement('canvas'); // create a canvas

        canvas.width = document.getElementById("webcam").videoWidth; // set its size to the one of the video
        canvas.height = document.getElementById("webcam").videoHeight;

        canvas.getContext('2d')
                .drawImage(video, 0, 0, canvas.width, canvas.height);

        var img = document.createElement("img");
        img.src = canvas.toDataURL();



        document.getElementById("output").prepend(img);
        // document.getElementById('capture').setAttribute('src', img.src);

        //capture.src=img.src;

        document.getElementById("webcam").hidden = true;

        // Sending and receiving data in JSON format using POST method
        var xhr = new XMLHttpRequest();
        var url = "https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/1b2c0a21-2177-4299-aa3f-fe218235cdc4/image/";
         xhr.open("POST", url, true);

        xhr.setRequestHeader("Content-Type", "application/octet-stream");
        xhr.setRequestHeader("Prediction-Key", "e468e9927724421ea6995c7293a13788");
 
       
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {

                console.log(xhr.responseText);
                process(JSON.parse(xhr.responseText));

            }
            else
            {
                console.log(xhr.responseText);

            }
        };

        //var data = JSON.stringify({"Url": "https://melanotix.me/capture.png"});
        var body = dataURItoBlob(img.src);
        xhr.send(body);

};
function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}

function process(parsedData){
    //todo: process
    for(var x=0; 0<parsedData.length;x++){
        console.log(parsedData[x]);
    }
}

