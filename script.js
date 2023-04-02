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

// Default settings
var ColorPicked = "rgb(255,0,0)"
var BackgroundColor = "white";
var MousedownOnCanvas = false

// Divs
var SlidersDiv = document.getElementById("slider")
var CanvasDiv = document.getElementById("canvas")
var ColorPickersDiv = document.getElementById("color-pickers")
var ButtonsDiv = document.getElementById("buttons")

createUI()

function createUI() {
    // Default layout of canvas is 16x16
    createCanvas(16)

    // Initilizes all dom elements into arrays  
    objectsSlidersDiv = [
        canvasDimensionsLabelObject(),
        canvasDimensionsRangeSliderObject()
    ]
    objectsColorPickersDiv = [
        brushColorPickerLabelObject(),
        brushColorPickerObject(),
        backgroundColorPickerLabelObject(),
        backgroundColorPickerObject()
    ]
    objectsButtonsDiv = [
        resetButtonObject(),
        ranbomColorButtonObject(),
        eraserButtonObject()
    ]

    // Appends all all dom elements to respective dom element
    objectsSlidersDiv.forEach(dom => {
        SlidersDiv.appendChild(dom)
    });
    objectsColorPickersDiv.forEach(dom => {
        ColorPickersDiv.appendChild(dom)
    });
    objectsButtonsDiv.forEach(dom => {
        ButtonsDiv.appendChild(dom)
    });
}

// Create Default Canvas
function createCanvas(dimensions) {

    // Adds dots, Y-axis for the first loop, X-axis for the second loop
    for (let index = 0; index < dimensions; index++)
        for (let index = 0; index < dimensions; index++)
            CanvasDiv.appendChild(dot(dimensions));

    // Creates action listeners so the colors only change when mousedown
    CanvasDiv.addEventListener("mousedown", () => MousedownOnCanvas = true)
    CanvasDiv.addEventListener("mouseup", () => MousedownOnCanvas = false)
    /* Current Bug: When in rainbow mode, the color doesn't stop chaning when hovering over the same dot */
    CanvasDiv.addEventListener("touchmove", (e) => {
        e.preventDefault()
        var touch = e.touches[0]
        var targetElement = document.elementFromPoint(touch.clientX, touch.clientY)
        if (targetElement.class === "dot") {
            targetElement.style.backgroundColor = colorManager(ColorPicked)
        }
    })
}

// Dots for canvas object
function dot(dimensionsOfCanvas) {
    var dot = document.createElement("div");
    var length = 100 / dimensionsOfCanvas;

    dot.style.width = length.toString() + "%"
    dot.style.height = length.toString() + "%"
    dot.style.backgroundColor = BackgroundColor;
    dot.class = "dot";

    dot.addEventListener("mouseover", () => {
        if (MousedownOnCanvas)
            dot.style.backgroundColor = colorManager(ColorPicked)
    })

    return dot;
}
// Canvas Size Changer, Labels, Color Picker/Finders
function canvasDimensionsLabelObject() {
    var label = document.createElement("p");
    label.id = "canvasDimensionsLabel"
    label.innerText = "change dimensions of canvas: 16"

    return label;
}

function canvasDimensionsRangeSliderObject() {
    var canvasSizeChanger = document.createElement("input");
    canvasSizeChanger.type = "range"
    canvasSizeChanger.min = "1"
    canvasSizeChanger.max = "56"
    canvasSizeChanger.value = "16"
    canvasSizeChanger.id = "canvasSizeChanger"

    canvasSizeChanger.oninput = () => {
        document.getElementById("canvasDimensionsLabel").innerText = "change dimensions of canvas: " + canvasSizeChanger.value;
        changeDimensionsOfCanvas(canvasSizeChanger.value)
    }

    return canvasSizeChanger;
}

function brushColorPickerLabelObject() {
    var brushColorPickerLabel = document.createElement("p");
    brushColorPickerLabel.innerText = "change color of brush:";

    return brushColorPickerLabel;
}

function backgroundColorPickerLabelObject() {
    var backgroundColorPickerLabel = document.createElement("p");
    backgroundColorPickerLabel.innerText = "change color of background:";

    return backgroundColorPickerLabel;
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
//Empty Space (temp)
function emptySpace() {
    var emptySpace = document.createElement("p");
    return emptySpace;
}

// Buttons
function resetButtonObject() {
    var resetButton = document.createElement("button");
    resetButton.innerText = "reset the dang canvas";
    resetButton.addEventListener("mousedown", () => resetCanvas());

    return resetButton;
}

function ranbomColorButtonObject() {
    var randomColorButton = document.createElement("button");
    randomColorButton.innerText = "rainbow mode";

    randomColorButton.addEventListener("mousedown", () => {
        ColorPicked = "random"
    })

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
    eraserButton.innerText = "erase me plz :D";

    eraserButton.addEventListener("mousedown", () => {
        ColorPicked = "erase"
    });

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

function changeBackground(newBackgroundColor) {
    var dots = CanvasDiv.querySelectorAll("div")

    for (let index = 0; index < dots.length; index++)
        if (dots[index].style.backgroundColor === BackgroundColor)
            dots[index].style.backgroundColor = newBackgroundColor
}

function changeDimensionsOfCanvas(newDimensions) {
    while (CanvasDiv.firstChild)
        CanvasDiv.removeChild(CanvasDiv.firstChild)

    createCanvas(newDimensions)
}
// Conversion
function htmlToRGB(color) {
    const red = parseInt(color.substring(1, 3), 16);
    const green = parseInt(color.substring(3, 5), 16);
    const blue = parseInt(color.substring(5, 7), 16);

    return "rgb(" + red + ", " + green + ", " + blue + ")";
}
