import React, { useState } from "react";
import { useQuery } from "react-query";
import PageTemplate from "../components/templateMovieListPage";
import { searchMovies, getGenres } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { DiscoverMovies, GenreData } from "../types/interfaces";
import { Typography } from "@mui/material";

const SearchMoviesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [page, setPage] = useState(1);

  const [genre, setGenre] = useState("0");
  const [minimumRating, setMinimumRating] = useState("0");

  const {
    data: genresData,
  } = useQuery<GenreData, Error>(
    ["genres"],
    getGenres
  );

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

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
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

  const filteredMovies = movies
    ? movies.results.filter((movie) => {
        const matchesGenre =
          genre === "0" ||
          movie.genre_ids?.includes(Number(genre));

        const matchesRating =
          movie.vote_average >= Number(minimumRating);

        return matchesGenre && matchesRating;
      })
    : [];

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(event) =>
            setSearchTerm(event.target.value)
          }
        />

        <button type="submit">
          Search
        </button>

        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          <option value="0">
            All Genres
          </option>

          {genresData?.genres.map((genre) => (
            <option
              key={genre.id}
              value={genre.id}
            >
              {genre.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          min="0"
          max="10"
          step="0.1"
          placeholder="Minimum Rating"
          value={minimumRating}
          onChange={(e) =>
            setMinimumRating(e.target.value)
          }
        />
      </form>

      {movies && (
        <>
          <h2>
            Found {filteredMovies.length} results
            for "{submittedSearch}"
          </h2>

          <PageTemplate
            title={`Search Results for "${submittedSearch}"`}
            movies={filteredMovies}
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
              Page {movies.page} of{" "}
              {movies.total_pages}
            </span>

            <button
              disabled={
                page >= movies.total_pages
              }
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