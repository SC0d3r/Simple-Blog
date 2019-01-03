import { Subscription } from './Subscription';
import { resolve } from 'path';

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(resolve(process.cwd(), 'db', 'subscription', './db.json'));

export class SubscriptionImp implements Subscription {
  private _db: any;
  constructor() {
    this._db = low(adapter);
    // Set some defaults
    this._db.defaults({ subscribers : [] })
      .write();
  }
  saveEmail(email: string): Promise<boolean> {
    const isEmailValid = checkEmail(email);
    if (isEmailValid) {
      const isAlreadySubmited = this._db.get('subscribers').includes(email).value();
      if(isAlreadySubmited) return Promise.resolve(false);

      this._db.get('subscribers').push(email).write();
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }
}

function checkEmail(email: string): boolean {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isNotUndefined = email !== undefined;
  const isNotEmpty = email.length !== 0;
  const isString = typeof email === 'string';
  const isValidEmail = emailRegex.test(email);
  return isNotUndefined && isNotEmpty && isString && isValidEmail;
}