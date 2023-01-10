import React, { useState } from 'react'
import { Synth } from '../components/Synth'
import { SynthParameterGroup } from '../components/SynthParameterGroup'
import './index.module.css'

function App() {
  const [focus, setFocus] = useState("");

  function useFocus(e: React.FocusEvent) {
    const focusId = e.currentTarget.id;
    setFocus(focusId);
  }

  return (
    <div className="App">
      <Synth>
        <SynthParameterGroup groupName="filter" handleFocus={useFocus}>
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
