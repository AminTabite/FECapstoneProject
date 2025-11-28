import { configureStore } from "@reduxjs/toolkit";
import roleReducer from "../reducers";

const store = configureStore({ reducer: roleReducer });

export default store;
