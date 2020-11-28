import React, { useState } from "react";

function decodeString(str) {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = str;
  return textArea.value;
}

export default function Card({ question }) {
  const [revealAnswer, setRevealAnswer] = useState(false);

  const options = [];

  if (revealAnswer) {
    question.possibleAnswers.forEach((answer) => {
      if (answer === question.correct_answer) {
        options.push(
          <div className="option" key={answer}>
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

  const flipCard = () => {
    setRevealAnswer(!revealAnswer);
  };

  return (
    <div className={`card ${revealAnswer ? "flipped" : ""}`} onClick={flipCard}>
      <div className="card-front">
        {decodeString(question.question)}
        <div className="options">{options}</div>
      </div>
      <div className="card-back">{decodeString(question.correct_answer)}</div>
    </div>
  );
}
