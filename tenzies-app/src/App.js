import React from 'react'
import Die from './components/Dice'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

export default function App() {

function store(item){ 
  localStorage.setItem('lowest-score', JSON.stringify(item))}

const storedValue = JSON.parse(localStorage.getItem('lowest-score'))

function wipeSlate(){
  localStorage.clear()
  setLowestRoll(0)
}

const[dieArray, newDieArray]= React.useState(allNewDice)
const[tenzies, setTenzies]= React.useState(false)
const[count, setCount]= React.useState(0)
const[lowestRoll, setLowestRoll]= React.useState(()=> storedValue || 0)



React.useEffect(()=>{
  const allHeld = dieArray.every(die=> die.isHeld )
  const firstValue = dieArray[0].value
  const allValueSame= dieArray.every(die=> die.value === firstValue)

  if(allHeld && allValueSame){
    setTenzies(true)
  }
  
  if ((allHeld && allValueSame) && lowestRoll === 0){ 
     setLowestRoll(count)
      store(count)
      console.log(lowestRoll)}
      

  if((allHeld && allValueSame) && (count < lowestRoll)){
    setLowestRoll(count)
    store(count)
       
    console.log('new high score')
  }

  console.log(lowestRoll)
},[dieArray, count, tenzies])

 
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
  setCount(prevCount=> prevCount + 1)
  newDieArray(prevArray=> prevArray.map(die => {
      if(die.isHeld === true){
       return die
         }
      else{ return generateNewDie()}
}))
}


function holdDice(id){
    newDieArray(prevArray =>prevArray.map(die => { 

    return die.id === id? {...die, isHeld: !die.isHeld} : die
    }))

    }
const roll = tenzies? "New game" : "Roll"

function reset(){ 
  return tenzies? [newDieArray(allNewDice), setTenzies(false), setCount(0)] : rollNewDie()
}

React.useEffect(()=>{

},[lowestRoll])


const diceElements = dieArray.map(die=> <Die 
handleClick={()=> holdDice(die.id)}
key={die.id} 
value={die.value}
isHeld={die.isHeld}/>)
  
  

  return (
    <main className='wrapper'>
      {tenzies && <Confetti/>}
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='parent'>
          {diceElements}
      </div>
      <button className='rolls' onClick={reset}>{roll}</button>
      <h4 className='your--rolls'>Your rolls: {count}</h4>
      <h3 className='lowest--rolls'>Best roll: {lowestRoll}</h3>
      <button className='erase' onClick={wipeSlate}>Erase Record</button>
    </main>
  )
}

