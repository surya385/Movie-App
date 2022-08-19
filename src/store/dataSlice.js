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
      const tempState = state.data.results.map((movie) => {
        if (movie.id === action.payload.id) {
          return { ...movie, isFavourite: true };
        } else return { ...movie };
      });
      state.data.results = tempState;
      const favouriteMovie = { ...action.payload, isFavourite: true };
      state.favourites.push(favouriteMovie);
    },
    removeFavourites: (state, action) => {
      const tempState = state.data.results.map((movie) => {
        if (movie.id === action.payload) {
          return { ...movie, isFavourite: false };
        } else return { ...movie };
      });
      state.data.results = tempState;
      state.favourites = state.favourites.filter(
        (favourite) => favourite.id !== action.payload
      );
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    sortDataUsingDate(state, action) {
      // eslint-disable-next-line default-case
      switch (action.payload.tab) {
        case "NewRelease":
          if (action.payload.dateFilter) {
            state.data?.results.sort(
              (firstMovie, secondMovie) =>
                parseInt(firstMovie.release_date.replace("-", "")) -
                parseInt(secondMovie.release_date.replace("-", ""))
            );
          } else {
            state.data?.results.sort(
              (firstMovie, secondMovie) =>
                parseInt(secondMovie.release_date.replace("-", "")) -
                parseInt(firstMovie.release_date.replace("-", ""))
            );
          }
          break;
        // eslint-disable-next-line no-duplicate-case
        case "Favourites":
          if (action.payload.dateFilter) {
            state.favourites.sort(
              (firstMovie, secondMovie) =>
                parseInt(firstMovie.release_date.replace("-", "")) -
                parseInt(secondMovie.release_date.replace("-", ""))
            );
          } else {
            state.favourites.sort(
              (firstMovie, secondMovie) =>
                parseInt(secondMovie.release_date.replace("-", "")) -
                parseInt(firstMovie.release_date.replace("-", ""))
            );
          }
          break;
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
        action.payload.results = action.payload.results.map((item) => {
          return {
            ...item,
            isFavourite: false,
          };
        });
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

export const { addFavourites, removeFavourites, setPage, sortDataUsingDate } =
  dataSlice.actions;

export default dataSlice.reducer;
