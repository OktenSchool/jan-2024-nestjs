import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';

import { ArticleEntity } from '../../../database/entities/article.entity';
import { TagEntity } from '../../../database/entities/tag.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { ArticleRepository } from '../../repository/services/article.repository';
import { TagRepository } from '../../repository/services/tag.repository';
import { CreateArticleReqDto } from '../dto/req/create-article.req.dto';
import { UpdateArticleReqDto } from '../dto/req/update-article.req.dto';

@Injectable()
export class ArticleService {
  constructor(
    private readonly tagRepository: TagRepository,
    private readonly articleRepository: ArticleRepository,
  ) {}

  public async create(
    userData: IUserData,
    dto: CreateArticleReqDto,
  ): Promise<ArticleEntity> {
    const tags = await this.createTags(dto.tags);

    return await this.articleRepository.save(
      this.articleRepository.create({
        ...dto,
        user_id: userData.userId,
        tags,
      }),
    );
  }

  public async update(
    userData: IUserData,
    articleId: string,
    dto: UpdateArticleReqDto,
  ): Promise<any> {
    return `This action updates a #${articleId} car`;
  }

  private async createTags(tags: string[]): Promise<TagEntity[]> {
    if (!tags || tags.length === 0) return [];

    const entities = await this.tagRepository.findBy({ name: In(tags) });
    const existingTags = entities.map((entity) => entity.name);
    const newTags = tags.filter((tag) => !existingTags.includes(tag));
    const newEntities = await this.tagRepository.save(
      newTags.map((tag) => this.tagRepository.create({ name: tag })),
    );
    return [...entities, ...newEntities];
  }
}
