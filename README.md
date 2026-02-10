# Drum Break Generator Website
By Tate Maguire

For CMPM 147 at UCSC

## Compiling generator.js and generator.wasm
```sh
emcc -lembind src/wrapper.cpp src/DrumBreakGenerator/src/generator.cpp src/DrumBreakGenerator/src/midi.cpp -o generator.js
```