import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useState } from "react";
import { AppBar, Button, Pagination, Stack, TabScrollButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import store from "../store/store";
import { getMovieData } from "../store/dataSlice";
import DynTab from "./DynTab";
import AddFavourite from "./AddFavourites";
import RemoveFavourites from "./RemoveFavourites";
const useStyles = makeStyles({
  search_bar: {
    marginLeft: "17%",
    display: "flex",
    alignItems: "center",
  },
  filters: {
    marginLeft: "3%",
    display: "flex",
    alignItems: "center",
  },
  search_input: {
    padding: "3.2%",
  },
  releaseDate: {
    marginLeft: "10%",
  },
  rating: {
    marginLeft: "2%",
  },
  title: {
    marginLeft: "16%",
  },
  content: {
    position: "absolute",
    top: "73px",
  },
});
const HomePage = () => {
  const classes = useStyles();
  const [tab, setTab] = useState("NewRelease");
  const dispatch = useDispatch();
  const movieData = useSelector((state) => state.movie);
  useEffect(() => {
    dispatch(getMovieData());
  }, [movieData.page]);
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  const favouritesData=movieData.favourites;
  const newReleasesData= movieData.data?.results;
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
          <h2 className={classes.title}>Pelina Beer</h2>
          <div className={classes.filters}>
            <div className={classes.search_bar}>
              <input
                type="text"
                placeholder="Search.."
                name="search"
                className={classes.search_input}
              />
              <button type="submit">
                <SearchIcon />
              </button>{" "}
            </div>
            <div className={classes.releaseDate}>
              <Button
                variant="contained"
                color="secondary"
                endIcon={
                  <ArrowUpwardIcon />
                  //   <ArrowDropDownIcon />
                }
              >
                Release Date
              </Button>
            </div>
            <div className={classes.rating}>
              <Button
                variant="contained"
                color="secondary"
                endIcon={
                  <ArrowUpwardIcon />
                  //   <ArrowDropDownIcon />
                }
              >
                Rating
              </Button>
            </div>
          </div>
        </Tabs>
      </AppBar>
      <main className={classes.content}>
        {tab === "NewRelease" && (
          <DynTab data={newReleasesData} FavComponent={AddFavourite} />
        )}
        {tab === "Favourites" && (
          <DynTab data={favouritesData} FavComponent={RemoveFavourites} />
        )}

      </main>
    </>
  );
};
export default HomePage;
