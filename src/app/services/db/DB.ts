export interface DB {
  hasIPVoted(articleID : string) : Promise<Object>;
  saveVote(articleID : string , vote : 'like' | 'dislike') : Promise<Object>;
}