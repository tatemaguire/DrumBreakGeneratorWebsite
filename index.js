let initialized = false;

var Module = { onRuntimeInitialized: () => { initialized = true; }}


const densityInput = document.getElementById("densityInput");
const generateButton = document.getElementById("generateButton");

generateButton.addEventListener("click", () => { generateMIDIFile(densityInput.value); });

function generateMIDIFile(density) {
    density = Number(density);
    if (!initialized) return;

    if (density < 0 || density > 1) {
        throw new Error("Density is out of range");
    }

    console.log(typeof(density));

    let seq = Module.generateSequence(density);
    let buffer = Module.writeToBuffer(seq);
    seq.delete();

    var blob = new Blob([buffer], { type: 'audio/midi' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'out.mid';
    link.click();

    // const anchor = document.createElement("a");
    // anchor.href = "./out.mid";
    // anchor.download = "out.mid";
    // anchor.click();
}