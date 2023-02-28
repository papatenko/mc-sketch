// Global Variables
var ColorPicked="rainbow"
var BackgroundColor="white"

// Calling Creaction Functions
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
    createRanbowColorButton();
    createEraserButton();
}

function createDot() {
    // Create a new dot element
    var dot = document.createElement("div");

    // Set the dot's style properties
    dot.style.width = "25px";
    dot.style.height = "25px";
    dot.style.backgroundColor = BackgroundColor;
    dot.id = "dot";

    // Added event listener that would turn each dot into a random color
    dot.addEventListener("mouseover", () => { dot.style.backgroundColor = colorManager(ColorPicked)});

    // Add the dot to the page
    document.getElementById("canvas").appendChild(dot);
}

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

    colorPicker.onchange = event => {ColorPicked = event.target.value} 

    document.body.appendChild(colorPicker);
}
function createRanbowColorButton(){
    var rainbowColorButton = document.createElement("button");
    rainbowColorButton .innerText = "make me rainbow woohoo";

    rainbowColorButton.addEventListener("mousedown", () => ColorPicked="rainbow");

    document.body.appendChild(rainbowColorButton);
}
function createEraserButton(){
    var eraserButton = document.createElement("button");
    eraserButton .innerText = "make me erase woohoo";

    eraserButton.addEventListener("mousedown", () => ColorPicked="erase");

    document.body.appendChild(eraserButton);
}

// Managers
function colorManager(colorPicked) {
    if (colorPicked == "erase") {
        return BackgroundColor;
    }
    if (colorPicked != "rainbow") {
        return colorPicked; 
    }

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
