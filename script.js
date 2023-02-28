createCanvas();
createButtons();

// Create UI

function createCanvas() {
    for (let index = 0; index < 256; index++) {
        createDot();
    }
}
function createButtons() {
    createResetButton();
    createColorPicker();
}

function createDot() {
    // Create a new dot element
    var dot = document.createElement("div");

    // Set the dot's style properties
    dot.style.width = "25px";
    dot.style.height = "25px";
    dot.style.backgroundColor = "white";
    dot.id = "dot";

    // Added event listener that would turn each dot into a random color
    dot.addEventListener("mouseover", () => { dot.style.backgroundColor = colorManager()});

    // Add the dot to the page
    document.getElementById("canvas").appendChild(dot);
}

// Managers
function colorManager() {

    console.log(document.getElementById("colorPicker").target.value)
    return document.getElementById("colorPicker").target.value;


    var red = Math.floor(Math.random() * 255);
    var green = Math.floor(Math.random() * 255);
    var blue = Math.floor(Math.random() * 255);

    return "rgb(" + red + "," + green + "," + blue + ")";

}




// Actions
function resetCanvas() {
    const canvas = document.querySelector("[id=canvas]");

    while (canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
    }
    createCanvas();
}

// Buttons
function createResetButton() {
    var changeColorButton = document.createElement("button");
    changeColorButton.innerText = "reset the dang square";
    changeColorButton.addEventListener("mousedown", () => resetCanvas());

    document.body.appendChild(changeColorButton);
}
function createColorPicker() {
    var colorPicker = document.createElement("input");
    colorPicker.onchange = "colorSelected(this)";
    colorPicker.type = "color";
    colorPicker.id = "colorPicker";

    // colorPicker.addEventListener("input", updateFirst, false);
    // colorPicker.addEventListener("change", watchColorPicker, false);
    colorPicker.onchange = e => {

        console.log(e.target.value)
    } 

    document.body.appendChild(colorPicker);
}

function watchColorPicker(event) {
    document.querySelectorAll("p").forEach((p) => {
        document.getElementById("header").style.color = event.target.value;
    });
}
