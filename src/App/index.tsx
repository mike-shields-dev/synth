import { useState } from 'react'
import { Synth } from '../components/Synth'
import './index.module.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App" data-testid="app">
      <Synth /> 
    </div>
  )
}

export default App
