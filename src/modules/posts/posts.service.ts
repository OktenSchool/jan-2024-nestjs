import { Injectable } from '@nestjs/common';

import { CreatePostDto } from './dto/req/create-post.dto';
import { UpdatePostDto } from './dto/req/update-post.dto';
import {PostsListReqDto} from "./dto/req/posts-list.req.dto";

@Injectable()
export class PostsService {
  create(createCarDto: CreatePostDto) {
    return 'This action adds a new car';
  }

  findAll(query: PostsListReqDto) {
    return `This action returns all cars`;
  }

  findOne(id: number) {
    return `This action returns a #${id} car`;
  }

  update(id: number, updateCarDto: UpdatePostDto) {
    return `This action updates a #${id} car`;
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
}
