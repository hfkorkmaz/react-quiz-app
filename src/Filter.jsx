import React, { useState, useEffect } from "react";
import TriviaService from "./services/TriviaService";
import { defaultQuestionsAmount } from "./config";
export default function Filter(props) {
  const { fetchQuestions } = props;

  const [categories, setCategories] = useState([]);

  const [amount, setAmount] = useState(defaultQuestionsAmount);

  const [selectedCategory, setSelectedCategory] = useState("anycategory");

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const res = await TriviaService.getCategories();

    if (res.status === 200) {
      setCategories(res.data["trivia_categories"]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchQuestions(selectedCategory, amount);
  };

  const categoryOptionElements = [];

  categories.forEach((category) => {
    categoryOptionElements.push(
      <option value={category.id} key={category.id}>
        {category.name}
      </option>
    );
  });

  return (
    <div className="filter-section">
      <form className="filter-form" onSubmit={handleSubmit}>
        <div className="filter-input-container-container">
          <div className="filter-input-container">
            <label htmlFor="category-select">Categories : </label>
            <select
              id="category-select"
              name="category-select"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="anycategory">Any Category</option>
              {categoryOptionElements}
            </select>
          </div>
          <div className="filter-input-container">
            <label htmlFor="number-of-questions">Number of questions : </label>
            <input
              required
              type="number"
              defaultValue={defaultQuestionsAmount}
              min={1}
              id="number-of-questions"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
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
  );
}
