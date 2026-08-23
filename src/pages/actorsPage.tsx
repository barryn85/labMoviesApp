import React from "react";
import { useQuery } from "react-query";
import Grid from "@mui/material/Grid";
import { getPopularActors } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import ActorCard from "../components/actorCard";
import { PopularActors } from "../types/interfaces";

const ActorsPage: React.FC = () => {
  const {
    data,
    error,
    isLoading,
    isError,
  } = useQuery<PopularActors, Error>(
    "actors",
    getPopularActors
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      <h1>Popular Actors</h1>

      <Grid container spacing={3}>
        {data?.results.map((actor) => (
          <Grid item key={actor.id}>
            <ActorCard actor={actor} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ActorsPage;