/* eslint-disable object-curly-newline */
import type {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import type { Types, Mongoose, Document } from 'mongoose';

interface RequestContext {
  user?: unknown;
}

interface BlackListedToken {
  token: string;
}

// eslint-disable-next-line @typescript-eslint/ban-types
interface Request<ReqBody, Context = Record<string, unknown>, Q = {}>
  extends ExpressRequest {
  ctx: Context & RequestContext;
  body: ReqBody;
  query: ExpressRequest['query'] & Q;
}

interface Response<ResBody> extends ExpressResponse {
  body: ResBody;
}

interface IMongoConn {
  connectDatabase: () => Promise<Mongoose>;
  closeDatabase: () => Promise<void>;
}

interface EnvVars {
  NODE_ENV: NodeEnvironment | string;
  ALLOWED_HOSTNAMES: string;
  PORT: number | string;
  APP_VERSION: string;
  MONGO_URI: string;
  DB_NAME: string;
  DB_NAME_TEST: string;
}

export interface MarketplaceSchema {
  _id: Types.ObjectId | string;
  name: string;
  description: string;
  uid: string;
  author: string;
  version: string;
  appIcon: string;
  appConfig: object;
  createdAt: NativeDate;
  updatedAt: NativeDate;
}

export interface ErrorResponse {
  message: string;
  errorCode: string;
  statusCode: number;
  stack?: string;
}

export interface ApiErrorOpts {
  message: string;
  statusCode: number;
  errorCode: string;
}

export interface NewUserData {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
}

export interface SingleUser extends IUser {}

export type ErrorCodeKeys =
  | 'unexpectedError'
  | 'invalidRequest'
  | 'unauthorized'
  | 'forbidden'
  | 'authenticationFailed'
  | 'accountLocked'
  | 'invalidAuthorizationCode'
  | 'validationError'
  | 'userNotFound'
  | 'userAlreadyExists'
  | 'invalidCredentials'
  | 'loginFailed'
  | 'invalidEmailOrPassword'
  | 'invalidGoogleAuth'
  | 'invalidEmailLogin'
  | 'accountInactive'
  | 'signupFailed'
  | 'invalidSignupData'
  | 'sessionExpired'
  | 'sessionNotFound'
  | 'recordNotFound'
  | 'invalidInput'
  | 'missingInputForEmail'
  | 'fileNotFound'
  | 'accessDenied'
  | 'resourceAlreadyExists'
  | 'notImplemented'
  | 'errBadRequest'
  | 'passwordRequired'
  | 'userDeactivated';

export interface ErrorData {
  errorCode: string;
  statusCode: number;
  message: string;
}

export type Errors = {
  [key in ErrorCodeKeys]: ErrorData;
};

export interface VerificationPayload {
  email: string;
  token: string;
}

export interface VerificationEmailContent {
  to: string;
  subject?: string;
  body?: string;
  html?: string;
  verificationUrl: string;
}

export interface ForgotPasswordEmailContent {
  to: string;
  subject?: string;
  body?: string;
  html?: string;
  forgotPasswordUrl: string;
}

export type TokenAllowedActions = 'email-verification' | 'reset-password';

export interface ActionTokenPayload {
  email: string;
  allowedAction: TokenAllowedActions;
  tokenId: string;
}

export type TRoutesAndAllowedActions = Array<{
  path: string;
  allowedActions: TokenAllowedActions[];
}>;

export type NodeEnvironment = 'development' | 'test' | 'production';

export type UsersDocument = Document & IUser;
export type ActionTokensDocument = Document & ActionTokensSchema;

export interface InstalledApp {
  appId: Types.ObjectId;
  appData: unknown;
}

export interface IUserProfile extends Document {
  userDisplayName: string;
  timezone: string;
  describeWork: string;
  helpOption: number;
  isOnboardingProcessCompleted: boolean;
  addresses: Array<{
    addressType: string;
    streetAddress: string;
    line2: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  }>;
}

export interface IUserNotifications extends Document {
  push: boolean;
  email: boolean;
  snoozePreferences: number;
  notifyMe: boolean[];
}

export interface IUserAccessibility extends Document {
  name: string;
  type: string;
  value: string;
}

export interface IUser extends Document {
  _id: Types.ObjectId;
  authType: 'local' | 'google' | 'microsoft' | 'apple';
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  isEmailVerified: boolean;
  isSignupProcessCompleted: boolean;
  profile: Types.ObjectId; // Reference to UserProfile
  isDeactivated: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PasswordResetSuccessEmailContent {
  to: string;
  subject?: string;
  body?: string;
  html?: string;
  loginUrl: string;
}

export interface IUserGroup extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  roles: [Types.ObjectId];
  members: [Types.ObjectId];
  ownerRefId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewAppData {
  appId: string | Types.ObjectId;
  name: string;
  description: string;
  author: string;
  version: string;
}

export interface ActionTokensSchema extends ActionTokenPayload {
  _id: Types.ObjectId;
}

export interface SessionSchema extends Document {
  _id: string;
  expires: NativeDate;
  session: {
    cookie: Cookie;
    user: SingleUser;
  };
}

interface Cookie {
  originalMaxAge: number;
  expires: Date;
  secure: boolean | null;
  httpOnly: boolean;
  domain: string | null;
  path: string;
  sameSite: 'strict' | 'lax' | 'none';
}

export type { IMongoConn, EnvVars, Request, Response, BlackListedToken };
