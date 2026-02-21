import { useState } from 'react'
import { MainMenu } from './components/MainMenu'
import { HotPotato } from './components/HotPotato'
import { Interrogator } from './components/Interrogator'
import { RussianRoulette } from './components/RussianRoulette'

function App() {
  const [activeGame, setActiveGame] = useState('menu');

  const renderGame = () => {
    switch (activeGame) {
      case 'hotpotato':
        return <HotPotato onBack={() => setActiveGame('menu')} />
      case 'interrogator':
        return <Interrogator onBack={() => setActiveGame('menu')} />
      case 'roulette':
        return <RussianRoulette onBack={() => setActiveGame('menu')} />
      default:
        return <MainMenu onSelectGame={setActiveGame} />
    }
  }

  return (
    <>
      {renderGame()}
    </>
  )
}

export default App
