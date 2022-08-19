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
import store from "../store/store";
import { getMovieData, setPage, sortDataUsingDate } from "../store/dataSlice";
import DynTab from "./DynTab";
import AddFavourite from "./AddFavourites";
import RemoveFavourites from "./RemoveFavourites";
const HomePage = () => {
  const movieData = useSelector((state) => state.movie);
  const dispatch = useDispatch();
  const [tab, setTab] = useState("NewRelease");
  const [dateFilter, setDateFilter] = useState(false);

  useEffect(() => {
    dispatch(getMovieData());
  }, [movieData.page]);
  useEffect(() => {
    dispatch(sortDataUsingDate({dateFilter,tab}));
  }, [dateFilter]);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  const handleChangePage = (event, value) => {
    dispatch(setPage(value));
  };
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
              <input
                type="text"
                placeholder="Search.."
                name="search"
                className="search_input"
              />
              <button className="search_icon">
                <SearchIcon />
              </button>
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
                variant="contained"
                color="secondary"
                endIcon={
                  <ArrowUpwardIcon />
                  //   <ArrowDownwardIcon />
                }
              >
                Rating
              </Button>
            </div>
          </div>
        </Tabs>
      </AppBar>
      <main className="content">
        {tab === "NewRelease" && (
          <DynTab data={movieData.data?.results} FavComponent={AddFavourite} />
        )}
        {tab === "Favourites" && (
          <DynTab data={movieData.favourites} FavComponent={RemoveFavourites} />
        )}
        {movieData.data?.total_pages && tab !== "Favourites" && (
          <div className="pagination">
            <Stack spacing={2}>
              <Pagination
                size="large"
                color="secondary"
                count={500}
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
