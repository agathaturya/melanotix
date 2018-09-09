var cycle = 0;
var stuff;
window.onload = function(){
    stuff=localStorage.getItem("preds");
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


    switch (cycle) {
        case 0:
            title = "Lesion Asymmetry";
            desc1 = "Benign moles are usually symmetrical.";
            desc2 = "Melanoma lesions are irregular, or asymmetrical, in shape.";
            break;
        case 1:
            title = "Lesion Border";
            desc1 = "A benign mole has smooth, even edges.";
            desc2 = "Borders of early melanomas tend to be uneven.";
            break;
        case 2:
            title = "Lesion Color";
            desc1 = "Benign moles are usually symmetrical.";
            desc2 = "Melanoma lesions are irregular, or asymmetrical, in shape.";
            break;
        case 3:
            title = "Lesion Surface";
            desc1 = "Benign moles are usually a single shade of brown or tan. ";
            desc2 = "The presence of an uneven distribution of color is a possible warning sign for melanoma.";
            break;
        case 4:
            title = "Analysis Overview";
            desc1 = "Your average risk is calculated by averaging the percentages of";
            desc2 = "the four factors characterizing melanoma lesions.";
            break;
    }

    document.getElementById("titleItem").innerText = title;
    document.getElementById("desc1").innerText = desc1;
    document.getElementById("desc2").innerText = desc2;
};