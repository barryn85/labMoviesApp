import React, { useState } from "react";
import { useQuery } from "react-query";
import PageTemplate from "../components/templateMovieListPage";
import { searchMovies, getGenres } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { GenreData } from "../types/interfaces";
import { Typography } from "@mui/material";

const SearchMoviesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [page, setPage] = useState(1);

  const [genre, setGenre] = useState("0");
  const [minimumRating, setMinimumRating] = useState("0");

  const { data: genresData } = useQuery<GenreData, Error>(
    ["genres"],
    getGenres
  );

  const {
    data: movieResults,
    error,
    isLoading,
    isError,
  } = useQuery(
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
    return <h1>{(error as Error).message}</h1>;
  }

  const filteredMovies = movieResults
    ? movieResults.results.filter((movie: any) => {
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
      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(event) =>
            setSearchTerm(event.target.value)
          }
          style={{
            width: "450px",
            padding: "10px",
            fontSize: "16px",
            marginRight: "10px",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            marginRight: "10px",
          }}
        >
          Search
        </button>

        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            marginRight: "10px",
          }}
        >
          <option value="0">All Genres</option>

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
          style={{
            width: "150px",
            padding: "10px",
            fontSize: "16px",
          }}
        />
      </form>

      {movieResults && (
        <>
          <h2 style={{ textAlign: "center" }}>
            Found {filteredMovies.length} results for "
            {submittedSearch}"
          </h2>

          <PageTemplate
            title={`Movies matching "${submittedSearch}"`}
            movies={filteredMovies}
            action={() => null}
          />
        </>
      )}

      {movieResults && (
        <Typography
          align="center"
          sx={{ mt: 3, mb: 3 }}
        >
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>

          <span style={{ margin: "0 15px" }}>
            Page {movieResults.page} of{" "}
            {movieResults.total_pages}
          </span>

          <button
            disabled={
              page >= movieResults.total_pages
            }
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </Typography>
      )}
    </>
  );
};

export default SearchMoviesPage;