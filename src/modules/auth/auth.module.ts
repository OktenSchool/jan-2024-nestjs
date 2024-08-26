import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { RedisModule } from '../redis/redis.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { AuthCacheService } from './services/auth-cache.service';
import { TokenService } from './services/token.service';

@Module({
  imports: [JwtModule, RedisModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService, TokenService, AuthCacheService],
  exports: [],
})
export class AuthModule {}
