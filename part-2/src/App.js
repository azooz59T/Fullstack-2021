import React, { useState, useEffect} from 'react'
import personService from './services/persons'

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
  const [persons, setPersons] = useState([])

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

  useEffect(() => {
    personService
      .getAll()
      .then(initialpeople => {
        setPersons(initialpeople)
      })
  }, [])
  
  const search = (event) =>{
    event.preventDefault()
    setSearchName([]);

    let re = new RegExp(`${newsearchName}`, 'i')
    const foundname = persons.filter(value => re.test(value.name));

    if (typeof foundname !== 'undefined'){
      setSearchName(searchName.concat(foundname));
    }else{
      alert("name doesn't exist")
    }
  }

  const addChanges = (event) => {
    event.preventDefault()

    //checks if the new name or number already exists in the person state, if it does it asks the user to confirm if they want to update the phone number
    // of that same person
    if(persons.map(person => person.name).includes(newName) ||
    persons.map(person => person.phone).includes(newPhoneno)){
      const sure = window.confirm(`${newName} is already added to phonebook, replace the old numer with the new one?`
      )
      // if the user says yes then it updates the phone record on the server aswell as the state
      if(sure){
        const person = persons.find(p => p.name === newName)
        const updatedperson = { ...person, number: newPhoneno }
        let id = person.id

         personService
        .update(id, updatedperson)
        .then(response => {
          setPersons(persons.map(person => person.id !== id ? person : response))
      })
      }
    }
    else{
      const person = {
        name: newName,
        number: newPhoneno,
      }

      personService
      .create(person)
      .then(returnedpeople => {
        setPersons(persons.concat(returnedpeople))
        setNewName('')
        setNewPhoneno('')
      })
    
    }
   
  }

  

  const deleteperson = (id) =>{
    const result = window.confirm("are you sure you want to delete this person");

    if(result){
      personService.deletedata(id)
      setPersons(persons.filter(p => p.id !== id))
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
        <>
          <h4 key={person.name}>{person.name} {person.number} </h4>
          <button key={person.id} onClick={() => deleteperson(person.id)}>delete</button>
          </>
        )}
    </div>
  )
}

export default App