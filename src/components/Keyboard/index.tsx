import { publishMidiNoteOn, publishMidiNoteOff } from "../../PubSub";

const keys = [
    { name: 'C', leftOffset: 0, value: 0, className: "MajorKey" },
    { name: 'D', leftOffset: 1, value: 2, className: "MajorKey" },
    { name: 'E', leftOffset: 2, value: 4, className: "MajorKey" },
    { name: 'F', leftOffset: 3, value: 5, className: "MajorKey" },
    { name: 'G', leftOffset: 4, value: 7, className: "MajorKey" },
    { name: 'A', leftOffset: 5, value: 9, className: "MajorKey" },
    { name: 'B', leftOffset: 6, value: 11, className: "MajorKey" },
    { name: 'Db', leftOffset: 0.75, value: 1, className: "MinorKey" },
    { name: 'Eb', leftOffset: 1.75, value: 3, className: "MinorKey" },
    { name: 'Gb', leftOffset: 3.75, value: 6, className: "MinorKey" },
    { name: 'Ab', leftOffset: 4.75, value: 8, className: "MinorKey" },
    { name: 'Bb', leftOffset: 5.75, value: 10, className: "MinorKey" },
];

function Keyboard() {
    function onNoteOn() {
        publishMidiNoteOn({
            noteNumber: 63,
            velocity: 80,
        });
    }

    function onNoteOff () {
        publishMidiNoteOff({
            noteNumber: 63,
        })
    }

    return (
        <div>
            {keys.map(({name}) => 
                <button 
                    key={`key-${name}`}name={name}
                    onMouseDown={onNoteOn}
                    onMouseLeave={onNoteOff}
                    onMouseUp={onNoteOff}
                ></button>
            )}
        </div>
    )
}

export { Keyboard };