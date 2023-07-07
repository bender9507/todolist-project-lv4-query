import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "redux/modules/todosSlice";

const store = configureStore({
  reducer: {
    todosSlice: todosSlice,
  },
});

export default store;
