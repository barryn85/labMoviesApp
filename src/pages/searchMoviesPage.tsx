import React, { useState } from "react";
import { useQuery } from "react-query";
import PageTemplate from "../components/templateMovieListPage";
import { searchMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { DiscoverMovies } from "../types/interfaces";
import { Typography } from "@mui/material";

const SearchMoviesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [page, setPage] = useState(1);

  const {
    data: movies,
    error,
    isLoading,
    isError,
  } = useQuery<DiscoverMovies, Error>(
    ["movieSearch", submittedSearch, page],
    () => searchMovies(submittedSearch, page),
    {
      enabled: submittedSearch !== "",
    }
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const search = searchTerm.trim();

    if (search !== "") {
      setSubmittedSearch(search);
      setPage(1); 
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
  <>
    <h2>
      Found {movies.total_results} results for "{submittedSearch}"
    </h2>

    <PageTemplate
      title={`Search Results for "${submittedSearch}"`}
      movies={movies.results}
      action={() => null}
    />
    <Typography align="center">
    <button
      disabled={page === 1}
      onClick={() => setPage(page - 1)}
    >
      Previous
    </button>

    <span style={{ margin: "0 10px" }}>
  Page {movies.page} of {movies.total_pages}
</span>

    <button
      disabled={page >= movies.total_pages}
      onClick={() => setPage(page + 1)}
    >
      Next
    </button>
    </Typography>
  </>
)}
      </>
  );
};

export default SearchMoviesPage;
