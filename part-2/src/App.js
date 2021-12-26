import React, { useState } from 'react'

const Filter = ({submitfunction, newsearchName, changefunction, clearsearch}) =>{
  return(
    <div>
      <form onSubmit={submitfunction}>
      <div>
        search: <input value={newsearchName} onChange={changefunction}/>
      </div>
      <div>
        <button type="submit" onClick={clearsearch}>search</button>
      </div>
    </form>
  </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [searchName, setSearchName] = useState([])

  const [newName, setNewName] = useState('')
  const [newsearchName, setNewsearchName] = useState('')
  const [newPhoneno, setNewPhoneno] = useState('')

  const handlesearchName = (event) => {
    setNewsearchName(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhonenoChange = (event) => {
    setNewPhoneno(event.target.value)
  }

  const clearsearch = (event) => {
    setSearchName([])
  }
  
  const search = (event) =>{
    event.preventDefault()
    setSearchName([]);

    let re = new RegExp(`^${newsearchName}`, 'i')
    const foundname = persons.filter(value => re.test(value.name));

    if (typeof foundname !== 'undefined'){
      setSearchName(searchName.concat(foundname));
    }else{
      alert("name doesn't exist")
    }
  }

  const addChanges = (event) => {
    event.preventDefault()
    if(persons.map(person => person.name).includes(newName) ||
    persons.map(person => person.phone).includes(newPhoneno)){
      alert(`${newName} is already added to phonebook`
      )
    }
    else{
      const person = {
        id: (persons.length),
        name: newName,
        number: newPhoneno,
      }
    
      setPersons(persons.concat(person))
      setNewName('')
      setNewPhoneno('')
    }
   
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {searchName.map(entery => <h2 key={entery.id}>{entery.name} {entery.number}</h2>)}
      <h2>{searchName.name}</h2>
      <h2>{searchName.number}</h2>
      <Filter submitfunction={search} newsearchName={newsearchName} changefunction={handlesearchName} clearsearch={clearsearch}/> 
      <h2>add a new phonebook</h2>
      <form onSubmit={addChanges}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
          phoone nunber: <input value={newPhoneno} onChange={handlePhonenoChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
          <h4 key={person.name}>{person.name} {person.number}</h4>
        )}
    </div>
  )
}

export default App