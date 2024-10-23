import { MockServiceType } from '../../../../test/types/mock-service.type';
import { AuthCacheService } from '../services/auth-cache.service';

export const authCacheServiceMock: MockServiceType<AuthCacheService> = {
  saveToken: jest.fn(),
  isAccessTokenExist: jest.fn(),
  deleteToken: jest.fn(),
};
