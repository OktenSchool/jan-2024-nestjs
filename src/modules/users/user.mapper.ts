import { ConfigStaticService } from '../../config/config-static';
import { UserEntity } from '../../database/entities/user.entity';
import { IJwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { UserResDto } from './dto/res/user.res.dto';

export class UserMapper {
  public static toResponseDTO(data: UserEntity): UserResDto {
    const awsConfig = ConfigStaticService.get().aws;
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      image: data.image ? `${awsConfig.bucketUrl}/${data.image}` : null,
      bio: data.bio,
      isFollowed: data.followings?.length > 0 || false,
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
