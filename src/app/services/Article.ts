export interface Article {
  id : string;
  title: string;
  shortDescription : string;
  img: {
    src: string,
    alt: string
  };
  body: string;
  tags: string[];
  date : number;
}