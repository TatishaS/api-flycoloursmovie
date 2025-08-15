interface ActivityResult<T> {
  _doc: T;
}

export interface IActivity extends ActivityResult<IActivity> {
  user: string;
  type: string;
  title: string;
  description: string;
  imageUrl: string;
  originalLanguage: string;
  subtitlesLanguage: string;
  date: string;
  time: string;
  free: boolean;
  price: number;
  occupiedSeats: string[];
}
