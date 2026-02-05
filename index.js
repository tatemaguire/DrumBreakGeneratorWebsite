let initialized = false;

var Module = { onRuntimeInitialized: () => { initialized = true; }}


const densityInput = document.getElementById("densityInput");
const generateButton = document.getElementById("generateButton");

generateButton.addEventListener("click", () => { generateMIDIFile(densityInput.value); });

function generateMIDIFile(density) {
    if (!initialized) return;

    if (density < 0 || density > 1) {
        throw new Error("Density is out of range");
    }

    let seq = Module.generateSequence(0.5);
    console.log(seq.to_string());
    seq.writeToFile("out.mid");

    const anchor = document.createElement("a");
    anchor.href = "./out.mid";
    anchor.download = "out.mid";
    anchor.click();
}