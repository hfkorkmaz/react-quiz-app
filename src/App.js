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
      <div className="filter-section">
        <form className="filter-form">
          <div className="filter-input-container-container">
            <div className="filter-input-container">
              <label htmlFor="category-select">Categories : </label>
              <select id="category-select" name="category-select">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
              </select>
            </div>
            <div className="filter-input-container">
              <label htmlFor="number-of-questions">
                Number of questions :{" "}
              </label>
              <input
                type="number"
                defaultValue={1}
                min={1}
                id="number-of-questions"
              />
            </div>
            <div>
              <button type="submit" className="filter-form-submit-button">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="container">
        <CardList questions={questions}></CardList>
      </div>
    </div>
  );
}

export default App;
