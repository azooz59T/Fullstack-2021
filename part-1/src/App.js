import React, {useState} from 'react';

const Button = ({handleClick, text}) =>{
  return (
    <button onClick={handleClick}>
       {text}
      </button>
      // <Button  variant="secondary" className="mx-2" onClick={handleClick}>{text}</Button>
  )
}

const Anecdotebutton = ({random, newanecdotes}) =>{
  return (
    <>
    <button onClick={newanecdotes}>
       next anecdote
      </button>
      <h2>{random}</h2>
    </>
  )
}

const StatisticLine = ({text, value}) =>{
    return (
      <h3 style={{margin: 0}}>{text} {value}</h3>  
  )
 
}

const divStyle = {
  display:'flex',
  textAlign: 'center'
};

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [randomanecdote, setRandomanecdote] = useState('')
  const [vote, setVote] = useState(new Array(7).fill(0))

  let average = (all === 0) ? 0 : (good-bad)/all
  let positive = (all === 0) ? 0 : (good/all)*100
  let isfeedback = (good === 0 && bad ===0 && neutral === 0) ? false : true

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const addGood = () =>{
    setGood(good+1)
    setAll(all+1)
  }
  const addbad = () =>{
    setBad(bad+1)
    setAll(all+1)
  }
  const addneutral = () =>{
    setNeutral(neutral+1)
    setAll(all+1)
  }

  const newanecdotes = ()=>{
    setRandomanecdote(anecdotes[Math.floor(Math.random() * 7)])
  }
  const addvote = () =>{
    let index = anecdotes.indexOf(randomanecdote)
    const copy = [...vote]
    copy[index] +=1
    setVote(copy) 
  }
  

  return (
    <div>
      <h1>give feedback </h1>
      <div style={divStyle}>
        <Button handleClick={addGood} text='good'/>
        <Button handleClick={addneutral} text='neutral'/>
        <Button handleClick={addbad} text='bad'/>
        </div>
      <h1>Statistics</h1> 
      {(() => {
        if (isfeedback) {
          return (
            <>
            <table>
            <tbody>
              <tr>
              <td><StatisticLine text="good" value ={good}/></td>
              </tr>
              <tr>
              <td><StatisticLine text="neutral" value ={neutral}/></td>
              </tr>
              <tr>
              <td><StatisticLine text="bad" value ={bad}/></td>
              </tr>
              <tr>
              <td><StatisticLine text="All" value ={all}/></td>
              </tr>
              <tr>
              <td><StatisticLine text="average" value ={average}/></td>
              </tr>
              <tr>
              <td><StatisticLine text="positive" value ={positive}/></td>
              </tr>
              </tbody>
            </table> 
            </>    
          )
        } else {
          return (
            <h1>No feedback given</h1>
          )
        }
      })()}
      <div style={divStyle}>
          <Anecdotebutton random={randomanecdote} newanecdotes={newanecdotes}/>
      </div> 
      <div className="vote-container">
      {(() => {
        if (randomanecdote !== "") {
          return (
            <>
            <h3>
              has {vote[anecdotes.indexOf(randomanecdote)]} votes
            </h3>
            <Button handleClick={addvote} text='vote'/>
            <h1> {anecdotes[vote.indexOf(Math.max(...vote))]}  is the highest voted anecdote</h1>
          </>
          )
        }
      })()}
      </div>
    </div>
  )
}

export default App
