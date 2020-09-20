import React from "react";
import Card from "./Card";
export default function CardList({ questions }) {
    console.log(questions)
  return (
    <div className="card-grid">
      {questions.map((question) => {
        return <Card question={question} key={question.question}></Card>;
      })}

    </div>
  );
}
