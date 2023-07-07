import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

const Layout = styled.div`
  max-width: 1200px;
  min-width: 800px;

  text-align: center;
  margin: 400px auto;
`;
const Container = styled.div`
  font-family: "Cafe24Ssurround";
  color: burlywood;
  border: 2px solid burlywood;
  border-radius: 30px;

  height: 220px;
  width: 500px;
  margin: auto;
`;

const P = styled.p`
  display: flex;
  justify-content: left;
  font-size: 0.8em;
  margin: 30px auto 30px 20px;
`;

const H2 = styled.h2`
  display: flex;
  justify-content: center;
  font-size: 1.3em;
  margin-top: 50px;
  margin-bottom: 30px;
`;

const Backbutton = styled.button`
  background-color: burlywood;
  border: none;

  border-radius: 10px;
  color: #fff;
  font-weight: 700;
  height: 40px;
  width: 70px;
  transition: 0.2s;
  &:hover {
    background-color: #ddd;
  }
`;

function Detail() {
  const navigate = useNavigate();
  const params = useParams();
  // console.log(params);
  const todos = [];
  const item = todos.find((todo) => todo.id === params.id);

  // console.log(item);

  return (
    <Layout>
      <Container>
        <P>ID: {item.id}</P>
        <H2>{item.text}</H2>
        <Backbutton
          onClick={() => {
            navigate("/");
          }}
        >
          BACK
        </Backbutton>
      </Container>
    </Layout>
  );
}

export default Detail;
