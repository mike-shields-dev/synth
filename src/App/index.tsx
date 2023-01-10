import { useState } from 'react'
import { Synth } from '../components/Synth'
import { SynthParameterGroup } from '../components/SynthParameterGroup'
import './index.module.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Synth>
        <SynthParameterGroup groupName="filter">
          {"children"}
        </SynthParameterGroup>
      </Synth> 
    </div>
  )
}

export default App
