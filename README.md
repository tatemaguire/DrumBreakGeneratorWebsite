# Drum Break Generator Website
By Tate Maguire

For CMPM 147 at UCSC

[Visit the site](https://tatemaguire.github.io/DrumBreakGeneratorWebsite/)

## Source Code
[https://github.com/tatemaguire/DrumBreakGenerator](https://github.com/tatemaguire/DrumBreakGenerator)

## Compiling generator.js and generator.wasm using Emscripten
```sh
emcc -lembind src/wrapper.cpp src/DrumBreakGenerator/src/generator.cpp src/DrumBreakGenerator/src/midi.cpp -o generator.js
```
