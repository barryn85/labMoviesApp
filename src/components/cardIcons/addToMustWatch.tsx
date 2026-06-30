import React, { useContext } from "react";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import IconButton from "@mui/material/IconButton";
import { BaseMovieProps } from "../../../types/interfaces";
import { MoviesContext } from "../../contexts/moviesContext";

const AddToMustWatchIcon: React.FC<BaseMovieProps> = (movie) => {

  const { addToMustWatch, mustWatch } = useContext(MoviesContext);

  const handleAddToMustWatch = (movieId: number) => {
    if (!mustWatch.includes(movieId)) {
      addToMustWatch(movieId);

      console.log("Must watch:", [...mustWatch, movieId]);
    }
  };
  return (
    <IconButton aria-label="add to must watch" 
      onClick={() => handleAddToMustWatch(movie.id)}>
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToMustWatchIcon;