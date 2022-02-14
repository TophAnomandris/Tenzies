import React from 'react'
import Die from './components/Dice'
import {nanoid} from 'nanoid'

export default function App() {


const[dieArray, newDieArray]= React.useState(allNewDice())


function generateNewDie(){
    const roll = Math.ceil(Math.random() * 6)
    return{value: roll, 
        isHeld: false,
        id: nanoid()}
}
function allNewDice(){
    const array = []
    for(let i = 0; i<10; i++){
      array.push(generateNewDie())}                  
     return array}

function rollNewDie(){
newDieArray(prevArray=> prevArray.map(die => {
    if(die.isHeld === true){
      return die
    }
    else{ return generateNewDie()}
}))}


function holdDice(id){
    newDieArray(prevArray =>prevArray.map(die => { 

    return die.id === id? {...die, isHeld: !die.isHeld} : die
    }))

    }
  console.log(dieArray)
  
  const diceElements = dieArray.map(die=> <Die 
  handleClick={()=> holdDice(die.id)}
  key={die.id} 
  value={die.value}
  isHeld={die.isHeld}/>)
  
  

  return (
    <main className='wrapper'>
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='parent'>
          {diceElements}
      </div>
      <button onClick={rollNewDie}>Roll</button>
            
    </main>
  )
}

