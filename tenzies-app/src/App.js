import React from 'react'
import Die from './components/Dice'

export default function App() {


  const[dieArray, newDieArray]= React.useState(allNewDice())

function rollNewDie(){
newDieArray(allNewDice())
}

  function allNewDice(){
    const array = []
    for(let i = 0; i<10; i++){
      var roll = Math.ceil(Math.random() * 6)
      array.push({value: roll, 
        isHeld: false})
  }
  return array}
  console.log(allNewDice())
  
    const diceElements = dieArray.map(die=> <Die className="face" value={die.value}/>)
  
  

  return (
    <main className='wrapper'>
      <div className='parent'>
          {diceElements}
      </div>
      <button onClick={rollNewDie}>Roll</button>
            
    </main>
  )
}

