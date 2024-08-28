import { ConflictException, Injectable } from '@nestjs/common';

import { UserEntity } from '../../database/entities/user.entity';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { LoggerService } from '../logger/logger.service';
import { PostsService } from '../posts/posts.service';
import { UserRepository } from '../repository/services/user.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly carsService: PostsService,
    private readonly logger: LoggerService,
    private readonly userRepository: UserRepository,
  ) {}

  public async findAll(): Promise<any> {
    return `This action returns all users`;
  }

  public async findMe(userData: IUserData): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ id: userData.userId });
  }

  public async updateMe(userData: IUserData, dto: any): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userData.userId });
    this.userRepository.merge(user, dto);
    return await this.userRepository.save(user);
  }

  public async removeMe(id: number): Promise<any> {
    return `This action removes a #${id} user`;
  }

  public async findOne(id: number): Promise<any> {
    return `This action returns a #${id} user`;
  }

  public async isEmailExistOrThrow(email: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new ConflictException('Email already exists');
    }
  }
}
