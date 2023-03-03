// Global Variables
var ColorPicked = "rainbow";
var BackgroundColor = "white";

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
    createBrushColorPicker();
    createBackgroundColorPicker();
    createRanbowColorButton();
    createEraserButton();
}

function createDot() {
    var dot = document.createElement("div");

    dot.style.width = "25px";
    dot.style.height = "25px";
    dot.style.backgroundColor = BackgroundColor;
    dot.class = "dot";

    dot.addEventListener("mouseover", () => {
        dot.style.backgroundColor = colorManager(ColorPicked);
    });

    document.getElementById("canvas").appendChild(dot);
}

function createResetButton() {
    var changeColorButton = document.createElement("button");
    changeColorButton.innerText = "reset the dang square";
    changeColorButton.addEventListener("mousedown", () => resetCanvas());

    document.getElementById("buttons").appendChild(changeColorButton);
}
function createBrushColorPicker() {
    var brushColorPicker = document.createElement("input");
    brushColorPicker.onchange = "colorSelected(this)";
    brushColorPicker.type = "color";

    brushColorPicker.onchange = (event) => {
        ColorPicked = event.target.value;
    };

    document.getElementById("buttons").appendChild(brushColorPicker);
}
function createRanbowColorButton() {
    var rainbowColorButton = document.createElement("button");
    rainbowColorButton.innerText = "make me rainbow woohoo";

    rainbowColorButton.addEventListener(
        "mousedown",
        () => (ColorPicked = "rainbow")
    );

    document.getElementById("buttons").appendChild(rainbowColorButton);
}
function createBackgroundColorPicker() {
    var backgroundColorPicker = document.createElement("input");
    backgroundColorPicker.onchange = "colorSelected(this)";
    backgroundColorPicker.type = "color";

    backgroundColorPicker.onchange = (event) => {
        BackgroundColor = event.target.value;
        resetCanvas();
    };

    document.getElementById("buttons").appendChild(backgroundColorPicker);
}
function createEraserButton() {
    var eraserButton = document.createElement("button");
    eraserButton.innerText = "make me erase woohoo";

    eraserButton.addEventListener("mousedown", () => (ColorPicked = "erase"));

    document.getElementById("buttons").appendChild(eraserButton);
}

function colorManager(colorPicked) {
    if (colorPicked == "erase") 
        return BackgroundColor

    if (colorPicked != "rainbow") 
        return colorPicked

    // Generate random color and return it
    var red = Math.floor(Math.random() * 255);
    var green = Math.floor(Math.random() * 255);
    var blue = Math.floor(Math.random() * 255);

    return "rgb(" + red + "," + green + "," + blue + ")";
}

// Actions
function resetCanvas() {
    var canvas = document.querySelector("#canvas")
    var dots = canvas.querySelectorAll("div")

    for (let index = 0; index < dots.length; index++) {
        dots[index].style.backgroundColor = BackgroundColor
    }
}
