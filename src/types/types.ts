import IMovie from '../interfaces/IMovie';

export type ThunkActionType = {
  movies: IMovie[];
  totalPages: number;
  currentPage: number;
};

export type ThunkArgType = {
  query: string;
  page: number;
};

export type MoviesStateType = {
  movies: IMovie[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  query: string;
};

export type ActionType = {
  payload: string;
  type: string;
};

export type PaginationProps = {
  handlePreviousInternalPage: () => void;
  handleNextInternalPage: () => void;
  nextButtonDisabled: boolean;
  prevButtonDisabled: boolean;
  totalPages: number;
  internalPage: number;
  currentPage: number;
};
