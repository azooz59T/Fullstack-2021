import React from 'react'
import Note from './components/Note'

const Header = ({name}) =>{
  return(
      <h1>{name}</h1> 
  )
}
const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }
  
  const parts = course.parts
  return (
    <div>
      <Header name={course.name}/>
     <Note parts={parts} />
    </div>
  )
}

export default App