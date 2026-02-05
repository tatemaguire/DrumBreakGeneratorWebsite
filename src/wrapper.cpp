#include <emscripten/bind.h>
#include <emscripten/val.h>

#include "DrumBreakGenerator/src/midi.hpp"
#include "DrumBreakGenerator/src/generator.hpp"

using namespace emscripten;

val writeToJSBuffer(MIDISequence seq) {
    std::string str = seq.writeToBuffer();
    unsigned char* buff = (unsigned char*)(str.data());
    size_t bufferLength = str.length();
    return val(typed_memory_view(bufferLength, buff));
}

EMSCRIPTEN_BINDINGS(my_module) {
    class_<MIDISequence>("MIDISequence")
        .function("to_string", &MIDISequence::to_string);
    function("writeToBuffer", &writeToJSBuffer);
    function("generateSequence", &generateSequence);
    function("randInt", &randInt);
}