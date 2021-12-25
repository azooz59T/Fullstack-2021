import React from 'react'
import Note from './components/Note'

const Header = ({name}) =>{
  return(
      <h1>{name}</h1> 
  )
}
const App = () => {
  const courses = [
      {
        name: 'Half Stack application development',
        id: 1,
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
          },
          {
            name: 'Redux',
            exercises: 11,
            id: 4
          }
        ]
      }, 
      {
        name: 'Node.js',
        id: 2,
        parts: [
          {
            name: 'Routing',
            exercises: 3,
            id: 1
          },
          {
            name: 'Middlewares',
            exercises: 7,
            id: 2
          }
        ]
      }
  ]
  
  // const parts = course.parts
  return (
    <div>
      {courses.map(course => 
      <>
          <Header name={course.name}/>
          <Note parts={course.parts} />
          </>
        )}
      {/* <Header name={course.name}/>
     <Note parts={parts} /> */}
    </div>
  )
}

export default App