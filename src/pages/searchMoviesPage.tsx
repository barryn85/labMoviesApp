import React, { useState } from "react";
import { useQuery } from "react-query";
import PageTemplate from "../components/templateMovieListPage";
import { searchMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { DiscoverMovies } from "../types/interfaces";

const SearchMoviesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");

  const {
    data: movies,
    error,
    isLoading,
    isError,
  } = useQuery<DiscoverMovies, Error>(
    ["movieSearch", submittedSearch],
    () => searchMovies(submittedSearch),
    {
      enabled: submittedSearch !== "",
    }
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const search = searchTerm.trim();

    if (search !== "") {
      setSubmittedSearch(search);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <button type="submit">
          Search
        </button>
      </form>

      {movies && (
        <PageTemplate
          title={`Search Results for "${submittedSearch}"`}
          movies={movies.results}
          action={() => null}
        />
      )}
    </>
  );
};

export default SearchMoviesPage;
