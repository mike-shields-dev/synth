import { useEffect, useState } from 'react';
import {
    NoteOff, NoteOffSubscriber, NoteOn, NoteOnSubscriber, publishNoteOff, publishNoteOn
} from "../../../PubSub";
import { publishOctaveChange } from '../../../PubSub/OctaveChange';
import { octaveToNoteOffset } from '../../../utils/Scalers';
import css from './index.module.css';

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
    const [octave, setOctave] = useState(0);
    const [activeNotes, setActiveNotes] = useState<number[]>([]);

    function onNote(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const noteNumber = +e.currentTarget.value;

        if (['click', 'mousedown'].includes(e.type)) {
            return publishNoteOn({
                noteNumber: noteNumber + octaveToNoteOffset(octave),
                velocity: 80,
            })
        }
        if (['mouseup', 'mouseleave'].includes(e.type)) {
            return publishNoteOff({
                noteNumber: noteNumber + octaveToNoteOffset(octave),
            })
        }
    }

    function onPublishedNoteOn(TOPIC: string, data: NoteOn) {
        const noteNumber = data.noteNumber;

        setActiveNotes((prevActiveNotes) => [...new Set([noteNumber, ...prevActiveNotes])]);
    }

    function onPublishedNoteOff(TOPIC: string, data: NoteOff) {
        const noteNumber = data.noteNumber;

        setActiveNotes(prevActiveNotes =>
            prevActiveNotes.filter(activeNote => activeNote !== noteNumber)
        );
    }

    useEffect(() => {
        const noteOnSubscriber = new NoteOnSubscriber(onPublishedNoteOn);
        const noteOffSubscriber = new NoteOffSubscriber(onPublishedNoteOff);

        return () => {
            noteOnSubscriber.unsubscribe();
            noteOffSubscriber.unsubscribe();
        }
    }, []);

    function onOctave(e: React.ChangeEvent<HTMLInputElement>) {
        const { value } = e.target;

        setOctave(+value)
        publishOctaveChange(+value);
    }

    return (
        <div>
            <label htmlFor="octave">Octave: </label>
            <input
                type="number"
                id="octave"
                min="-5"
                max="5"
                value={octave}
                onChange={onOctave}
            />
            <div>
                {keys.map(({ name, value }) => {
                    const isActive =
                        activeNotes.includes(value + octaveToNoteOffset(octave));

                    return (
                        <button
                            type="button"
                            aria-label="key"
                            value={value}
                            key={`key-${name}`}
                            onMouseDown={onNote}
                            onMouseUp={onNote}
                            onMouseLeave={onNote}
                            style={{ left: `calc(100% * ${leftOffset / 7}` }}
                            className={`${css.key} ${isActive ? css[`key--active`] : ""} ${css[className]}`}
                            data-testid={isActive ? `key--active` : ''}
                        >
                            {name}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export { UIKeyboard };
