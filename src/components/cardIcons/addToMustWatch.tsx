import React from "react";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import IconButton from "@mui/material/IconButton";
import { BaseMovieProps } from "../../../types/interfaces";

const AddToMustWatchIcon: React.FC<BaseMovieProps> = () => {
  return (
    <IconButton aria-label="add to must watch">
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToMustWatchIcon;