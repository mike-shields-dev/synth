import { useEffect } from 'react';
import { useMidiAccess } from ".";
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';


// const WrapperComponent = () => {
//     const {
//         isRequesting,
//         midiAccess,
//         midiAccessError,
//         midiInputs,
//         midiOutputs
//     } = useMidiAccess();

//     useEffect(() => {
//         console.log(midiAccess);
        
//     }, [isRequesting, midiAccess])

//     return (
//         <div>
//             {
//                 isRequesting
//                     ? <div>requesting MIDI access</div>
//                     : <div>MIDI access granted</div>
//             }
//         </div>
//     )
// }


describe('useMidiAccess', () => {    
    xit('has an initial isRequesting state of "true"', async () => {
        render(<WrapperComponent />);

        expect(screen.getByText(/requesting MIDI access/i)).toBeInTheDocument();
    });

    xit('has an isRequesting state of "false" when MIDI access has been granted', async () => {
        render(<WrapperComponent />);

        expect(await screen.findByText(/MIDI access granted/i)).toBeInTheDocument();
    });
});