 export interface BaseMovieListProps { 
    movies: BaseMovieProps[];
  }   

    export interface MovieDetailsProps extends BaseMovieProps {
    genres: {
      id: number;
      name: string;
    }[];
  }
