import React from 'react'

const Part = ({name, exercises}) =>{
        return(
            <h3>{name} {exercises}</h3> 
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
      <h2>
        total of {total} exercises
      </h2>
    </>
  )
}

export default Note