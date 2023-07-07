import { Link } from "react-router-dom";
import styled from "styled-components";

import { getTodos } from "api/todos";
import { useQuery } from "react-query";

function List({ isDone }) {
  //수정 버튼 클릭
  const clickEditButtonHandler = (id) => {
    const text = prompt("수정할  텍스트를 입력해주세요");
    //액션객체를 Action creator로 변경
  };
  //완료 버튼 클릭
  const clickCompleteButtonHandler = (id) => {};
  //삭제 버튼 클릭
  const clickRemoveButtonHandler = (id) => {};

  //중앙 관리소에서 받아오기
  //리덕스로 관리하고 있기 때문에 useSelector로 데이터를 가져온다
  // const todos = useSelector((state) => state.todosSlide);
  // console.log(todos);

  // 리덕스의 리듀서에 접근해서 state 변화시킴
  // const dispatch = useDispatch(); // dispatch 생성

  // const { isLoading, error, todos } = useSelector((state) => {
  //   console.log(state);
  //   return state.todosSlice;
  // });

  // 두개의 인자(이 쿼리의 이름, 조회해서(import해서) 오는 api)
  const { isLoading, isError, data } = useQuery("todos", getTodos);
  // axios를 통해서 get 요청을 하는 함수를 생성한다.
  // 비동기처리를 해야하므로 async/await 구문을 통해서 처리한다.
  // const fetchTodos = async () => {
  //   const { data } = await api.get(
  //     // 데이터를 서버에서 받아와서 리덕스에 넣어둔다
  //     "/todos"
  //   );
  //   // 서버에서 가지고 온 정보를 넣어주려고
  //   // 서버로부터 fetching한 데이터를 useState의 state로 set 한다.
  //   setTodos(data);
  // };

  // // 생성한 함수를 컴포넌트가 mount 됐을 떄 실행하기 위해 useEffect를 사용합니다.
  // useEffect(() => {
  //   // thunk 함수를 실행하고 그 안에서 dispatch --> 질문하기
  //   dispatch(__getTodos());
  // }, []);

  if (isLoading) {
    return <h1>로딩 중입니다..</h1>;
  }
  if (isError) {
    return <h1>오류가 발생했습니다..</h1>;
  }
  return (
    <Listcontainer>
      <H2>{isDone ? "DONELIST" : "TODOLIST"}</H2>
      <Listwrapper>
        {data
          .filter(function (todo) {
            return todo.isDone === isDone;
          })
          .map(function (item) {
            return (
              <Todocontainer key={item.id}>
                <Todolist>
                  <StyeldLink to={`/detail/${item.id}`}>{item.text}</StyeldLink>
                </Todolist>

                <Bottonset>
                  <TodoEditBotton
                    onClick={() => clickEditButtonHandler(item.id)}
                  >
                    ✐
                  </TodoEditBotton>
                  <TodoCompeteBotton
                    onClick={() => clickCompleteButtonHandler(item.id)}
                  >
                    {isDone ? "X" : "☑️"}
                  </TodoCompeteBotton>

                  <TodoDeleteBotton
                    onClick={() => clickRemoveButtonHandler(item.id)}
                  >
                    🗑️
                  </TodoDeleteBotton>
                </Bottonset>
              </Todocontainer>
            );
          })}
      </Listwrapper>
    </Listcontainer>
  );
}

export default List;

const Listcontainer = styled.div`
  padding-bottom: 50px;
  justify-content: center;
`;
const Listwrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  flex-direction: column;
  gap: 12px;
`;
const Todocontainer = styled.div`
  padding: 10px;
  width: 370px;
  height: 30px;
  border-bottom: 2px solid gray;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
`;

const H2 = styled.h2`
  display: flex;
  justify-content: center;
  font-size: 1.2em;
  margin-top: 50px;
  margin-bottom: 30px;
`;
const Todolist = styled.div`
  font-family: "GangwonEduSaeeum_OTFMediumA";
  font-size: 25px;
`;
const StyeldLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
const Bottonset = styled.div`
  display: flex;
  gap: 5px;
`;

const TodoDeleteBotton = styled.button`
  border: none;
  cursor: pointer;
  height: 30px;
  width: 50%;
  background-color: transparent;
  display: flex;
  font-size: 1.3em;
`;
const TodoCompeteBotton = styled(TodoDeleteBotton)``;
const TodoEditBotton = styled(TodoDeleteBotton)`
  font-size: 1.8em;
`;
