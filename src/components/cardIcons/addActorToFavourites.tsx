import React, { useContext } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import { MoviesContext } from "../../contexts/moviesContext";

interface Props {
  actorId: number;
}

const AddActorToFavourites: React.FC<Props> = ({ actorId }) => {
  const { addActorToFavourites } = useContext(MoviesContext);

  return (
    <IconButton
      color="primary"
      onClick={() => addActorToFavourites(actorId)}
    >
      <FavoriteIcon />
    </IconButton>
  );
};

export default AddActorToFavourites;