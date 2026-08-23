import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";

interface Props {
  actorId: number;
}

const RemoveActorFromFavourites: React.FC<Props> = ({
  actorId,
}) => {
  const context = useContext(MoviesContext);

  return (
    <IconButton
      aria-label="remove actor from favourites"
      onClick={() =>
        context.removeActorFromFavourites(actorId)
      }
    >
      <DeleteIcon color="error" />
    </IconButton>
  );
};

export default RemoveActorFromFavourites;