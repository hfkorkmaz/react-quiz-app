import axios from "./api";

export default class TriviaService {
  static getQuestionsFromAnyCategory = (amount) => {
    return axios({
      method: "GET",
      url: "/api.php",
      params: {
        amount: amount,
      },
    });
  };

  static getQuestionsByCategory = (category, amount) => {
    return axios({
      method: "GET",
      url: "/api.php",
      params: {
        amount: amount,
        category: category,
      },
    });
  };

  static getCategories = () => {
    return axios({
      method: "GET",
      url: "/api_category.php",
    });
  };
}
