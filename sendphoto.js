var cycle = 0;
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
            if (xhr.readyState === 4 && xhr.status === 200) {

                //console.log(xhr.responseText);
                console.log(JSON.parse(xhr.responseText));
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
    var labels= parsedData["predictions"];
    console.log(labels.length);
    var a;
    var b;
    var c;
    var d;
    var sum=0;
    for(var x=0; x<labels.length ;x++){
    currentLabel=labels[x]

     console.log(currentLabel);
     console.log();
       if(currentLabel["tagName"]=="Asymmetrical"){
        a=currentLabel["probability"];
        sum+=a;
       }
        if(currentLabel["tagName"]=="Rough edges"){
        b=currentLabel["probability"];
        sum+=b;
       }
       if(currentLabel["tagName"]=="Gradient"){
        c=currentLabel["probability"];
        sum+=c;
       }
       if(currentLabel["tagName"]=="Textured Surface"){
        d=currentLabel["probability"];
        sum+=d;
       }

    }
        
    var avg=sum/4.0;
    alert(avg)
    var preds = [a,b,c,d];
   // document.getElementById("titleItem").innerText = title;
   // document.getElementById("desc1").innerText = desc1;
  //  document.getElementById("desc2").innerText = desc2;
    document.getElementById("risk").innerText = avg;
  //  document.getElementById("result").innerText = meaning;
};



function loadScript(src){
    var el = document.createElement("script");
    el.src = src;
    document.body.appendChild(el);
}



// function getMeaning(numCase, value) {
//     switch (numCase)
//     {
//         case 0:
//             if (value <= 40)
//                 return "Shape is symmetrical and is not characteristic of malignant behavior. Monitor your lesion in the future.";
//             if (value <= 60)
//                 return "Shape is slightly irregular and shows signs of possible malignant behavior. Monitor your lesion closely and make an appointment with your physician.";
//             else
//                 return "Shape is irregular and shows signs of malignant behavior. Make an appointment with your physician as soon as possible.";
//         case 1:
//             if (value <= 40)
//                 return "Border is smooth and is not characteristic of malignant behavior. Monitor your lesion in the future.";
//             if (value <= 60)
//                 return "Border shows signs of possible malignant behavior. Monitor your lesion closely and make an appointment with your physician.";
//             else
//                 return "Border is irregular and shows signs of malignant behavior. Make an appointment with your physician as soon as possible.";
//         case 2:
//             if (value <= 40)
//                 return "Lesion is a single color and is not characteristic of malignant behavior. Monitor your lesion in the future.";
//             if (value <= 60)
//                 return "Lesion shows some gradient of color and shows signs of possible malignant behavior. Monitor your lesion closely and make an appointment with your physician.";
//             else
//                 return "Lesion shows uneven distribution of colors and shows signs of malignant behavior. Make an appointment with your physician as soon as possible.";
//         case 3:
//             if (value <= 40)
//                 return "Surface is uniform and is not characteristic of malignant behavior. Monitor your lesion in the future.";
//             if (value <= 60)
//                 return "Surface is somewhat irregular and shows signs of possible malignant behavior. Monitor your lesion closely and make an appointment with your physician.";
//             else
//                 return "Surface is uneven and shows signs of malignant behavior. Make an appointment with your physician as soon as possible.";
//         case 4:
//             if (value <= 40)
//                 return "Low overall risk. Check individual ABCS parameters for abnormal features.";
//             if (value <= 60)
//                 return "Intermediate overall risk. Monitor lesions and make an appointment with your physician.";
//             else
//                 return "Significant overall risk. Make an appointment with your physician as soon as possible.";

//     }

// }

// document.getElementById("next").onclick = function() {


//     var title = "";
//     var desc1 = "";
//     var desc2 = "";
//     var risk = "";
//     var meaning = "";

//     cycle++;
//     if (cycle >= 5)
//     {
//         cycle=0;
//     }
//     console.log(stuff)
//     var values = stuff.split(",");

//     var asymm = Math.round(parseFloat(values[0]) * 100);
//     var border = Math.round(parseFloat(values[1]) * 100);
//     var color = Math.round(parseFloat(values[2]) * 100);
//     var surface = Math.round(parseFloat(values[3]) * 100);
//     var avg = Math.round((asymm + border + color + surface)/4);

//     switch (cycle) {
//         case 0:
//             title = "Lesion Asymmetry";
//             desc1 = "Benign moles are usually symmetrical.";
//             desc2 = "Melanoma lesions are irregular, or asymmetrical, in shape.";
//             risk = asymm;

//             meaning = getMeaning(0, asymm);

//             break;
//         case 1:
//             title = "Lesion Border";
//             desc1 = "A benign mole has smooth, even edges.";
//             desc2 = "Borders of early melanomas tend to be uneven.";
//             risk = border;

//             meaning = getMeaning(1, border);

//             break;
//         case 2:
//             title = "Lesion Color";
//             desc1 = "Benign moles are usually symmetrical.";
//             desc2 = "Melanoma lesions are irregular, or asymmetrical, in shape.";
//             risk = color;

//             meaning = getMeaning(2, color);

//             break;
//         case 3:
//             title = "Lesion Surface";
//             desc1 = "Benign moles are usually a single shade of brown or tan. ";
//             desc2 = "The presence of an uneven distribution of color is a possible warning sign for melanoma.";
//             risk = surface;

//             meaning = getMeaning(3, surface);

//             break;
//         case 4:
//             title = "Analysis Overview";
//             desc1 = "Your average risk is calculated by averaging the percentages of";
//             desc2 = "the four factors characterizing melanoma lesions.";
//             risk = avg;

//             meaning = getMeaning(4, avg);

//             break;
//     }

//     document.getElementById("titleItem").innerText = title;
//     document.getElementById("desc1").innerText = desc1;
//     document.getElementById("desc2").innerText = desc2;
//     document.getElementById("risk").innerText = risk;
//     document.getElementById("result").innerText = meaning;
// };


