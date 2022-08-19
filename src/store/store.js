import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./movie-slice";

const store = configureStore({
  reducer: {
    movie: dataReducer,
  },
});

export default store;