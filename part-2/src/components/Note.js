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
// useEffect(() => {
//   axios.get('https://restcountries.com/v3.1/all').then(response => {
//     const notes = response.data
//     const notes_name = notes.map(notes => notes.name.common)
//     // console.log(notes_name)
//     setCountryName(notes_name)
//     console.log(countryName)
//     })
//     // eslint-disable-next-line
// }, [])

// const [countryName, setCountryName] = useState([])

// console.log(countryName)

export default Note