import { UserEntity } from '../../src/database/entities/user.entity';
import { IUserData } from '../../src/modules/auth/interfaces/user-data.interface';
import { UserResDto } from '../../src/modules/users/dto/res/user.res.dto';

export class UserMock {
  static userData(properties?: Partial<IUserData>): IUserData {
    return {
      userId: 'testId',
      email: 'test@mail.com',
      deviceId: 'testDeviceId',
      ...(properties || {}),
    };
  }

  static userEntity(properties?: Partial<UserEntity>): UserEntity {
    return {
      id: 'testId',
      email: 'test@mail.com',
      image: 'testImage',
      name: 'testName',
      password: 'testPassword',
      created: new Date('2021-01-01'),
      updated: new Date('2021-01-01'),
      bio: 'testBio',
      ...(properties || {}),
    };
  }

  static toResponseDTO(properties?: Partial<UserResDto>): UserResDto {
    return {
      id: 'testId',
      email: 'test@mail.com',
      image: 'https://example-bucket-url.com/testImage',
      name: 'testName',
      bio: 'testBio',
      isFollowed: false,
      ...(properties || {}),
    };
  }
}
