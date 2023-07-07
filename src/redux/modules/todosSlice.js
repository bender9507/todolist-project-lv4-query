// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import shortid from "shortid";

// // 초기 상태값
// const initialState = {
//   todos: [],
//   isLoading: false,
//   isError: false,
//   error: null,
// };
// // // 액션 value
// // export const ADD_TODO = "TODO/ADD_TODO";
// // export const REMOVE_TODO = "TODO/REMOVE_TODO";
// // export const TOGGLE_TODO = "TODO/TOGGLE_TODO";
// // export const EDIT_TODO = "EDIT/TOGGLE_TODO";

// // // 액션 크리에이터
// // // 매개변수 자리에 paylaod 넣기
// // // Action Creator를 사용하는 컴포넌트에서 dispatch를 통해 리듀서로 액션 객체 보낼 때
// // // payload를 인자로 넣어줘야 하기 때문
// // export const addTodo = (todo) => ({ type: ADD_TODO, todo });
// // export const removeTodo = (todoId) => ({ type: REMOVE_TODO, todoId });
// // export const toggleTodo = (todoId) => ({ type: TOGGLE_TODO, todoId });
// // export const editTodo = (todoId, text) => ({ type: EDIT_TODO, todoId, text });

// // thunk함수 생성
// // thunk 쓰는 이유: 비동기 함수를 수행하기 위해서 즉, 서버에 요청하기 위해서
// // 두개의 input (action value(이름), 함수(이 함수에도 인자가 두개 들어감))

// // __getTodos는 서버랑 통신하기 때문에 반드시 비동기 함수여야 한다.
// // 비동기 함수를 동기처럼 쓰고 싶기 때문에 앞에 async 키워드 붙여야 함.
// // 서버에서 데이터 불러올 때까지 기다려야 하기 때문.
// export const __getTodos = createAsyncThunk(
//   "getTodos",

//   async (payload, thunkAPI) => {
//     try {
//       const response = await axios.get("http://localhost:3001/todos");
//       console.log("response", response);
//       // toolkit에서 제공하는 api
//       // Promise 객체가 resolve(=네트워크 요청이 성공한 경우)될 때 dispatch 해주는 기능을 가진 API
//       return thunkAPI.fulfillWithValue(response.data);
//     } catch (error) {
//       console.log("error", error);
//       // 오류가 났을 때 에러객체 넣어줌
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );
// // 인자--> 컴포넌트에서 넘어온 payload, thunkAPI
// export const __addTodo = createAsyncThunk(
//   "addTodos",
//   // (2) 여기 payload 자리로 newTodo가 들어옴

//   async (payload, thunkAPI) => {
//     try {
//       //서버에 새로운 데이터 보내줌
//       await axios.post("http://localhost:3001/todos", payload);
//       // const response = await axios.get("http://localhost:3001/todos");
//       // console.log("response", response);

//       // return thunkAPI.fulfillWithValue(response.data);
//       return thunkAPI.fulfillWithValue(payload);
//     } catch (error) {
//       console.log("error", error);
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );
// export const __removeTodo = createAsyncThunk(
//   "REMOVE_TODO_WAIT",

//   (payload, thunkAPI) => {
//     setTimeout(() => {
//       thunkAPI.dispatch(removeTodo(payload));
//     }, 3000);
//   }
// );
// export const __toggleTodo = createAsyncThunk(
//   "TOGGLE_TODO_WAIT",

//   (payload, thunkAPI) => {
//     setTimeout(() => {
//       thunkAPI.dispatch(toggleTodo(payload));
//     }, 3000);
//   }
// );
// export const __editTodo = createAsyncThunk(
//   "EDIT_TODO_WAIT",

//   (payload, thunkAPI) => {
//     setTimeout(() => {
//       thunkAPI.dispatch(editTodo(payload));
//     }, 3000);
//   }
// );

// // 리듀서: 변화를 일으키는 함수
// export const todosSlice = createSlice({
//   name: "todos",
//   initialState,
//   reducers: {
//     // // (4) payload에 newTodo가 들어가면서 업데이트
//     // addTodo: (state, action) => {
//     //   // immer?
//     //   state.push({
//     //     id: shortid.generate(),
//     //     text: action.payload.text,
//     //     isDone: false,
//     //   });
//     // },
//     // removeTodo: (state, action) => {
//     //   return state.filter((todo) => todo.id !== action.payload);
//     // },
//     // toggleTodo: (state, action) => {
//     //   return state.map((todo) =>
//     //     todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo
//     //   );
//     // },
//     // editTodo: (state, action) => {
//     //   console.log(action);
//     //   console.log(action.payload);
//     //   return state.map((todo) =>
//     //     todo.id === action.payload.id
//     //       ? { ...todo, text: action.payload.text }
//     //       : todo
//     //   );
//     // },
//   },
//   extraReducers: {
//     [__getTodos.pending]: (state, action) => {
//       // 아직 통신 진행중일 때
//       state.isLoading = true;
//       state.isError = false;
//     },
//     [__getTodos.fulfilled]: (state, action) => {
//       state.isLoading = false;
//       state.isError = false;
//       // 서버로부터 받아온 값(response.data)을 넣어줘야함.
//       state.todos = action.payload;
//     },
//     [__getTodos.rejected]: (state, action) => {
//       state.isLoading = false;
//       state.isError = true;
//       // 에러객체가 action.payload로 들어가면서 state의 error객체를 갱신해줌.
//       state.error = action.payload;
//     },
//     [__addTodo.pending]: (state, action) => {
//       // 아직 통신 진행중일 때
//       state.isLoading = true;
//       state.isError = false;
//     },
//     [__addTodo.fulfilled]: (state, action) => {
//       state.isLoading = false;
//       state.isError = false;
//       // todos에 새로운 newTodo(payload) 추가해줌
//       state.todos.push(action.payload);
//     },
//     [__addTodo.rejected]: (state, action) => {
//       state.isLoading = false;
//       state.isError = true;
//       // 에러객체가 action.payload로 들어가면서 state의 error객체를 갱신해줌.
//       state.error = action.payload;
//     },
//   },
// });

// // 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
// export const { addTodo, removeTodo, toggleTodo, editTodo } = todosSlice.actions;
// // reducer 는 configStore에 등록하기 위해 export default 합니다.
// export default todosSlice.reducer;
