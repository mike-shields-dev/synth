import { useState } from 'react';
import Nav from '../components/Nav';
import { AmpEnvelope, FilterEnvelope, Oscillator, SynthUI } from '../components';
import { Filter } from '../components/Filter';
import { useMidiAccess } from '../hooks/useMidiAccess';
import './index.module.css';
import { publishFocusChange } from '../../PubSub/FocusChange';
import { UIKeyboard } from '../components/UIKeyboard';
import css from './App.module.css';

function App() {
  const [focus, setFocus] = useState('oscillator');
  useMidiAccess();

  function updateFocus(focus: string) {
    setFocus(focus);
    publishFocusChange(focus);
  }

  return (
    <>
      <div className={css.App}>

        <div className={css.App__Header}>
          <Nav {...{ focus, updateFocus }} />
        </div>

        <div className={css.App__Main}>
          <SynthUI>
            <Oscillator {...{ focus, updateFocus }} />
            <Filter {...{ focus, updateFocus }} />
            <FilterEnvelope {...{ focus, updateFocus }} />
            <AmpEnvelope {...{ focus, updateFocus }} />
          </SynthUI>
        </div>

        <div className={css.App__Footer}>
          <UIKeyboard />
        </div>
      </div>
    </>
  )
}

export default App
