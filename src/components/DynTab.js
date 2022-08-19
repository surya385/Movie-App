import { Grid } from "@mui/material";
import { useState } from "react";
import MovieCard from "./MovieCard";
import MovieModal from "./MovieModal";
const DynTab = ({ data}) => {
  const [open, setOpen] = useState(false);
  const [movieModalData, setMovieModalData] = useState({});
  const handleOpen = (data) => {
    setMovieModalData(data);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  if (!data || data.length === 0)
    return <h2 className="noMoviesFound">No Movies Found</h2>;
  return (
    <div>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {data.map((movie) => (
          <Grid item >
            <MovieCard movieData={movie} movieModelOpen={handleOpen} />
          </Grid>
        ))}
      </Grid>
      {open && (
        <MovieModal
          open={open}
          handleClose={handleClose}
          data={movieModalData}
        />
      )}
    </div>
  );
};
export default DynTab;
