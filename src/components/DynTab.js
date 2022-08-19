import { Grid } from "@mui/material";
import MovieCard from "./MovieCard";
const DynTab = ({ data, FavComponent }) => {
  if (!data || data.length === 0) return <h1>No Movies Found</h1>;
  return (
    <div>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3}}>
        {data.map((movie) => (
          <Grid item md={3}>
            <MovieCard movieData={movie} FavComponent={FavComponent} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
export default DynTab;
