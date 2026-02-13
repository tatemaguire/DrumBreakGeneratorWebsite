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
    class_<DrumBreakGenerator>("DrumBreakGenerator")
        .constructor<>()
        .constructor<std::default_random_engine::result_type>()
        .function("generateSequence", &DrumBreakGenerator::generateSequence)
        .property("seed", &DrumBreakGenerator::seed);
    value_object<InstrumentConfig>("InstrumentConfig")
        .field("instrument", &InstrumentConfig::instrument)
        .field("density", &InstrumentConfig::density)
        .field("sub_density", &InstrumentConfig::sub_density);
    register_vector<InstrumentConfig>("ConfigList");
}