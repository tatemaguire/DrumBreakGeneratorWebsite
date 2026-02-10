#include <emscripten/bind.h>
#include <emscripten/val.h>

#include "DrumBreakGenerator/src/midi.hpp"
#include "DrumBreakGenerator/src/generator.hpp"

using namespace emscripten;

val writeToJSBuffer(MIDISequence seq) {
    std::vector<MIDISequence::Byte> buff = seq.writeToBuffer();
    return val(typed_memory_view(buff.size(), buff.data()));
}

EMSCRIPTEN_BINDINGS(my_module) {
    class_<MIDISequence>("MIDISequence")
        .function("to_string", &MIDISequence::to_string);
    function("writeToBuffer", &writeToJSBuffer);
    function("generateSequence", &generateSequence);
    function("randInt", &randInt);
}