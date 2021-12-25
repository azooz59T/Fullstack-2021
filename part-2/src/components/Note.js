import React from 'react'

const Part = ({name, exercises}) =>{
        return(
            <h1>{name} {exercises}</h1> 
        )
}

const Note = ({ parts }) => {

  let total = parts.map(part => part.exercises)
  total = total.reduce((a, b) => a + b, 0)

  return (
    <>
      {parts.map(part => 
          <Part name={part.name} exercises={part.exercises} key={part.id}/>
        )}
      <h4>
        total of {total} exercises
      </h4>
    </>
  )
}

export default Note