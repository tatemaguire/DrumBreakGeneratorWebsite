let initialized = false;

var Module = { onRuntimeInitialized: () => { initialized = true; }}

const densityInput = document.getElementById("densityInput");
const subDensityInput = document.getElementById("subDensityInput");
const chaosInput = document.getElementById("chaosInput");
const generateButton = document.getElementById("generateButton");
const outputText = document.getElementById("outputText");
const downloadLink = document.getElementById("downloadLink");

generateButton.addEventListener("click", () => { 
    generateMIDIFile(densityInput.value, subDensityInput.value, chaosInput.value); 
});

function generateMIDIFile(density, subDensity, chaos) {
    if (!initialized) return;
    
    density = Number(density);
    if (density < 0 || density > 1) {
        alert("Density is out of range");
        return;
    }
    subDensity = Number(subDensity);
    if (subDensity < 0 || subDensity > 1) {
        alert("Subdivision Density is out of range");
        return;
    }
    chaos = Number(chaos);
    if (chaos < 0 || chaos > 1) {
        alert("Chaos is out of range");
        return;
    }

    let seq = Module.generateSequence(density);
    outputText.innerText = seq.to_string();
    let buffer = Module.writeToBuffer(seq);
    seq.delete();

    var blob = new Blob([buffer], { type: 'audio/midi' });
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'out.mid';
    downloadLink.style = "visibility: visible";
}