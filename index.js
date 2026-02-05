



const densityInput = document.getElementById("densityInput");
const generateButton = document.getElementById("generateButton");

generateButton.addEventListener("click", () => { generateMIDIFile(densityInput.value); });

function generateMIDIFile(density) {
    if (density < 0 || density > 1) {
        throw new Error("Density is out of range");
    }

    

    const anchor = document.createElement("a");
    anchor.href = "./favicon.ico";
    anchor.download = "icon.ico";
    anchor.click();
}