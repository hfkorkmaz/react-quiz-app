import React from "react";
import Card from "./Card";
export default function CardList({ questions }) {
  return (
    <div className="card-grid">
      {questions.map((question) => (
        <Card question={question} key={question.question}></Card>
      ))}
    </div>
  );
}
