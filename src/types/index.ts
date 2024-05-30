export type TMovieItem = {
  title: string;
  id: number;
  vote_average: number;
  original_title: string;
  original_language: string;
  overview: string;
  release_date: string;
  poster_path: string;
  genre_ids: Array<number>;
  adult: boolean;
};

export type TGenre = { [key: number]: { id: number; name: string } };
