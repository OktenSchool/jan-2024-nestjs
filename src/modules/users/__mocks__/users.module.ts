import { Provider } from '@nestjs/common';

import { authCacheServiceMock } from '../../auth/__mocks__/auth-cache.service';
import { AuthCacheService } from '../../auth/services/auth-cache.service';
import { fileStorageServiceMock } from '../../file-storage/__mocks__/file-storage.service';
import { FileStorageService } from '../../file-storage/services/file-storage.service';
import { loggerServiceMock } from '../../logger/__mocks__/logger.service';
import { LoggerService } from '../../logger/logger.service';
import { followRepositoryMock } from '../../repository/__mocks__/follow.repository';
import { userRepositoryMock } from '../../repository/__mocks__/user.repository';
import { FollowRepository } from '../../repository/services/follow.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UsersService } from '../users.service';
import { usersServiceMock } from './users.service';

export const userMockProviders: Provider[] = [
  {
    provide: UsersService,
    useValue: usersServiceMock,
  },
  {
    provide: FileStorageService,
    useValue: fileStorageServiceMock,
  },
  {
    provide: LoggerService,
    useValue: loggerServiceMock,
  },
  {
    provide: UserRepository,
    useValue: userRepositoryMock,
  },
  {
    provide: AuthCacheService,
    useValue: authCacheServiceMock,
  },
  {
    provide: FollowRepository,
    useValue: followRepositoryMock,
  },
];
