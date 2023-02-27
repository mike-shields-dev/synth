import { useEffect, useState } from "react";
import { publishMidiControlChange } from "../../../PubsNSubs/MidiControlChange";
import { publishMidiNoteOff } from "../../../PubsNSubs/MidiNoteOff";
import { publishMidiNoteOn } from "../../../PubsNSubs/MidiNoteOn";

function useMidiAccess() {
    const [isRequesting, setIsRequesting] = useState(true);
    const [midiAccess, setMidiAccess] = useState<WebMidi.MIDIAccess>();
    const [midiAccessError, setMidiAccessError] = useState<DOMException>();
    const [midiInputs, setMidiInputs] = useState<WebMidi.MIDIInputMap>();
    const [midiOutputs, setMidiOutputs] = useState<WebMidi.MIDIOutputMap>();

    useEffect(() => {
        navigator
            .requestMIDIAccess()
            .then(setMidiAccess)
            .then(() => setIsRequesting(false))
            .catch(setMidiAccessError);
    }, []);

    useEffect(() => {
        if (midiAccess) {
            setMidiPorts(midiAccess);
            midiAccess.addEventListener('statechange', () => setMidiPorts(midiAccess));
        }
    }, [midiAccess]);

    function setMidiPorts(midiAccess: WebMidi.MIDIAccess) {
        setMidiInputs(midiAccess.inputs);
        setMidiOutputs(midiAccess.outputs);
    }

    useEffect(() => {
        if (midiInputs) addEventListeners(midiInputs);
    }, [midiInputs]);

    function addEventListeners(midiInputs: WebMidi.MIDIInputMap) {
        midiInputs.forEach(midiInput => midiInput.addEventListener('midimessage', emitMidiMessage));
    };

    function emitMidiMessage(midiMessage: WebMidi.MIDIMessageEvent) {

        const [statusByte, dataByte1, dataByte2] = midiMessage.data;

        if (statusByte >= 176 && statusByte <= 191) {
            publishMidiControlChange({
                controlChangeNumber: dataByte1,
                value: dataByte2,
            })
        }

        if (statusByte >= 144 && statusByte <= 159) {
            publishMidiNoteOn({
                noteNumber: dataByte1,
                velocity: dataByte2,
            });
        }

        if (statusByte >= 128 && statusByte <= 143) {
            publishMidiNoteOff({ noteNumber: dataByte1 })
        }
    }

    return {
        isRequesting,
        midiAccess,
        midiAccessError,
        midiInputs,
        midiOutputs
    };
}

export { useMidiAccess };
