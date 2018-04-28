export interface Subscription {
  saveEmail(email : string) : Promise<boolean>;
}