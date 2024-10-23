import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, In } from 'typeorm';

import { ArticleEntity } from '../../../database/entities/article.entity';
import { TagEntity } from '../../../database/entities/tag.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { ArticleRepository } from '../../repository/services/article.repository';
import { LikeRepository } from '../../repository/services/like.repository';
import { ArticleListQueryDto } from '../dto/req/article-list.query.dto';
import { CreateArticleReqDto } from '../dto/req/create-article.req.dto';
import { UpdateArticleReqDto } from '../dto/req/update-article.req.dto';

@Injectable()
export class ArticleService {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly likeRepository: LikeRepository,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  public async getList(
    userData: IUserData,
    query: ArticleListQueryDto,
  ): Promise<[ArticleEntity[], number]> {
    return await this.articleRepository.getList(userData.userId, query);
  }

  public async create(
    userData: IUserData,
    dto: CreateArticleReqDto,
  ): Promise<ArticleEntity> {
    return await this.entityManager.transaction('SERIALIZABLE', async (em) => {
      const articleRepository = em.getRepository(ArticleEntity);
      const tags = await this.createTags(dto.tags, em);

      await this.articleRepository.getById('sdg', 'sdf', em);
      // console.log(tags)
      // throw new Error('sdf');

      return await articleRepository.save(
        this.articleRepository.create({
          ...dto,
          user_id: userData.userId,
          tags,
        }),
      );
    });
  }

  public async getById(
    userData: IUserData,
    articleId: string,
  ): Promise<ArticleEntity> {
    return await this.articleRepository.getById(userData.userId, articleId);
  }

  public async update(
    userData: IUserData,
    articleId: string,
    dto: UpdateArticleReqDto,
  ): Promise<any> {
    return `This action updates a #${articleId} car`;
  }

  public async like(
    userData: IUserData,
    articleId: string,
  ): Promise<ArticleEntity> {
    await this.checkIsArticleExistOrThrow(articleId);

    const like = await this.likeRepository.findOneBy({
      article_id: articleId,
      user_id: userData.userId,
    });
    if (like) {
      throw new ConflictException('Already liked');
    }
    await this.likeRepository.save(
      this.likeRepository.create({
        article_id: articleId,
        user_id: userData.userId,
      }),
    );
    return await this.articleRepository.getById(userData.userId, articleId);
  }

  public async unlike(
    userData: IUserData,
    articleId: string,
  ): Promise<ArticleEntity> {
    await this.checkIsArticleExistOrThrow(articleId);
    const like = await this.likeRepository.findOneBy({
      article_id: articleId,
      user_id: userData.userId,
    });
    if (!like) {
      throw new ConflictException('Not liked yet');
    }
    await this.likeRepository.remove(like);
    return await this.articleRepository.getById(userData.userId, articleId);
  }

  private async checkIsArticleExistOrThrow(articleId: string): Promise<void> {
    const article = await this.articleRepository.findOneBy({ id: articleId });
    if (!article) {
      throw new NotFoundException('Article not found');
    }
  }

  private async createTags(
    tags: string[],
    em: EntityManager,
  ): Promise<TagEntity[]> {
    const tagRepository = em.getRepository(TagEntity);
    if (!tags || tags.length === 0) return [];

    const entities = await tagRepository.findBy({ name: In(tags) });
    const existingTags = entities.map((entity) => entity.name);
    const newTags = tags.filter((tag) => !existingTags.includes(tag));
    const newEntities = await tagRepository.save(
      newTags.map((tag) => tagRepository.create({ name: tag })),
    );
    return [...entities, ...newEntities];
  }
}
