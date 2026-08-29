import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import { Link } from "react-router-dom";
import img from "../../images/film-poster-placeholder.png";
import { Actor} from "../../types/interfaces";
import AddActorToFavouritesIcon from "../cardIcons/addActorToFavourites";
import RemoveActorFromFavourites from "../cardIcons/removeActorFromFavourites";

const styles = {
  card: { maxWidth: 345 },
  media: { height: 500 },
};

interface ActorCardProps {
  actor: Actor;
}

const ActorCard: React.FC<ActorCardProps> = ({ actor }) => {
  return (
    <Card sx={styles.card}>
      <CardHeader
        title={
          <Typography variant="h5" component="p">
            {actor.name}
          </Typography>
        }
      />

      <CardMedia
        sx={styles.media}
        image={
          actor.profile_path
            ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
            : img
        }
      />

      <CardContent>
        <Typography variant="body1">
          Popularity: {actor.popularity.toFixed(1)}
        </Typography>

        <Typography variant="body2">
          {actor.known_for_department}
        </Typography>
      </CardContent>

      <CardActions>
  <AddActorToFavouritesIcon actorId={actor.id} />

  <Link to={`/actors/${actor.id}`}>
    <Button
      variant="outlined"
      size="medium"
      color="primary"
    >
      More Info ...
    </Button>
  </Link>
   <RemoveActorFromFavourites actorId={actor.id} />
</CardActions>
    </Card>
  );
};

export default ActorCard;