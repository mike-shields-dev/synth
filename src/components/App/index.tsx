import React from 'react';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import { Synth } from '../Synth';
import { SynthParameterGroup } from '../SynthParameterGroup';
import './index.module.css';

function App() {
  const [focus, setFocus] = useSessionStorage('focus', "");

  function updateFocus(id: string) {
    setFocus(id);
  } 

  return (
    <div className="App">
      <Synth>
        <SynthParameterGroup 
          groupName="filter" 
          updateFocus={updateFocus}
          isFocused={focus === "filter"}
        >
          <input type="range" />
        </SynthParameterGroup>

        <SynthParameterGroup 
          groupName="filterEnvelope"
          updateFocus={updateFocus}
          isFocused={focus === "filterEnvelope"}
        >
          <input type="range" />
        </SynthParameterGroup>
      </Synth> 
    </div>
  )
}

export default App
