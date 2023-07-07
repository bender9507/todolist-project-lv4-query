import Form from "components/Form";
import List from "components/List";
import renderDate from "utils/renderDate";
import "../App.css";
import styled from "styled-components";

const Layout = styled.div`
  max-width: 1200px;
  min-width: 800px;
  text-align: center;
  margin: auto;
`;
const Container = styled.div`
  font-family: "Cafe24Ssurround";
  display: inline-block;
  align-items: center;
  color: burlywood;

  height: 80px;
  width: 300px;
  margin: 50px auto;
`;
const H1 = styled.h1`
  display: flex;
  justify-content: center;
  font-size: 2.5em;
  margin-bottom: 10px;
`;
const H3 = styled.h3`
  display: flex;
  justify-content: center;
`;

const Home = () => {
  return (
    <Layout>
      <Container>
        <H1>My Todo List</H1>
        <H3>{renderDate()}</H3>
      </Container>

      <Form />
      <List isDone={false} />
      <List isDone={true} />
    </Layout>
  );
};

export default Home;
