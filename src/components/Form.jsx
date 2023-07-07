import { useState } from "react";

import uuid from "react-uuid";

import styled from "styled-components";
import { addTodo } from "api/todos";
import { QueryClient, useMutation } from "react-query";

const Addform = styled.form`
  align-items: center;
  display: flex;
  gap: 20px;
  margin: 0 auto;
  padding: 50px;
  justify-content: center;
`;

const Inputgroup = styled.div`
  align-items: center;
  display: flex;
  gap: 20px;
  margin: 0 auto;
  padding: 50px;
  justify-content: center;
`;

const Inputlabel = styled.label`
  font-size: 18px;
  font-weight: 700;
`;

const Addinput = styled.input`
  background-color: #eee;
  font-family: "GangwonEduSaeeum_OTFMediumA";
  font-size: 25px;

  border: none;
  border-radius: 12px;
  height: 40px;
  padding: 0 12px;
  width: 240px;
`;
const Addbutton = styled.button`
  background-color: burlywood;
  border: none;
  border-radius: 10px;
  color: #fff;
  font-weight: 700;
  height: 40px;
  width: 70px;
  transition: 0.4s;
  &:hover {
    background-color: #ddd;
  }
`;

function Form() {
  const [text, setText] = useState("");
  // const dispatch = useDispatch();
  // 리액트 쿼리 관련 코드
  const queryClient = new QueryClient();
  const mutation = useMutation(addTodo, {
    onSuccess: () => {
      // 불러왔던 todos를 무효화시키고 다시 불러옴(=바로바로 Refresh)
      queryClient.invalidateQueries("todos");
    },
  });

  const onChangeHandler = (event) => {
    setText(event.target.value);
  };

  //추가 버튼 클릭
  const onSubmitButtonHandler = (e) => {
    e.preventDefault();

    const newTodo = {
      id: uuid(),
      text,
      isDone: false,
    };
    // dispatch로 액션 객체 보낼 때 action type과 payload(action의 목적어) 명시해야됨.
    // 여기선 newTodo가 payload
    // dispatch(addTodo(newTodo));

    // (1) 여기로 newTodo가 들어오면
    // dispatch(__addTodo(newTodo));
    mutation.mutate(newTodo);
    setText("");
  };

  return (
    <Addform onSubmit={onSubmitButtonHandler}>
      <Inputgroup>
        <Inputlabel>Todo</Inputlabel>
        <Addinput
          className="add-input"
          value={text}
          onChange={onChangeHandler}
          maxLength="22"
          required
          autoFocus
          // ref={inputRef}
        />
        <Addbutton className="add-button">ADD</Addbutton>
      </Inputgroup>
    </Addform>
  );
}

export default Form;
