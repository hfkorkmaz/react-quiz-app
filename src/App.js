import React, { useState, useEffect } from "react";
import TriviaService from "./services/TriviaService";
import "./App.css";
import CardList from "./CardList";
import Filter from "./Filter";
import { defaultQuestionsAmount } from "./config";
import CircularProgress from "@material-ui/core/CircularProgress";

function App() {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchQuestions("anycategory", defaultQuestionsAmount);
  }, []);

  const fetchQuestions = (category, amount) => {
    if (category === "anycategory") {
      fetchQuestionByAnyCategory(amount);
    } else {
      fetchQuestionsByCategory(category, amount);
    }
  };

  const fetchQuestionByAnyCategory = async (amount) => {
    setIsLoading(true);
    const response = await TriviaService.getQuestionsFromAnyCategory(amount);

    if (response.status === 200) {
      for (let i = 0; i < response.data.results.length; i++) {
        const element = response.data.results[i];

        const possibleAnswers = element.incorrect_answers.concat(
          element.correct_answer
        );

        possibleAnswers.sort(() => Math.random() - 0.5);

        element.possibleAnswers = possibleAnswers;
      }

      setIsLoading(false);
      setQuestions(response.data.results);
    }
  };

  const fetchQuestionsByCategory = async (category, amount) => {
    const response = await TriviaService.getQuestionsByCategory(
      category,
      amount
    );

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
  };

  return (
    <div className="App">
      <Filter fetchQuestions={fetchQuestions} />
      {isLoading ? (
        <div
          style={{
            height:"calc(100% - 6rem - 1px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <div className="container">
          <CardList questions={questions}></CardList>
        </div>
      )}
    </div>
  );
}

export default App;
