import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreatePostDto } from './dto/req/create-post.dto';
import { UpdatePostDto } from './dto/req/update-post.dto';
import { PostsService } from './posts.service';
import {PostsListReqDto} from "./dto/req/posts-list.req.dto";

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly carsService: PostsService) {}

  @Post()
  create(@Body() createCarDto: CreatePostDto) {
    return this.carsService.create(createCarDto);
  }

  @Get()
  findAll(@Query() query: PostsListReqDto) {
    return this.carsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarDto: UpdatePostDto) {
    return this.carsService.update(+id, updateCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carsService.remove(+id);
  }
}
