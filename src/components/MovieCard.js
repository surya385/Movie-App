import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { useDispatch } from "react-redux";
import { addFavourites, removeFavourites } from "../store/dataSlice";
import { Urls } from "../config/config";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";

export default function MovieCard({ movieData, FavComponent ,movieModelOpen}) {
  const dispatch = useDispatch();
  const onClickHandler = () => {
    if (movieData.isFavourite) {
      dispatch(removeFavourites(movieData.id));
    } else {
      dispatch(addFavourites(movieData));
    }
  };
  return (
    <Card md={{ width: 319,height:416 }}>

        <div className="image-container d-flex justify-content-start m-3">
        <CardActionArea onClick={()=>movieModelOpen(movieData)}>
          <CardMedia
            component="img"
            image={`${Urls.API_IMG}${movieData.poster_path}`}
          />
            </CardActionArea>
          <div
            onClick={onClickHandler}
            className="overlay d-flex align-items-center justify-content-center"
          >
            {movieData.isFavourite ? (
              <div>
                Remove Favourite <CloseIcon />
              </div>
            ) : (
              <div>
                Add Favourite 
                <FavoriteIcon />
              </div>
            )}
          </div>
        </div>

    </Card>
  );
}
