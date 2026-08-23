import React from "react";
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getMovieCredits } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import {MovieDetailsProps,MovieCredits,} from "../types/interfaces";
import { Link } from "react-router-dom";

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams();

  const {
    data: movie,
    error,
    isLoading,
    isError,
  } = useQuery<MovieDetailsProps, Error>(
    ["movie", id],
    () => getMovie(id || "")
  );

  const {
    data: credits,
  } = useQuery<MovieCredits, Error>(
    ["movieCredits", id],
    () => getMovieCredits(id || "")
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error?.message}</h1>;
  }

  return (
  <>
    {movie ? (
      <PageTemplate movie={movie}>
        <>
          <MovieDetails {...movie} />

          <h2>Cast</h2>

          <ul>
            {credits?.cast.slice(0, 10).map((actor) => (
              <li key={actor.id}>
  <Link to={`/actors/${actor.id}`}>
    {actor.name}
  </Link>
  {" - "}
  {actor.character}
</li>
            ))}
          </ul>
        </>
      </PageTemplate>
    ) : (
      <p>Waiting for movie details</p>
    )}
  </>
);
};
export default MovieDetailsPage;