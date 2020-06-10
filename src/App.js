import React, { useState } from 'react'
import { v4 as uuid } from 'uuid';
import './App.css'

const initialFriends = [
  { id: uuid(), fname: 'John', lname: 'Smith' },
  { id: uuid(), fname: 'Jane', lname: 'Doe' },
]

function App() {
  // App is the top-level component
  // so it's an EXCELLENT place to put
  // all of our slices of state
  const [friends, setFriends] = useState(initialFriends)
  const [formValues, setFormValues] = useState({
    fname: '',
    lname: '',
  })
  const onInputChange = event => {
    // use the event object 
    // to fish out the current value 
    // and replace the WHOLE formValues object
    // with a new one that's a copy of the old one
    // BUT with a little override  
    const inputThatChanged = event.target.name
    const newValueForInput = event.target.value
    setFormValues({
      ...formValues,
      [inputThatChanged]: newValueForInput,
    })
  }
  const onFormSubmit = event => {
    // stop the form from reloading the page on submit
    event.preventDefault()
    // let's add a new friend to the friends array in state
    // let's make a new friend
    const newFriend = {
      id: uuid(),
      fname: formValues.fname,
      lname: formValues.lname
    }
    setFriends([ ...friends, newFriend ])  // WE NEED TO PASS AN ENTIRE ARRAY
    // setFriends(friends.concat(newFriend)) // can also do this as concat returns a new fresh array 
  } 

  return (
    <div className="App">
      {/* Make a form to add friends! */}
      <Form 
        onInputChange={onInputChange}
        formValues={formValues}
        onFormSubmit={onFormSubmit}
      />

      <h3>List of friends:</h3>
      {
        friends.map(fr => <div key={fr.id}>{fr.fname} {fr.lname}</div>)
      }
    </div>
  )
}

function Form(props) {
  return (
    <form onSubmit={props.onFormSubmit}>
      <label> first name
        <input
          onChange={props.onInputChange}  // callback takes an event object 
          value={props.formValues.fname}
          name= 'fname'
          type='text'
        />
      </label><br />

      <label> last name
        <input
          onChange={props.onInputChange}
          value={props.formValues.lname}
          name= 'lname'
          type='text'
        />
      </label><br /> 

      <input type='submit' />
    </form>
  )
}

export default App
