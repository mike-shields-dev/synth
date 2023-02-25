import { useEffect, useState } from "react";

function useMidiAccess() {
    const [isRequesting, setIsRequesting] = useState(true);
    const [midiAccess, setMidiAccess] = useState<WebMidi.MIDIAccess>();
    const [midiAccessError, setMidiAccessError] = useState();
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

        PubSub.publish('midiMessage', {
            statusByte,
            dataByte1, 
            dataByte2,
        });
    }


    return { isRequesting, midiAccess, midiAccessError, midiInputs, midiOutputs };
}

export default useMidiAccess;