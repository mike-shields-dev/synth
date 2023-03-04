import { useEffect } from 'react';
import { useMidiAccess } from ".";
import { render, screen, waitFor } from '@testing-library/react';
import WMT from 'web-midi-test';

const WrapperComponent = () => {
    const {
        isRequesting,
        midiAccess,
        midiAccessError,
        midiInputs,
        midiOutputs
    } = useMidiAccess();

    return (
        <>
            <div>
                {isRequesting
                    ? "requesting MIDI access"
                    : "MIDI access granted"
                }
            </div>
            <div>
                {midiAccessError
                    ? "MIDI Access Error"
                    : "No MIDI Access Error"
                }
            </div>
        </>
    )
}


describe('useMidiAccess', () => {
    it('has an initial isRequesting state of "true"', async () => {
        render(<WrapperComponent />);

        await waitFor(() => {
            expect(screen.getByText(/requesting MIDI access/i)).toBeInTheDocument()
        });
    });

    it('has a defined midiAccess if the request for MIDI access failed', async () => {
        WMT.midi = false;
        
        render(<WrapperComponent />);

        await waitFor(() => {
            expect(screen.getByText(/MIDI Access Error/i)).toBeInTheDocument()
        });

        WMT.midi = true;
    });

    it('has an isRequesting state of "false" when MIDI access has been granted', async () => {

        render(<WrapperComponent />);

        expect(await screen.findByText(/MIDI access granted/i)).toBeInTheDocument();
    });

    
});