import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { UIKeyboard } from "..";
import { NOTE_OFF, NOTE_ON } from "../../../../PubSub/topics";

const octaveToNoteOffset = (octave: number) => octave * 12;

describe('UIKeyboard', () => {
    beforeEach(() => {
        render(<UIKeyboard />);
    });

    it('matches snapshot', () => {
        const { container } = render(<UIKeyboard />)

        expect(container).toMatchSnapshot();
    });

    it('renders 12 buttons, one for each piano key of an octave', () => {
        expect(screen.getAllByRole('button')).toHaveLength(12);
    });

    it('each key publishes a note on message with the correct noteNumber', async () => {
        const spy = vi.fn();
        const keys = screen.getAllByRole('button').filter(key => key.getAttribute("aria-label")?.includes("key"));
        const subscriber = PubSub.subscribe(NOTE_ON, spy);

        for (const key of keys) {
            const keyValue = Number(key.getAttribute('value'));
            await act(() => fireEvent.mouseDown(key))

            await waitFor(() => {
                expect(spy).toHaveBeenCalledWith(
                    NOTE_ON,
                    {
                        noteNumber: keyValue,
                        velocity: 80,
                    }
                );
            });
        };

        PubSub.unsubscribe(subscriber);
    });

    it('each key publishes a note off message with the correct note number', async () => {
        const spy = vi.fn();
        const keys = screen.getAllByRole('button').filter(key => key.getAttribute("aria-label")?.includes("key"));
        const subscriber = PubSub.subscribe(NOTE_OFF, spy);

        for (const key of keys) {
            const keyValue = Number(key.getAttribute('value'));
            await act(() => fireEvent.mouseUp(key))

            await waitFor(() => {
                expect(spy).toHaveBeenCalledWith(
                    NOTE_OFF,
                    {
                        noteNumber: keyValue,
                    }
                );
            });
        };

        PubSub.unsubscribe(subscriber);
    });

    it('each key publishes the correct note number according to the octave value', async () => {
        const spy = vi.fn();
        const keys = screen.getAllByRole('button').filter(key => key.getAttribute("aria-label")?.includes("key"));
        const octaveInput = screen.getByRole('spinbutton', { name: /octave/i });
        const octaves = [-5, -4, -3, -2, -1, 0, 1, 2, 4, 5];

        PubSub.subscribe(NOTE_ON, spy);
        PubSub.subscribe(NOTE_OFF, spy);

        for (const octave of octaves) {
            await waitFor(() => {
                fireEvent.change(octaveInput, { target: { value: octave } })
            });

            for (const key of keys) {
                const keyValue = Number(key.getAttribute('value'));

                await act(() => fireEvent.mouseDown(key));

                await waitFor(() => {
                    expect(spy).toHaveBeenCalledWith(
                        NOTE_ON,
                        {
                            noteNumber: keyValue + octaveToNoteOffset(octave),
                            velocity: 80,
                        }
                    );
                });

                await act(() => fireEvent.mouseUp(key));

                await waitFor(() => {
                    expect(spy).toHaveBeenCalledWith(
                        NOTE_OFF,
                        {
                            noteNumber: keyValue + octaveToNoteOffset(octave),
                        }
                    );
                })
            }
        }
    });

    it('each key illuminates when a NOTE_ON message for the corresponding key  within the current octave range has been published', async () => {
        const keyValues = [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71];
        const octaveInput = screen.getByRole('spinbutton', { name: /octave/i });
        const octaves = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];

        for (const octave of octaves) {
            await waitFor(() => {
                fireEvent.change(octaveInput, { target: { value: octave } })
            });

            for (const keyValue of keyValues) {
                const data = {
                    noteNumber: keyValue + octaveToNoteOffset(octave),
                    velocity: 80,
                }

                PubSub.publish(NOTE_ON, data);
                
                await waitFor(() => {
                    const activeKey = screen.getByTestId("key--active");

                    expect(activeKey.className.match(/active/i)).toBeTruthy();
                });
            }
        }
    });
});
