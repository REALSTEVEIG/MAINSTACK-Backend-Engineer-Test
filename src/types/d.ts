import { type SingleUser } from '.';

declare module 'express-session' {
  interface SessionData {
    user: SingleUser;
  }
}

declare global {
  // eslint-disable-next-line vars-on-top, no-var
  var sessionCookie: string;
}
