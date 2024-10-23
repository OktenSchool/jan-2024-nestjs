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
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { ArticleListQueryDto } from './dto/req/article-list.query.dto';
import { CreateArticleReqDto } from './dto/req/create-article.req.dto';
import { UpdateArticleReqDto } from './dto/req/update-article.req.dto';
import { ArticleResDto } from './dto/res/article.res.dto';
import { ArticleListResDto } from './dto/res/article-list.res.dto';
import { ArticleMapper } from './services/article.mapper';
import { ArticleService } from './services/article.service';

@ApiBearerAuth()
@ApiTags('Article')
@Controller('articles')
export class ArticleController {
  constructor(private readonly service: ArticleService) {}

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get()
  public async getList(
    @CurrentUser() userData: IUserData,
    @Query() query: ArticleListQueryDto,
  ): Promise<ArticleListResDto> {
    const [entities, total] = await this.service.getList(userData, query);
    return ArticleMapper.toResponseListDTO(entities, total, query);
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post()
  public async create(
    @CurrentUser() userData: IUserData,
    @Body() dto: CreateArticleReqDto,
  ): Promise<ArticleResDto> {
    const result = await this.service.create(userData, dto);
    return ArticleMapper.toResponseDTO(result);
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Get(':articleId')
  public async getById(
    @CurrentUser() userData: IUserData,
    @Param('articleId') articleId: string,
  ): Promise<ArticleResDto> {
    const result = await this.service.getById(userData, articleId);
    return ArticleMapper.toResponseDTO(result);
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Patch(':articleId')
  public async update(
    @CurrentUser() userData: IUserData,
    @Param('articleId') articleId: string,
    @Body() dto: UpdateArticleReqDto,
  ): Promise<ArticleResDto> {
    return await this.service.update(userData, articleId, dto);
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Post(':articleId/like')
  public async like(
    @CurrentUser() userData: IUserData,
    @Param('articleId') articleId: string,
  ): Promise<ArticleResDto> {
    const result = await this.service.like(userData, articleId);
    return ArticleMapper.toResponseDTO(result);
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Delete(':articleId/like')
  public async unlike(
    @CurrentUser() userData: IUserData,
    @Param('articleId') articleId: string,
  ): Promise<ArticleResDto> {
    const result = await this.service.unlike(userData, articleId);
    return ArticleMapper.toResponseDTO(result);
  }
}
