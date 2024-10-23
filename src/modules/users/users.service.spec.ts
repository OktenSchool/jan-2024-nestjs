import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { UserMock } from '../../../test/models/user.mock';
import { UserEntity } from '../../database/entities/user.entity';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { AuthCacheService } from '../auth/services/auth-cache.service';
import { FileStorageService } from '../file-storage/services/file-storage.service';
import { LoggerService } from '../logger/logger.service';
import { FollowRepository } from '../repository/services/follow.repository';
import { UserRepository } from '../repository/services/user.repository';
import { userMockProviders } from './__mocks__/users.module';
import { UsersService } from './users.service';

describe(UsersService.name, () => {
  let service: UsersService;

  let mockFileStorageService: FileStorageService;
  let mockLogger: LoggerService;
  let mockUserRepository: UserRepository;
  let mockAuthCacheService: AuthCacheService;
  let mockFollowRepository: FollowRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [...userMockProviders, UsersService],
    }).compile();
    service = module.get<UsersService>(UsersService);

    mockFileStorageService = module.get<FileStorageService>(FileStorageService);
    mockLogger = module.get<LoggerService>(LoggerService);
    mockUserRepository = module.get<UserRepository>(UserRepository);
    mockAuthCacheService = module.get<AuthCacheService>(AuthCacheService);
    mockFollowRepository = module.get<FollowRepository>(FollowRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findMe', () => {
    it('should return user', async () => {
      const userData: IUserData = UserMock.userData();
      const userEntity: UserEntity = UserMock.userEntity();

      jest.spyOn(mockUserRepository, 'findOneBy').mockResolvedValue(userEntity);

      const result = await service.findMe(userData);

      expect(mockUserRepository.findOneBy).toHaveBeenNthCalledWith(1, {
        id: userData.userId,
      });
      expect(result).toBe(userEntity);
      expect(result.email).toBe(userEntity.email);
    });
  });

  describe('follow', () => {
    const userData = UserMock.userData();
    const userEntity = UserMock.userEntity();

    it('should throw ConflictException when user tries to follow himself', async () => {
      await expect(service.follow(userData, userData.userId)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should throw NotFoundConflictExceptionException', async () => {
      jest.spyOn(mockUserRepository, 'findOneBy').mockResolvedValue(null);
      await expect(service.follow(userData, 'testID')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should follow user', async () => {
      jest.spyOn(mockUserRepository, 'findOneBy').mockResolvedValue(userEntity);
      jest.spyOn(mockFollowRepository, 'save').mockResolvedValue(null);

      await service.follow(userData, 'testID');

      expect(mockUserRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(mockFollowRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(mockFollowRepository.save).toHaveBeenCalledTimes(1);
    });
  });
});
