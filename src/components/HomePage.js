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
import { getMovieData, setPage } from "../store/dataSlice";
import DynTab from "./DynTab";
import AddFavourite from "./AddFavourites";
import RemoveFavourites from "./RemoveFavourites";
const useStyles = makeStyles({

});
const HomePage = () => {
  const classes = useStyles();
  const [tab, setTab] = useState("NewRelease");
  // const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const movieData = useSelector((state) => state.movie);
  useEffect(() => {
    dispatch(getMovieData());
  }, [movieData.page]);
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  const handleChangePage = (event, value) => {
    // setPage(value);
    dispatch(setPage(value));
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
          <div className="nav_options">
          <h2 className="pageTitle">Pelina Beer</h2>
            <div className="search_bar">
              <input
                type="text"
                placeholder="Search.."
                name="search"
                className="search_input"
              />
              <button  className="search_icon" >
                <SearchIcon />
              </button>
            </div>
            <div className="releaseDate">
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
            <div className="rating">
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
      <main className="content">
        {tab === "NewRelease" && (
          <DynTab data={newReleasesData} FavComponent={AddFavourite} />
        )}
        {tab === "Favourites" && (
          <DynTab data={favouritesData} FavComponent={RemoveFavourites} />
        )}
        {(movieData.data?.total_pages&&tab!=='Favourites')&& <div className="pagination"><Stack spacing={2}>
         <Pagination size="large" color='secondary' count={500}  onChange={handleChangePage} />
         </Stack></div>}
      </main>
    </>
  );
};
export default HomePage;
