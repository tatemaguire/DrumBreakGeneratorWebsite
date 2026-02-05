#include <emscripten/bind.h>
#include <string>

#include "DrumBreakGenerator/src/midi.hpp"
#include "DrumBreakGenerator/src/generator.hpp"

using namespace emscripten;

EMSCRIPTEN_BINDINGS(my_module) {
    class_<MIDISequence>("MIDISequence")
        .function("writeToFile", &MIDISequence::writeToFile)
        .function("to_string", &MIDISequence::to_string);
    function("generateSequence", &generateSequence);
}