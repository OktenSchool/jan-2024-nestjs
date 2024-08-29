import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { CreateArticleReqDto } from './dto/req/create-article.req.dto';
import { UpdateArticleReqDto } from './dto/req/update-article.req.dto';
import { ArticleResDto } from './dto/res/article.res.dto';
import { ArticleMapper } from './services/article.mapper';
import { ArticleService } from './services/article.service';

@ApiTags('Article')
@Controller('articles')
export class ArticleController {
  constructor(private readonly service: ArticleService) {}

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post()
  public async create(
    @CurrentUser() userData: IUserData,
    @Body() dto: CreateArticleReqDto,
  ): Promise<ArticleResDto> {
    const result = await this.service.create(userData, dto);
    return ArticleMapper.toResponseDTO(result);
  }

  @ApiBearerAuth()
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
}
