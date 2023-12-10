import _ from 'lodash';
import { login, signup, logout } from '@/services/auth/auth.service';
import { UsersModel } from '@/models/index';
import BlackListedTokensModel from '@/models/blacklisted-tokens.model';
import ApiError from '@/utils/api-error';
import * as bcryptModule from '@/utils/bcrypt';
import * as tokenModule from '@/utils/jwt';

jest.mock('@/models/index');
jest.mock('@/models/blacklisted-tokens.model');
jest.mock('@/utils/bcrypt');
jest.mock('@/utils/jwt');

describe('Auth Services', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('login should return user data and token', async () => {
    const payload = {
      email: 'test@example.com',
      password: 'password123',
    };

    const user = {
      _id: 'user123',
      email: payload.email,
      password: 'hashedPassword',
      isDeactivated: false,
      authType: 'local',
    };

    const mockFindOne = jest
      .spyOn(UsersModel, 'findOne')
      .mockResolvedValue(user);
    const mockCompareString = jest
      .spyOn(bcryptModule, 'compareString')
      .mockResolvedValue(true);
    const mockOmit = jest.spyOn(_, 'omit').mockReturnValue(user);
    const mockSignToken = jest
      .spyOn(tokenModule, 'signToken')
      .mockReturnValue('mockToken');

    const result = await login(payload);

    expect(mockFindOne).toHaveBeenCalledWith({ email: payload.email });
    expect(mockCompareString).toHaveBeenCalledWith(
      payload.password,
      user.password,
    );
    expect(mockOmit).toHaveBeenCalledWith(user, ['password']);
    expect(mockSignToken).toHaveBeenCalledWith({
      id: user._id,
      email: user.email,
    });
    expect(result).toEqual({
      result: user,
      token: 'mockToken',
    });
  });

  test('login should throw ApiError if user is not found', async () => {
    const payload = {
      email: 'test@example.com',
      password: 'password123',
    };

    jest.spyOn(UsersModel, 'findOne').mockResolvedValue(null);

    try {
      await login(payload);
      // If login doesn't throw an error, fail the test
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
    }
  });

  test('signup should create a new user and return user data and token', async () => {
    const payload = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'password123',
    };

    const hashedPassword = 'hashedPassword';
    jest.spyOn(bcryptModule, 'encryptString').mockResolvedValue(hashedPassword);

    const newUser = {
      _id: 'user123',
      firstName: 'Test',
      lastName: 'User',
      email: payload.email,
      password: hashedPassword,
      isSignupProcessCompleted: true,
      isEmailVerified: false,
      authType: 'local',
      // Mock toJSON method
      toJSON: jest.fn().mockReturnValue({
        id: '6574d8deaadc99cd1e9f6089',
        authType: 'local',
        email: 'stephenignatiusbiz@gmail.com',
        firstName: 'Stephen',
        lastName: 'IG',
        isEmailVerified: false,
        isSignupProcessCompleted: true,
        isDeactivated: false,
      }),
    };

    // Mock the behavior of save() to return the new user object
    const mockSave = jest.fn().mockResolvedValue(newUser);
    // Update the mock implementation for the UsersModel
    const MockedUsersModel = UsersModel as unknown as jest.Mock;
    MockedUsersModel.mockImplementation(() => ({
      save: mockSave,
      toJSON: newUser.toJSON, // Mock the toJSON method
    }));

    jest.spyOn(tokenModule, 'signToken').mockReturnValue('mockToken');

    const result = await signup(payload);

    // Ensure that save() was called with the expected data
    expect(mockSave).toHaveBeenCalledWith();

    // Ensure toJSON is called on the newUser object
    expect(newUser.toJSON).toHaveBeenCalledWith();

    expect(result).toEqual({
      newUser: newUser.toJSON(),
      token: 'mockToken',
    });
  });

  test('logout should add token to blacklist', async () => {
    const token = 'userToken';
    jest
      .spyOn(BlackListedTokensModel.prototype, 'save')
      .mockResolvedValue({ token });

    await logout(token);

    expect(BlackListedTokensModel.prototype.save).toHaveBeenCalledWith();
  });
});
