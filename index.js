let initialized = false;

var Module = { onRuntimeInitialized: () => { initialized = true; }}

const numStepsInput = document.getElementById("numStepsInput");

const kickDensityInput = document.getElementById("kickDensityInput");
const kickSubDensityInput = document.getElementById("kickSubDensityInput");
const snareDensityInput = document.getElementById("snareDensityInput");
const snareSubDensityInput = document.getElementById("snareSubDensityInput");
const hhDensityInput = document.getElementById("hhDensityInput");
const hhSubDensityInput = document.getElementById("hhSubDensityInput");
const ohDensityInput = document.getElementById("ohDensityInput");
const ohSubDensityInput = document.getElementById("ohSubDensityInput");

const generateButton = document.getElementById("generateButton");
const outputText = document.getElementById("outputText");
const downloadLink = document.getElementById("downloadLink");

generateButton.addEventListener("click", () => { 
    generateMIDIFile(); 
});

function generateMIDIFile() {
    if (!initialized) return;

    const numSteps = Number(numStepsInput.value);
    const kickDensity = Number(kickDensityInput.value);
    const kickSubDensity = Number(kickSubDensityInput.value);
    const snareDensity = Number(snareDensityInput.value);
    const snareSubDensity = Number(snareSubDensityInput.value);
    const hhDensity = Number(hhDensityInput.value);
    const hhSubDensity = Number(hhSubDensityInput.value);
    const ohDensity = Number(ohDensityInput.value);
    const ohSubDensity = Number(ohSubDensityInput.value);
    
    let configs = new Module.ConfigList();
    configs.push_back({instrument: 36, density: kickDensity, sub_density: kickSubDensity});
    configs.push_back({instrument: 37, density: snareDensity, sub_density: snareSubDensity});
    configs.push_back({instrument: 38, density: hhDensity, sub_density: hhSubDensity});
    configs.push_back({instrument: 39, density: ohDensity, sub_density: ohSubDensity});

    for (c of configs) {
        if (c.density < 0 || c.density > 1 || c.sub_density < 0 || c.sub_density > 1) {
            alert("density or sub_density value(s) are out of range");
            return;
        }
    }

    if (numSteps < 0) {
        alert("Number of Steps is out of range");
        return;
    }

    let generator = new Module.DrumBreakGenerator();
    let seq = generator.generateSequence(numSteps, configs);

    outputText.innerText = seq.to_string();
    let buffer = Module.writeToBuffer(seq);
    seq.delete();

    var blob = new Blob([buffer], { type: 'audio/midi' });
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'out.mid';
    downloadLink.style = "visibility: visible";
}