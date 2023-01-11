import React from 'react';
import { Synth } from '../Synth';
import { SynthParameterGroup } from '../SynthParameterGroup';
import './index.module.css';
import { useSessionStorage } from '../../hooks/useSessionStorage';

function App() {
  const [focus, setFocus] = useSessionStorage('focus', "");

  function useFocus(e: React.FocusEvent) {
    const focusId = e.currentTarget.id;
    setFocus(focusId);
  }

  return (
    <div className="App">
      <Synth>
        <SynthParameterGroup groupName="filter" handleFocus={useFocus} focus={focus}>
          <input type="range" />
        </SynthParameterGroup>
        <SynthParameterGroup groupName="filterEnvelope" handleFocus={useFocus}>
          <input type="range" />
        </SynthParameterGroup>
      </Synth> 
    </div>
  )
}

export default App
