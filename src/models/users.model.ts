import mongoose from 'mongoose';
import type { IUser, IUserProfile } from '@/types';
import { toJSON } from './plugin/toJSON';

const { Schema } = mongoose;

// Schema for User Profile
const userProfileSchema = new Schema<IUserProfile>({
  userDisplayName: String,
  timezone: String,
  describeWork: String,
  helpOption: Number,
  isOnboardingProcessCompleted: Boolean,
  addresses: [
    {
      addressType: String,
      streetAddress: String,
      line2: String,
      city: String,
      state: String,
      country: String,
      zipCode: String,
    },
  ],
});

const userSchema = new Schema<IUser>({
  authType: {
    type: String,
    enum: ['local', 'google', 'microsoft', 'apple'],
  },
  email: { type: String, required: true },
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  isEmailVerified: Boolean,
  isSignupProcessCompleted: Boolean,
  isDeactivated: {
    type: Boolean,
    default: false,
  },
  profile: { type: mongoose.Schema.Types.ObjectId, ref: 'userProfileSchema' },
  createdAt: Date,
  updatedAt: Date,
});

// Create models for related data
const UserPrfileModel = mongoose.model<IUserProfile>(
  'UserProfile',
  userProfileSchema,
);

userSchema.plugin(toJSON);
const UsersModel = mongoose.model<IUser>('users', userSchema);

export default UsersModel;

export { UserPrfileModel };
