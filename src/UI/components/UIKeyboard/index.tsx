import { publishMidiNoteOn, publishMidiNoteOff } from "../../../PubSub";

type Key = { name: string, leftOffset: number, value: number, className: string }

const keys: Key[] = [
    { name: 'C', leftOffset: 0, value: 0, className: "MajorKey" },
    { name: 'Db', leftOffset: 0.75, value: 1, className: "MinorKey" },
    { name: 'D', leftOffset: 1, value: 2, className: "MajorKey" },
    { name: 'Eb', leftOffset: 1.75, value: 3, className: "MinorKey" },
    { name: 'E', leftOffset: 2, value: 4, className: "MajorKey" },
    { name: 'F', leftOffset: 3, value: 5, className: "MajorKey" },
    { name: 'Gb', leftOffset: 3.75, value: 6, className: "MinorKey" },
    { name: 'G', leftOffset: 4, value: 7, className: "MajorKey" },
    { name: 'Ab', leftOffset: 4.75, value: 8, className: "MinorKey" },
    { name: 'A', leftOffset: 5, value: 9, className: "MajorKey" },
    { name: 'Bb', leftOffset: 5.75, value: 10, className: "MinorKey" },
    { name: 'B', leftOffset: 6, value: 11, className: "MajorKey" },
];

function UIKeyboard() {

    function onNote(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const noteNumber = +e.currentTarget.value;

        if (['click', 'mousedown'].includes(e.type)) {
            return publishMidiNoteOn({
                noteNumber,
                velocity: 80,
            })
        }
        if (e.type === 'mouseup') {
            return publishMidiNoteOff({
                noteNumber
            })
        }
    }

    return (
        <div>
            {keys.map(({ name, value}) =>
                <button
                    type="button"
                    aria-label="key"
                    value={value}
                    key={`key-${name}`}
                    onMouseDown={onNote}
                    onMouseUp={onNote}
                >
                    { name }
                </button>
            )}
        </div>
    )
}

export { UIKeyboard };