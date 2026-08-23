import React, { useContext } from "react";
import { useQueries } from "react-query";
import { MoviesContext } from "../contexts/moviesContext";
import { getActor } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import ActorCard from "../components/actorCard";
import Grid from "@mui/material/Grid";
import RemoveActorFromFavourites from "../components/cardIcons/removeActorFromFavourites";

const FavouriteActorsPage: React.FC = () => {
  const { favouriteActors: actorIds } = useContext(MoviesContext);

  const favouriteActorQueries = useQueries(
    actorIds.map((actorId) => ({
      queryKey: ["actor", actorId],
      queryFn: () => getActor(actorId.toString()),
    }))
  );

  const isLoading = favouriteActorQueries.find(
    (a) => a.isLoading === true
  );

  if (isLoading) {
    return <Spinner />;
  }

  const favouriteActors = favouriteActorQueries
    .map((q) => q.data)
    .filter(Boolean);

  return (
    <>
      <h1>Favourite Actors</h1>

      <Grid container spacing={3}>
        {favouriteActors.map((actor) => (
          <Grid item key={actor.id}>
            <ActorCard actor={actor} />
            <RemoveActorFromFavourites actorId={actor.id} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default FavouriteActorsPage;