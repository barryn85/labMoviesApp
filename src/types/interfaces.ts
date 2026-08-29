 export interface BaseMovieProps {
  title: string;
  budget: number;
  homepage: string | undefined;
  id: number;
  imdb_id: string;
  original_language: string;
  overview: string;
  release_date: string;
  vote_average: number;
  popularity: number;
  poster_path?: string;
  tagline: string;
  runtime: number;
  revenue: number;
  vote_count: number;
  favourite?: boolean;
  genre_ids?: number[];
}

export interface BaseMovieListProps {
  movies: BaseMovieProps[];
  action: (m: BaseMovieProps) => React.ReactNode;
}

export interface MovieDetailsProps extends BaseMovieProps {
  genres: {
    id: number;
    name: string;
  }[];

  production_countries: {
    name: string;
  }[];
}

export interface MovieImage {
  file_path: string;
  aspect_ratio?: number;
  height?: number;
  iso_639_1?: string;
  vote_average?: number;
  vote_count?: number;
  width?: number;
}

export interface MoviePageProps {
  movie: MovieDetailsProps;
  images: MovieImage[];
}

export type FilterOption = "title" | "genre";

export interface MovieListPageTemplateProps
  extends BaseMovieListProps {
  title: string;
}

export interface Review {
  id: number;
  author: string;
  content: string;
  agree: boolean;
  rating: number;
  movieId: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface GenreData {
  genres: Genre[];
}

export interface DiscoverMovies {
  page: number;
  total_pages: number;
  total_results: number;
  results: BaseMovieProps[];
}

export interface Actor {
  id: number;
  name: string;
  profile_path: string | null;
}

export interface ActorDetailsProps {
  id: number;
  name: string;
  biography: string;
  birthday: string | null;
  deathday: string | null;
  place_of_birth: string | null;
  profile_path: string | null;
}

export interface ActorMovieCredit {
  id: number;
  title: string;
  character: string;
}

export interface ActorMovieCredits {
  cast: ActorMovieCredit[];
}

export interface PopularActors {
  page: number;
  total_pages: number;
  total_results: number;
  results: Actor[];
}


export interface FantasyMovie {
  id: number;
  title: string;
  overview: string;
  genres: string;
  releaseDate: string;
  runtime: number;
  productionCompany: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path?: string | null;
}

export interface MovieCredits {
  cast: CastMember[];
}