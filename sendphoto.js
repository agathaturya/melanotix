var timeleft = 3;
var downloadTimer = setInterval(function(){
    document.getElementById("timer").innerText = (3 - --timeleft).toString();
    if(timeleft <= 0)
        clearInterval(downloadTimer);

    if (timeleft === 0) {
        //document.getElementById("webcam").hidden = true;

        const canvas = document.createElement('canvas'); // create a canvas

        canvas.width = document.getElementById("webcam").videoWidth; // set its size to the one of the video
        canvas.height = document.getElementById("webcam").videoHeight;
        canvas.getContext('2d')
            .drawImage(video, 0, 0, canvas.width, canvas.height);

        var img = document.createElement("photoCapture");
        img.src = canvas.toDataURL();
        document.getElementById("output").prepend(img);


        // Sending and receiving data in JSON format using POST method

        var xhr = new XMLHttpRequest();
        var url = "https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/1b2c0a21-2177-4299-aa3f-fe218235cdc4/url";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.setRequestHeader("Prediction-Key", "e468e9927724421ea6995c7293a13788");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var json = JSON.parse(xhr.responseText);

                alert(json)

            }
            else
            {
                var json = JSON.parse(xhr.responseText);


            }
        };



        var data = JSON.stringify('{"Url": "https://www.medicalnewstoday.com/content/images/hero/079/79115/79115_256.jpg"}');

        xhr.send(data);
    }

},1000);

