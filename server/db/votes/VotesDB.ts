export type Vote = 'like' | 'dislike';
export interface IpVoteMap{
  [key:string] : Vote;
}
interface ArticleVote {
  [key:string] : IpVoteMap
}

export interface VotesDB {
  saveVote(articleID : string , ip : string , vote : Vote) : Promise<boolean>;
  delVotes(articleID : string) : Promise<boolean>;
  getVotes(articleID : string) : Promise<IpVoteMap>;
}