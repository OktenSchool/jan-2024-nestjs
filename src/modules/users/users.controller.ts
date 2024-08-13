import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateUserDto } from './dto/req/create-user.dto';
import { UpdateUserDto } from './dto/req/update-user.dto';
import { PrivateUserResDto } from './dto/res/private-user.res.dto';
import { PublicUserResDto } from './dto/res/public-user.res.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiCreatedResponse({ type: PrivateUserResDto })
  @Post()
  public async create(
    @Req() req: Request,
    @Body() dto: CreateUserDto,
  ): Promise<any> {
    return await this.usersService.create(dto);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: PrivateUserResDto })
  @Get('me')
  public async findMe(): Promise<any> {
    return await this.usersService.findMe(1);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: PrivateUserResDto })
  @Patch('me')
  public async updateMe(@Body() dto: UpdateUserDto): Promise<any> {
    return await this.usersService.updateMe(1, dto);
  }

  @ApiBearerAuth()
  @ApiNoContentResponse({ description: 'User has been removed' })
  @Delete('me')
  public async removeMe(): Promise<any> {
    return await this.usersService.removeMe(1);
  }

  @ApiOkResponse({ type: PublicUserResDto })
  @Get(':userId')
  public async findOne(@Param('userId') userId: string): Promise<any> {
    return await this.usersService.findOne(+userId);
  }
}
