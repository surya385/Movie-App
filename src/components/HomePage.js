import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useState } from "react";
import { AppBar, Button, Pagination, Stack } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getMovieData,
  getSearchResult,
  setPage,
  setSearchValue,
  sortDataUsingDate,
  sortDataUsingRating,
} from "../store/dataSlice";
import DynTab from "./DynTab";
import { Axios } from "axios";
const HomePage = () => {
  const movieData = useSelector((state) => state.movie);
  const dispatch = useDispatch();
  const [tab, setTab] = useState("NewRelease");
  const [dateFilter, setDateFilter] = useState(false);
  const [ratingFilter, setRatingFilter] = useState(false);
  const [searchInput, setSearchInput] = useState(false);
  useEffect(() => {
    if (searchInput) dispatch(getSearchResult());
    else dispatch(getMovieData());
  }, [movieData.page]);
  useEffect(() => {
    if (tab==='NewRelease') {
      setSearchInput(false);
      dispatch(setSearchValue(''));
      dispatch(setPage(1));
      dispatch(getMovieData());
    }
  }, [tab]);
  useEffect(() => {
    dispatch(sortDataUsingDate({ dateFilter, tab }));
  }, [dateFilter]);
  useEffect(() => {
    dispatch(sortDataUsingRating({ ratingFilter, tab }));
  }, [ratingFilter]);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  const handleChangePage = (event, value) => {
    dispatch(setPage(value));
  };
  const searchHandler = (e) => {
    e.preventDefault()
    if (searchInput) {
      setTab('Search')
      dispatch(getSearchResult());
    }
  };

  const inputChangeHandler = (e) => {
    if (e.target.value) {
      setSearchInput(true);
      dispatch(setSearchValue(e.target.value));
    } else {
      dispatch(setSearchValue(''));
      dispatch(getMovieData());
    }
  };
  console.log(movieData);
  return (
    <>
      <AppBar style={{ background: "#2E3B55" }}>
        <Tabs
          value={tab}
          onChange={handleChange}
          textColor="white"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab
            icon={<MovieFilterIcon />}
            iconPosition="start"
            value="NewRelease"
            label="New Release"
          />
          <Tab
            icon={<FavoriteIcon />}
            iconPosition="start"
            value="Favourites"
            label="Favourites"
          />
          <div className="nav_options">
          <h2 className="pageTitle">Movie App</h2>
            <div className="search_bar">
              <form onSubmit={searchHandler}>
              <input
              value={movieData.searchValue}
                onChange={inputChangeHandler}
                type="text"
                placeholder="Search.."
                className="search_input"
              />
              <button type="submit" className="search_icon" >
                <SearchIcon />
              </button>
              </form>
            </div>
            <div className="releaseDate">
              <Button
                onClick={() => setDateFilter((prev) => !prev)}
                variant="contained"
                color="secondary"
                endIcon={
                  dateFilter ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />
                }
              >
                Release Date
              </Button>
            </div>
            <div className="rating">
              <Button
                onClick={() => setRatingFilter((prev) => !prev)}
                variant="contained"
                color="secondary"
                endIcon={
                  ratingFilter ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />
                }
              >
                Rating
              </Button>
            </div>
          </div>
        </Tabs>
      </AppBar>
      <main className="content">
        {tab === "NewRelease" && <DynTab data={movieData.data?.results} />}
        {tab === "Favourites" && <DynTab data={movieData.favourites} />}
        {(searchInput&&tab!== ("Favourites"||"NewRelease")) && <DynTab data={movieData.data?.results} />}
        {(movieData.data?.total_pages &&tab!=="Favourites") && (
          <div className="pagination">
            <Stack spacing={2}>
              <Pagination
              page={movieData.page}
                size="large"
                color="secondary"
                count={searchInput ? movieData.data?.total_pages : 500}
                onChange={handleChangePage}
              />
            </Stack>
          </div>
        )}
      </main>
    </>
  );
};
export default HomePage;
