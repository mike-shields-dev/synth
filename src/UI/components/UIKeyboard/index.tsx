import { useEffect, useState } from 'react';
import { publishMidiNoteOff, publishMidiNoteOn } from "../../../PubSub";
import { publishOctaveChange } from '../../../PubSub/OctaveChange';

type Key = { name: string, leftOffset: number, value: number, className: string }

const keys: Key[] = [
    { name: 'C', leftOffset: 0, value: 60, className: "MajorKey" },
    { name: 'Db', leftOffset: 0.75, value: 61, className: "MinorKey" },
    { name: 'D', leftOffset: 1, value: 62, className: "MajorKey" },
    { name: 'Eb', leftOffset: 1.75, value: 63, className: "MinorKey" },
    { name: 'E', leftOffset: 2, value: 64, className: "MajorKey" },
    { name: 'F', leftOffset: 3, value: 65, className: "MajorKey" },
    { name: 'Gb', leftOffset: 3.75, value: 66, className: "MinorKey" },
    { name: 'G', leftOffset: 4, value: 67, className: "MajorKey" },
    { name: 'Ab', leftOffset: 4.75, value: 68, className: "MinorKey" },
    { name: 'A', leftOffset: 5, value: 69, className: "MajorKey" },
    { name: 'Bb', leftOffset: 5.75, value: 70, className: "MinorKey" },
    { name: 'B', leftOffset: 6, value: 71, className: "MajorKey" },
];

function UIKeyboard() {
    const [transpose, setOctave] = useState(0);

    function onNote(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const noteNumber = +e.currentTarget.value;

        if (['click', 'mousedown'].includes(e.type)) {
            return publishMidiNoteOn({
                noteNumber: noteNumber,
                velocity: 80,
            })
        }
        if (['mouseup', 'mouseleave'].includes(e.type)) {
            return publishMidiNoteOff({
                noteNumber: noteNumber,
            })
        }
    }

    function onOctave(e: React.ChangeEvent<HTMLInputElement>) {
        const { value } = e.target;

        setOctave(+value)
        publishOctaveChange(+value);
    }

    return (
        <div>
            <label htmlFor="transpose">Octave: </label>
            <input
                type="number"
                id="transpose"
                min="-5"
                max="5"
                value={transpose}
                onChange={onOctave}
            />
            <div>
                {keys.map(({ name, value }) =>
                    <button
                        type="button"
                        aria-label="key"
                        value={value}
                        key={`key-${name}`}
                        onMouseDown={onNote}
                        onMouseUp={onNote}
                        onMouseLeave={onNote}
                    >
                        {name}
                    </button>
                )}
            </div>
        </div>
    )
}

export { UIKeyboard };
