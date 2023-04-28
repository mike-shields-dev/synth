import { useEffect, useState } from "react";
import { publishControlChange, publishNoteOff, publishNoteOn, publishPitchBend } from "../../../PubSub";

function useMidiAccess() {
    const [isRequesting, setIsRequesting] = useState(true);
    const [midiAccess, setMidiAccess] = useState<WebMidi.MIDIAccess>();
    const [midiAccessError, setMidiAccessError] = useState<DOMException>();
    const [midiInputs, setMidiInputs] = useState<WebMidi.MIDIInputMap>();
    const [midiOutputs, setMidiOutputs] = useState<WebMidi.MIDIOutputMap>();

    useEffect(() => {
        try {
            navigator
                .requestMIDIAccess()
                .then(setMidiAccess)
                .then(() => setIsRequesting(false))
                .catch(setMidiAccessError);
        } catch (err) {
            console.log(err);
        }
    }, []);

    useEffect(() => {
        if (midiAccess) {
            setMidiPorts(midiAccess);

            try {
                midiAccess.addEventListener('statechange', () => setMidiPorts(midiAccess));
            }
            catch (err) {
                console.error(err);
            }
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

        if (statusByte === 224) {
            const data = (dataByte2 << 7) | dataByte1;

            publishPitchBend(data);
        }

        if (statusByte >= 176 && statusByte <= 191) {
            const data = { controlChangeNumber: dataByte1, value: dataByte2 };

            publishControlChange(data);
        }

        if (statusByte >= 144 && statusByte <= 159) {
            const data = { noteNumber: dataByte1, velocity: dataByte2 }

            publishNoteOn(data);
        }

        if (statusByte >= 128 && statusByte <= 143) {
            const data = { noteNumber: dataByte1 };

            publishNoteOff(data);
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

export default useMidiAccess;
