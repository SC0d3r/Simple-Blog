export interface Article {
  id : string;
  title: string;
  img: {
    src: string,
    alt: string
  };
  body: string;
  tags: string[];

}