import React, { useState } from "react";

function decodeString(str) {
  const textArea = document.createElement('textarea')
  textArea.innerHTML= str
  return textArea.value
}


export default function Card({ question }) {
  const [revealAnswer, setRevealAnswer] = useState(false);

  const options = [];

  if (revealAnswer) {
    question.possibleAnswers.forEach((answer) => {
      if (answer === question.correct_answer) {
        options.push(
          <div className="option true-answer" key={answer}>
            {decodeString(answer)}
          </div>
        );
      } else {
        options.push(
          <div className="option" key={answer}>
            {decodeString(answer)}
          </div>
        );
      }
    });
  } else {
    question.possibleAnswers.forEach((answer) => {
      options.push(
        <div className="option" key={answer}>
            {decodeString(answer)}
        </div>
      );
    });
  }

  return (
    <div className="card">
      {decodeString(question.question)}
      <div className="options">{options}</div>
      <div className="button-container">
        {revealAnswer ? (
          <button
            onClick={() => setRevealAnswer(false)}
            className="hide-answer-button"
          >
            Hide the Answer
          </button>
        ) : (
          <button
            onClick={() => {
              setRevealAnswer(true);
            }}
            className="reveal-answer-button"
          >
            Reveal the Answer
          </button>
        )}
      </div>
    </div>
  );
}
