import { configureStore } from "@reduxjs/toolkit";
import LikedMovesReducer from "../reducers";

const store = configureStore({
  reducer: LikedMovesReducer,
});

export default store;
