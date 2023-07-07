// axios 요청이 들어가는 모든 모듈
import axios from "axios";

// 조회
const getTodos = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/todos`);
  console.log(response.data);
  return response;
};

// 추가
const addTodo = async (newTodo) => {
  await axios.post(`${process.env.REACT_APP_SERVER_URL}/todos`, newTodo);
};

export { getTodos, addTodo };
