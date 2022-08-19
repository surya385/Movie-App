import Axios from "axios";
import { Urls } from "../config/config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  favourites: [],
  isLoading: false,
  page: 1,
  favouritesPage: 1,
  error: null,
  sortBy: "rating",
};

export const dataSlice = createSlice({
  name: "movieData",
  initialState,
  reducers: {
    addFavourites: (state, action) => {
      state.favourites.push(action.payload);
    },
    removeFavourites: (state, action) => {
      state.favourites = state.favourites.filter(
        (favourite) => favourite.id !== action.payload
      );
    },
    setPage: (state, action) => {
      if (action.payload.tab === "Favourites") {
        state.favouritesPage = action.payload.page;
      } else {
        state.page = action.payload.page;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovieData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMovieData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getMovieData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export const getMovieData = createAsyncThunk(
  "/api/movie",
  async (params, thunkAPI) => {
    const state = thunkAPI.getState();
    const { data } = await Axios.get(
      `${Urls.API_URL}&page=${state.movie.page}`
    );
    return data;
  }
);

export const { addFavourites, removeFavourites, setPage, sort } =
  dataSlice.actions;

export default dataSlice.reducer;