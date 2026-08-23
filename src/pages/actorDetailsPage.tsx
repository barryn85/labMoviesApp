import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getActor } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { ActorDetailsProps } from "../types/interfaces";

const ActorDetailsPage: React.FC = () => {
  const { id } = useParams();

  const {
    data: actor,
    error,
    isLoading,
    isError,
  } = useQuery<ActorDetailsProps, Error>(
    ["actor", id],
    () => getActor(id!)
  );

  if (isLoading) return <Spinner />;

  if (isError) return <h1>{error.message}</h1>;

  return (
    <>
      <h1>{actor?.name}</h1>

      {actor?.profile_path && (
        <img
          src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
          alt={actor.name}
        />
      )}

      <p><strong>Born:</strong> {actor?.birthday}</p>
      <p><strong>Place of Birth:</strong> {actor?.place_of_birth}</p>
      <p>{actor?.biography}</p>
    </>
  );
};

export default ActorDetailsPage;