import { UserEntity } from '../../database/entities/user.entity';
import { UserResDto } from './dto/res/user.res.dto';

export class UserMapper {
  public static toResponseDTO(data: UserEntity): UserResDto {
    return { ...data };
  }

  public static toIUserData(user: UserEntity, payload: any): any {
    return {
      userId: payload.userId,
      deviceId: payload.deviceId,
      email: user.email,
    };
  }
}
