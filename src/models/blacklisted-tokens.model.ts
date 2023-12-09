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

  // Set the TTL index to expire after 30 days
  { expireAfterSeconds: 60 * 60 * 24 * 30 },
); // 60 seconds * 60 minutes * 24 hours * 30 days = 30 days

const BlackListedTokensModel = mongoose.model<BlackListedToken>(
  'blackListedTokens',
  blackListedTokens,
);

export default BlackListedTokensModel;
