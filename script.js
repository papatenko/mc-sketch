// Global Variables
var ColorPicked = "rainbow";
var BackgroundColor = "white";
var ButtonsDiv = document.getElementById("buttons")
var CanvasDiv = document.getElementById("canvas")

// Calling Creaction Functions
createCanvas(16,25);
createButtons();

// Create UI
function createCanvas(numOfDots, dotSize) {
    // Y-axis
    for (let index = 0; index < numOfDots; index++) {
        // X-axis
        for (let index = 0; index < numOfDots; index++) {
            createDot(dotSize);
        }
    }
}

function createButtons() {
    createResetButton();
    createBrushColorPicker();
    createBackgroundColorPicker();
    createRanbowColorButton();
    createEraserButton();
}

function createDot(size) {
    var dot = document.createElement("div");

    dot.style.width = size+"px";
    dot.style.height = size+"px";
    dot.style.backgroundColor = BackgroundColor;
    dot.class = "dot";

    dot.addEventListener("mouseover", () => {
        dot.style.backgroundColor = colorManager(ColorPicked);
    });

    CanvasDiv.appendChild(dot);
}

function createResetButton() {
    var changeColorButton = document.createElement("button");
    changeColorButton.innerText = "reset the dang square";
    changeColorButton.addEventListener("mousedown", () => resetCanvas());

    ButtonsDiv.appendChild(changeColorButton);
}
function createBrushColorPicker() {
    var brushColorPicker = document.createElement("input");
    brushColorPicker.onchange = "colorSelected(this)";
    brushColorPicker.type = "color";

    brushColorPicker.onchange = (event) => {
        ColorPicked = event.target.value;
    };

    ButtonsDiv.appendChild(brushColorPicker);
}
function createRanbowColorButton() {
    var rainbowColorButton = document.createElement("button");
    rainbowColorButton.innerText = "make me rainbow woohoo";

    rainbowColorButton.addEventListener("mousedown", () => ColorPicked = "rainbow");

    ButtonsDiv.appendChild(rainbowColorButton);
}
function createBackgroundColorPicker() {
    var backgroundColorPicker = document.createElement("input");
    backgroundColorPicker.onchange = "colorSelected(this)";
    backgroundColorPicker.type = "color";

    backgroundColorPicker.onchange = (event) => {
        var backgroundColorPicked = event.target.value
        changeBackground(backgroundColorPicked)
        BackgroundColor = htmlToRGB(backgroundColorPicked)
    }

    ButtonsDiv.appendChild(backgroundColorPicker);
}
function createEraserButton() {
    var eraserButton = document.createElement("button");
    eraserButton.innerText = "make me erase woohoo";

    eraserButton.addEventListener("mousedown", () => ColorPicked = "erase");

    ButtonsDiv.appendChild(eraserButton);
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

    return "rgb(" + red + ", " + green + ", " + blue + ")";
}

// Actions

function resetCanvas() {
    var dots = CanvasDiv.querySelectorAll("div")

    for (let index = 0; index < dots.length; index++) 
    dots[index].style.backgroundColor = BackgroundColor
}

function changeBackground(newBackgroundColor){
    var dots = CanvasDiv.querySelectorAll("div")

    for (let index = 0; index < dots.length; index++) 
    if (dots[index].style.backgroundColor === BackgroundColor) 
    dots[index].style.backgroundColor = newBackgroundColor
}

function htmlToRGB(color){
    const red = parseInt(color.substring(1, 3), 16);
    const green = parseInt(color.substring(3, 5), 16);
    const blue = parseInt(color.substring(5, 7), 16);

    return "rgb(" + red + ", " + green + ", " + blue + ")";
}
