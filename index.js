let initialized = false;

var Module = { onRuntimeInitialized: () => { initialized = true; }}

const numStepsInput = document.getElementById("numStepsInput");
const densityInput = document.getElementById("densityInput");
const subDensityInput = document.getElementById("subDensityInput");
const generateButton = document.getElementById("generateButton");
const outputText = document.getElementById("outputText");
const downloadLink = document.getElementById("downloadLink");

generateButton.addEventListener("click", () => { 
    generateMIDIFile(numStepsInput.value, densityInput.value, subDensityInput.value); 
});

function generateMIDIFile(numSteps, density, subDensity) {
    if (!initialized) return;
    
    numSteps = Number(numSteps);
    if (numSteps < 0) {
        alert("Number of Steps is out of range");
        return;
    }

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

    let generator = new Module.DrumBreakGenerator();
    let configs = new Module.ConfigList();
    configs.push_back({instrument: 36, density: 1, sub_density: 1});

    let seq = generator.generateSequence(numSteps, configs);

    outputText.innerText = seq.to_string();
    let buffer = Module.writeToBuffer(seq);
    seq.delete();

    var blob = new Blob([buffer], { type: 'audio/midi' });
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'out.mid';
    downloadLink.style = "visibility: visible";
}