import { UserEntity } from '../../database/entities/user.entity';
import { IJwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { UserResDto } from './dto/res/user.res.dto';

export class UserMapper {
  public static toResponseDTO(data: UserEntity): UserResDto {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      image: data.image,
      bio: data.bio,
    };
  }

  public static toIUserData(user: UserEntity, payload: IJwtPayload): IUserData {
    return {
      userId: payload.userId,
      deviceId: payload.deviceId,
      email: user.email,
    };
  }
}
