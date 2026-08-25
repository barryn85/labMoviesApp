import React, { useState, useCallback } from "react";
import { BaseMovieProps, Review, FantasyMovie,} from "../types/interfaces";

interface MovieContextInterface {
  favourites: number[];
  favouriteActors: number[];

  addToFavourites: (movie: BaseMovieProps) => void;
  removeFromFavourites: (movie: BaseMovieProps) => void;

  addActorToFavourites: (actorId: number) => void;
  removeActorFromFavourites: (actorId: number) => void;

  addReview: (movie: BaseMovieProps, review: Review) => void;

  mustWatch: number[];
  addToMustWatch: (movieId: number) => void;

  fantasyMovies: FantasyMovie[];
  addFantasyMovie: (movie: FantasyMovie) => void;
}

const initialContextState: MovieContextInterface = {
  favourites: [],
  favouriteActors: [],

  addToFavourites: () => {},
  removeFromFavourites: () => {},

  addActorToFavourites: () => {},
  removeActorFromFavourites: () => {},

  addReview: (movie, review) => {
    movie.id;
    review;
  },

  mustWatch: [],
  addToMustWatch: () => {},

  fantasyMovies: [],
  addFantasyMovie: () => {},
};

export const MoviesContext =
  React.createContext<MovieContextInterface>(
    initialContextState
  );

const MoviesContextProvider: React.FC<
  React.PropsWithChildren
> = ({ children }) => {
  const [favourites, setFavourites] = useState<number[]>([]);
  const [favouriteActors, setFavouriteActors] = useState<
    number[]
  >([]);
  const [myReviews, setMyReviews] = useState<Review[]>([]);
  const [mustWatch, setMustWatch] = useState<number[]>([]);
  const [fantasyMovies, setFantasyMovies] = useState<
    FantasyMovie[]
  >([]);

  const addToFavourites = useCallback(
    (movie: BaseMovieProps) => {
      setFavourites((prevFavourites) => {
        if (!prevFavourites.includes(movie.id)) {
          return [...prevFavourites, movie.id];
        }
        return prevFavourites;
      });
    },
    []
  );

  const removeFromFavourites = useCallback(
    (movie: BaseMovieProps) => {
      setFavourites((prevFavourites) =>
        prevFavourites.filter(
          (mId) => mId !== movie.id
        )
      );
    },
    []
  );

  const addActorToFavourites = (
    actorId: number
  ) => {
    setFavouriteActors((prev) => {
      if (!prev.includes(actorId)) {
        return [...prev, actorId];
      }
      return prev;
    });
  };

  const removeActorFromFavourites = (
    actorId: number
  ) => {
    setFavouriteActors((prev) =>
      prev.filter((id) => id !== actorId)
    );
  };

  const addReview = (
    movie: BaseMovieProps,
    review: Review
  ) => {
    setMyReviews({
      ...myReviews,
      [movie.id]: review,
    } as any);
  };

  const addToMustWatch = (movieId: number) => {
    setMustWatch((prev) => [...prev, movieId]);
  };

  const addFantasyMovie = (
    movie: FantasyMovie
  ) => {
    setFantasyMovies((prev) => [
      ...prev,
      movie,
    ]);
  };

  return (
    <MoviesContext.Provider
      value={{
        favourites,
        favouriteActors,

        addToFavourites,
        removeFromFavourites,

        addActorToFavourites,
        removeActorFromFavourites,

        addReview,

        mustWatch,
        addToMustWatch,

        fantasyMovies,
        addFantasyMovie,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;