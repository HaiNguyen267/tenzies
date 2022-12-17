import Header from './components/Header' 
import Die from './components/Die'
import { useState, useEffect } from 'react'
import Confetti from 'react-confetti'
function App() {

  const [dice, setDice] = useState(() => initDice())
  const [winning, setWinning] = useState(false)

  useEffect(() => {
    const allGreen = dice.every(die => die.green === true)
    const allEqual = dice.every(die => die.num === dice[0].num)
    console.log(dice);
    console.log("allGreen", allGreen);
    console.log("allEqual", allEqual);
    dice.forEach(die => console.log(die.num))
    if (allGreen && allEqual) {
      console.log("you won");
      setWinning(true)
    }
  }, [dice])


  function initDice() {
    const arr = []
    for (let i = 0; i < 10; i++) {
      arr.push({
        green: false,
        num: generateRandomNum()
      })
    }
    return arr
  }
  
  function handleClick(event, dieIndex) {
    setDice(dice => (
      dice.map((die, index) => 
        index === dieIndex ? 
            { ...die, green: !die.green} :
            die
      )
    ))
  }

  function roll() {
    setDice(dice => (
      dice.map(die => 
        die.green ?
          die :
          {...die, num: generateRandomNum()} 
      )
    ))
  }

  function restartGame() {
    setDice(initDice());
  }

  function generateRandomNum() {
    return Math.floor(Math.random() * 10);
  }

  return (
    <div className="container">
      {winning && <Confetti />}
      <div className='App'>
        <Header/>
        <div className="dice-container">
          { 
            dice.map((die, index) => (
              <Die 
                index={index}
                value={die.num} 
                green={die.green}
                handleClick={handleClick} 
              />
            )) 
          }
        </div>
        <button className='roll-btn' onClick={winning ? restartGame : roll}>{winning ? "New game" : "Roll"}</button>
      </div>
    </div>
  );
}

export default App;
