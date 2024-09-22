import { useState } from 'react';
import axios from 'axios';

import './App.css'

function App() {
  const [userInput, setUserInput] = useState("");
  const [answer, setAnswer] = useState("");

  async function handleSubmission() {
    try {
      const response = await axios.post("http://localhost:3000/ask", { question: userInput });
      setUserInput('');
      console.log(response.data);
      setAnswer(response.data.answer);
    } catch (error) {
      console.error("Error submitting question:", error);
    }
  }

  function handleInput(event) {
    setUserInput(event.target.value);
  }

  return (
    <>
      <input type="text" placeholder='Ask about me' value={userInput} onChange={handleInput} />
      <button onClick={handleSubmission}> Submit</button>
      <p>{answer}</p>
    </>
  )
}

export default App;
