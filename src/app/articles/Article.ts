export interface Article { 
  readonly title : string;
  readonly img : {
    src : string,
    alt : string
  };
  readonly description : string;
  readonly tags : string[];

}