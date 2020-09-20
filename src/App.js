import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import CardList from "./CardList";

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = () => {
    axios
      .get("https://opentdb.com/api.php", {
        params: {
          amount: 10,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          for (let i = 0; i < response.data.results.length; i++) {
            const element = response.data.results[i];

            const possibleAnswers = element.incorrect_answers.concat(
              element.correct_answer
            );

            possibleAnswers.sort(() => Math.random() - 0.5);

            element.possibleAnswers = possibleAnswers;
          }

          setQuestions(response.data.results);
        }
      })
      .catch((err) => {
        alert("There was a problem while fetching data.");
      });
  };

  return (
    <div className="App">
      <div className="container">
        <CardList questions={questions}></CardList>
      </div>
    </div>
  );
}

export default App;
