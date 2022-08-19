import Axios from "axios";
import { api } from "../config/config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  favourites: [],
  isLoading: false,
  page: 1,
  favouritesPage: 1,
  error: null,
  searchValue: "",
};

export const movieSlice = createSlice({
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
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    sortDataUsingDate(state, action) {
      switch (action.payload.tab) {
        default:
        case "NewRelease":
        case "Search":
          if (action.payload.dateFilter) {
            state.data?.results.sort(
              (firstMovie, secondMovie) =>
                parseInt(firstMovie?.release_date?.replace("-", "")) -
                parseInt(secondMovie?.release_date?.replace("-", ""))
            );
          } else {
            state.data?.results.sort(
              (firstMovie, secondMovie) =>
                parseInt(secondMovie?.release_date?.replace("-", "")) -
                parseInt(firstMovie?.release_date?.replace("-", ""))
            );
          }
          console.log(state.data?.results.sort);
          break;
        // eslint-disable-next-line no-duplicate-case
        case "Favourites":
          if (action.payload.dateFilter) {
            state.favourites.sort(
              (firstMovie, secondMovie) =>
                parseInt(firstMovie?.release_date?.replace("-", "")) -
                parseInt(secondMovie?.release_date?.replace("-", ""))
            );
          } else {
            state.favourites.sort(
              (firstMovie, secondMovie) =>
                parseInt(secondMovie?.release_date?.replace("-", "")) -
                parseInt(firstMovie?.release_date?.replace("-", ""))
            );
          }
          break;
      }
    },
    sortDataUsingRating(state, action) {
      switch (action.payload.tab) {
        default:
        case "NewRelease":
        case "Search":
          if (action.payload.ratingFilter) {
            state.data?.results.sort(
              (firstMovie, secondMovie) =>
                secondMovie?.vote_average - firstMovie?.vote_average
            );
          } else {
            state.data?.results.sort(
              (firstMovie, secondMovie) =>
                firstMovie?.vote_average - secondMovie?.vote_average
            );
          }
          break;
        case "Favourites":
          if (action.payload.ratingFilter) {
            state.favourites.sort(
              (firstMovie, secondMovie) =>
                secondMovie?.vote_average - firstMovie?.vote_average
            );
          } else {
            state.favourites.sort(
              (firstMovie, secondMovie) =>
                firstMovie?.vote_average - secondMovie?.vote_average
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
            isFavourite: state.favourites.find(
              (favItem) => favItem.id === item.id
            )
              ? true
              : false,
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
    const { data } = await Axios.get(`${api.movies}&page=${state.movie.page}`);
    return data;
  }
);

export const getSearchResult = createAsyncThunk(
  "/api/movie",
  async (params, thunkAPI) => {
    const state = thunkAPI.getState();
    const { data } = await Axios.get(
      `${api.search}&page=${state.movie.page}&query=${state.movie.searchValue}`
    );
    return data;
  }
);

export const {
  addFavourites,
  removeFavourites,
  setPage,
  sortDataUsingDate,
  sortDataUsingRating,
  setSearchValue,
} = movieSlice.actions;

export default movieSlice.reducer;
