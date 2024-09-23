import { useState } from 'react';
import axios from 'axios';

import './App.css'

function App() {
  const [userInput, setUserInput] = useState("");
  const [answer, setAnswer] = useState("");
  //keeping these for future reference
  // const [questions, setQuestions] = useState([]);
  // const [botAnswers, setBotAnswers] = useState([]);
  const [qas, setQas] = useState([]);

  async function handleSubmission() {
    try {
      const response = await axios.post("http://localhost:3000/ask", { question: userInput });
      setUserInput('');
      console.log(response.data);
      setAnswer(response.data.answer);
      // setQuestions([...questions, userInput]);
      // setBotAnswers([...botAnswers, response.data.answer]);
      setQas([...qas,
      // created an object to store the two information, question and answer so when I map them they will be paired together!! 
      {
        question: userInput,
        answer: response.data.answer
      }
      ])
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
      {/* also keeping for future reference */}
      {/* <ul>
        {questions.map((question, index) => (
          <li key={index}>Question: {question}</li>
        ))}
        {botAnswers.map((botAnswer, index) => (
          <li key={index}>Answer:{botAnswer}</li>
        ))}
      </ul> */}
      <ul>
        {/* index is always second place while using the map method */}
        {qas.map((information, index) => (
          <li key={index}>
            Question: {information.question}<br /> Answer: {information.answer}
          </li>
        ))}
      </ul>

    </>
  )
}

export default App;
