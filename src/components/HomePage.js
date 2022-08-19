import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useState } from "react";
import { AppBar, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
  textCentered: {
    textAlign: "center",
  },
  searchBar: {
    marginLeft: "17%",
    display: "flex",
    alignItems: "center",
  },
  filters: {
    marginLeft: "3%",
    display: "flex",
    alignItems: "center",
  },
  searchInput: {
    padding: "3.2%",
  },
  releaseDate: {
    marginLeft:'10%',
  },
  rating:{
    marginLeft:'2%'
  },
  title: {
    marginLeft: "16%",
  },
});
const HomePage = () => {
  const classes = useStyles();
  const [value, setValue] = useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };
  return (
    <AppBar
      style={{ background: "#2E3B55" }}
    >
      <Tabs
        value={value}
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
        <h2 className={classes.title}>Movie App</h2>
        <div className={classes.filters}>
          <div className={classes.searchBar}>
            <input
              type="text"
              placeholder="Search.."
              name="search"
              className={classes.searchInput}
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
          </div></div>
      </Tabs>
    </AppBar>
    
  );
};
export default HomePage;
