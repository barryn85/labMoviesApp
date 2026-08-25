import React, { useContext } from "react";
import {Typography, Paper, Grid,} from "@mui/material";
import { MoviesContext } from "../contexts/moviesContext";

const FantasyMoviesPage: React.FC = () => {
  const { fantasyMovies } = useContext(MoviesContext);

  return (
    <>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        sx={{ mb: 4, color: "green" }}
      >
        My Fantasy Movies
      </Typography>

      <Grid container spacing={3}>
        {fantasyMovies.map((movie) => (
          <Grid item xs={12} key={movie.id}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                margin: "auto",
                maxWidth: "900px",
              }}
            >
              <Typography variant="h5" gutterBottom>
                {movie.title}
              </Typography>

              <Typography paragraph>
                <strong>Overview:</strong> {movie.overview}
              </Typography>

              <Typography>
                <strong>Genre:</strong> {movie.genres}
              </Typography>

              <Typography>
                <strong>Release Date:</strong>{" "}
                {movie.releaseDate}
              </Typography>

              <Typography>
                <strong>Runtime:</strong>{" "}
                {movie.runtime} mins
              </Typography>

              <Typography>
                <strong>Production Company:</strong>{" "}
                {movie.productionCompany}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {fantasyMovies.length === 0 && (
        <Typography
          variant="h6"
          align="center"
          sx={{ mt: 4 }}
        >
          No fantasy movies created yet.
        </Typography>
      )}
    </>
  );
};

export default FantasyMoviesPage;