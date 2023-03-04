/* Etch and Sketch script:
    * Global variables are meant to store user variables that change over the course of usage.
    *
    * Create functions create each part of the UI including buttons, canvas, sliders, and HTML color picker blah blah blah:
    * - Each object function contains an action listener and innerText as label. 
    * - Each object function returns the object for the createUI function to append to it's respective div.
    *
    * Other things to note:
    * - When the background color changes, 
    *   it has to be converted to RGB values for the change backgroud color 
    *   to compare newBackgroundColor's value and current background color's value.
    * */

    // Global Variables
var ColorPicked = "random";
var BackgroundColor = "white";
// Global Accessible DOM elements
var CanvasDiv = document.getElementById("canvas")
var ButtonsDiv = document.getElementById("buttons")

createUI()

function createUI() {
    // Default layout of canvas is 16x16 
    // Default size of each dot is 25 pixels
    createCanvas(16,25)

    objectsInButtonsDiv=[
        // Brush and Background Color Picker
        brushColorPickerObject(),
        backgroundColorPickerObject(),
        // Buttons
        resetButtonObject(),
        ranbowColorButtonObject(),
        eraserButtonObject()
    ]
    objectsInButtonsDiv.forEach(domObject => {
        ButtonsDiv.appendChild(domObject)
    });
}

// Create Default Canvas
function createCanvas(numOfDots, dotSize) {
    // Y-axis for the first loop, X-axis for the second loop
    for (let index = 0; index < numOfDots; index++) 
        for (let index = 0; index < numOfDots; index++) 
            CanvasDiv.appendChild(dotObject(dotSize));
}

// Button and Color Picker Objects
function dotObject(size) {
    var dot = document.createElement("div");

    dot.style.width = size+"px";
    dot.style.height = size+"px";
    dot.style.backgroundColor = BackgroundColor;
    dot.class = "dot";

    dot.addEventListener("mouseover", () => {dot.style.backgroundColor = colorManager(ColorPicked)});

    return dot;
}

function resetButtonObject() {
    var resetButton = document.createElement("button");
    resetButton.innerText = "reset the dang square";
    resetButton.addEventListener("mousedown", () => resetCanvas());

    return resetButton;
}
function brushColorPickerObject() {
    var brushColorPicker = document.createElement("input");
    brushColorPicker.onchange = "colorSelected(this)";
    brushColorPicker.type = "color";

    brushColorPicker.onchange = (event) => {
        ColorPicked = event.target.value;
    };

    return brushColorPicker;
}
function ranbowColorButtonObject() {
    var randomColorButton = document.createElement("button");
    randomColorButton.innerText = "make me a random color woohoo";

    randomColorButton.addEventListener("mousedown", () => ColorPicked = "random");

    return randomColorButton;
}
function backgroundColorPickerObject() {
    var backgroundColorPicker = document.createElement("input");
    backgroundColorPicker.onchange = "colorSelected(this)";
    backgroundColorPicker.type = "color";

    backgroundColorPicker.onchange = (event) => {
        var backgroundColorPicked = event.target.value
        changeBackground(backgroundColorPicked)
        BackgroundColor = htmlToRGB(backgroundColorPicked)
    }

    return backgroundColorPicker;
}
function eraserButtonObject() {
    var eraserButton = document.createElement("button");
    eraserButton.innerText = "make me erase woohoo";

    eraserButton.addEventListener("mousedown", () => ColorPicked = "erase");

    return eraserButton;
}

// Managers
function colorManager(colorPicked) {
    if (colorPicked == "erase") 
        return BackgroundColor

    if (colorPicked != "random") 
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

// Conversion
function htmlToRGB(color){
    const red = parseInt(color.substring(1, 3), 16);
    const green = parseInt(color.substring(3, 5), 16);
    const blue = parseInt(color.substring(5, 7), 16);

    return "rgb(" + red + ", " + green + ", " + blue + ")";
}
