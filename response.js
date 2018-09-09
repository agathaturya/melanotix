var cycle = 0;
var stuff;
window.onload = function(){
    stuff=localStorage.getItem("preds");
}

function getMeaning(numCase, value) {
    switch (numCase)
    {
        case 0:
            if (value <= 40)
                return "Shape is symmetrical and is not characteristic of malignant behavior. Monitor your lesion in the future.";
            if (value <= 60)
                return "Shape is slightly irregular and shows signs of possible malignant behavior. Monitor your lesion closely and make an appointment with your physician.";
            else
                return "Shape is irregular and shows signs of malignant behavior. Make an appointment with your physician as soon as possible.";
        case 1:
            if (value <= 40)
                return "Border is smooth and is not characteristic of malignant behavior. Monitor your lesion in the future.";
            if (value <= 60)
                return "Border shows signs of possible malignant behavior. Monitor your lesion closely and make an appointment with your physician.";
            else
                return "Border is irregular and shows signs of malignant behavior. Make an appointment with your physician as soon as possible.";
        case 2:
            if (value <= 40)
                return "Lesion is a single color and is not characteristic of malignant behavior. Monitor your lesion in the future.";
            if (value <= 60)
                return "Lesion shows some gradient of color and shows signs of possible malignant behavior. Monitor your lesion closely and make an appointment with your physician.";
            else
                return "Lesion shows uneven distribution of colors and shows signs of malignant behavior. Make an appointment with your physician as soon as possible.";
        case 3:
            if (value <= 40)
                return "Surface is uniform and is not characteristic of malignant behavior. Monitor your lesion in the future.";
            if (value <= 60)
                return "Surface is somewhat irregular and shows signs of possible malignant behavior. Monitor your lesion closely and make an appointment with your physician.";
            else
                return "Surface is uneven and shows signs of malignant behavior. Make an appointment with your physician as soon as possible.";
        case 4:
            if (value <= 40)
                return "Low overall risk. Check individual ABCS parameters for abnormal features.";
            if (value <= 60)
                return "Intermediate overall risk. Monitor lesions and make an appointment with your physician.";
            else
                return "Significant overall risk. Make an appointment with your physician as soon as possible.";

    }

}

document.getElementById("next").onclick = function() {


    var title = "";
    var desc1 = "";
    var desc2 = "";
    var risk = "";
    var meaning = "";

    cycle++;
    if (cycle >= 5)
    {
        cycle=0;
    }

    var values = stuff.split(",");

//     var asymm = Math.round(parseFloat(values[0]) * 100);
//     var border = Math.round(parseFloat(values[1]) * 100);
//     var color = Math.round(parseFloat(values[2]) * 100);
//     var surface = Math.round(parseFloat(values[3]) * 100);
    
    var asymm = parseFloat(values[0])* 100.0; 
    var border =parseFloat(values[1]) * 100.0;
    var color =parseFloat(values[2]) * 100.0;
    var surface =parseFloat(values[3]) * 100.0;
    
    var avg = Math.round((asymm + border + color + surface)/4);

    switch (cycle) {
        case 0:
            title = "Lesion Asymmetry";
            desc1 = "Benign moles are usually symmetrical.";
            desc2 = "Melanoma lesions are irregular, or asymmetrical, in shape.";
            risk = asymm;

            meaning = getMeaning(0, asymm);

            break;
        case 1:
            title = "Lesion Border";
            desc1 = "A benign mole has smooth, even edges.";
            desc2 = "Borders of early melanomas tend to be uneven.";
            risk = border;

            meaning = getMeaning(1, border);

            break;
        case 2:
            title = "Lesion Color";
            desc1 = "Benign moles are usually symmetrical.";
            desc2 = "Melanoma lesions are irregular, or asymmetrical, in shape.";
            risk = color;

            meaning = getMeaning(2, color);

            break;
        case 3:
            title = "Lesion Surface";
            desc1 = "Benign moles are usually a single shade of brown or tan. ";
            desc2 = "The presence of an uneven distribution of color is a possible warning sign for melanoma.";
            risk = surface;

            meaning = getMeaning(3, surface);

            break;
        case 4:
            title = "Analysis Overview";
            desc1 = "Your average risk is calculated by averaging the percentages of";
            desc2 = "the four factors characterizing melanoma lesions.";
            risk = avg;

            meaning = getMeaning(4, avg);

            break;
    }

    document.getElementById("titleItem").innerText = title;
    document.getElementById("desc1").innerText = desc1;
    document.getElementById("desc2").innerText = desc2;
    document.getElementById("risk").innerText = risk;
    document.getElementById("result").innerText = meaning;
};
