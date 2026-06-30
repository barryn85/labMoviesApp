import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { BaseMovieProps } from "../types/interfaces";
import { getUpcomingMovies } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToMustWatchIcon from "../components/cardIcons/addToMustwatch";


const UpcomingMoviesPage: React.FC = () => {
  const { data: movies, error, isLoading, isError } = useQuery<BaseMovieProps[], Error>(
    "upcoming",
    getUpcomingMovies
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies || []}
      action={(movie: BaseMovieProps) => {
        return <AddToMustWatchIcon {...movie} />;
      }}
    />
  );
};

export default UpcomingMoviesPage;
