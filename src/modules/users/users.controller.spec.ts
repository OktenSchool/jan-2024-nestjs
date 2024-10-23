import { Test } from '@nestjs/testing';

import { UserMock } from '../../../test/models/user.mock';
import { UserEntity } from '../../database/entities/user.entity';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { userMockProviders } from './__mocks__/users.module';
import { UserResDto } from './dto/res/user.res.dto';
import { UserMapper } from './user.mapper';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe(UsersController.name, () => {
  let usersController: UsersController;
  let mockUsersService: UsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [...userMockProviders],
    }).compile();
    usersController = module.get<UsersController>(UsersController);

    mockUsersService = module.get<UsersService>(UsersService);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('findMe', () => {
    it('should return user', async () => {
      const userResDto: UserResDto = UserMock.toResponseDTO();
      const userData: IUserData = UserMock.userData();
      const userEntity: UserEntity = UserMock.userEntity();

      jest.spyOn(mockUsersService, 'findMe').mockResolvedValue(userEntity);
      jest.spyOn(UserMapper, 'toResponseDTO').mockReturnValue(userResDto);

      const result = await usersController.findMe(userData);

      expect(result).toEqual(userResDto);
    });
  });
});
