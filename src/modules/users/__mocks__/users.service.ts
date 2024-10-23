import { MockServiceType } from '../../../../test/types/mock-service.type';
import { UsersService } from '../users.service';

export const usersServiceMock: MockServiceType<UsersService> = {
  findMe: jest.fn(),
  updateMe: jest.fn(),
  removeMe: jest.fn(),
  findOne: jest.fn(),
  follow: jest.fn(),
  unfollow: jest.fn(),
  isEmailExistOrThrow: jest.fn(),
  uploadAvatar: jest.fn(),
  deleteAvatar: jest.fn(),
};
