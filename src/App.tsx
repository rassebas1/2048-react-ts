import { useState } from 'react'

import './styles/_index.scss'
import Game from './Components/2048/Game/Game'

function App() {


  return (
    <div className="App">
      <h1>2048</h1>

      <Game></Game>

    </div>
  )
}

export default App
