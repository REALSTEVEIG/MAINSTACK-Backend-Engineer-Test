import mongoose from 'mongoose';
import { type BlackListedToken } from '@/types';

const { Schema } = mongoose;

const blackListedTokens = new Schema<BlackListedToken>(
  {
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

// Set up a TTL (time to live) index on the "createdAt" field with an expiration time of 1 month
blackListedTokens.index(
  { createdAt: 1 },

  // Set the TTL index to expire after 24 hours
  { expireAfterSeconds: 2592000 },
); // 24 hours

const BlackListedTokensModel = mongoose.model<BlackListedToken>(
  'blackListedTokens',
  blackListedTokens,
);

export default BlackListedTokensModel;
