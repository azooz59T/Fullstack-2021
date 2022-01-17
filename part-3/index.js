const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

app.use(cors())
app.use(express.json())
morgan.token('body',(req) =>JSON.stringify(req.body));
app.use(morgan(':body'))

let Phonebook  = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/info', (request, response) => {
  date = new Date();
  response.send(`<h1>Phone book has info for ${Phonebook.length} people</h1> <h1>${date}</h1>`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = Phonebook.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(Phonebook)
})

app.post('/api/persons', (request, response) => {
  const names = Phonebook.map(person => person.name)

  if(names.includes(request.body.name)){
    response.status(404).send({ error: 'name must be unique' })
  }

  if(!request.body.name || !request.body.number){
    response.status(404).send({ error: 'you should enter a name and a number' })
  }

  else{
    const random_Id = Math.random() * (700 - 3) + 3;

    const person = request.body
    person.id = random_Id

    Phonebook = Phonebook.concat(person)

    response.json(person)
  }
  
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  Phonebook = Phonebook.filter(person => person.id !== id)
  console.log(`the person with the id ${id} has been removed`);

  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})