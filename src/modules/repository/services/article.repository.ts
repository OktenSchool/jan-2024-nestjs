import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';

import { ArticleEntity } from '../../../database/entities/article.entity';
import { ArticleListQueryDto } from '../../article/dto/req/article-list.query.dto';

@Injectable()
export class ArticleRepository extends Repository<ArticleEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ArticleEntity, dataSource.manager);
  }

  public async getList(
    userId: string,
    query: ArticleListQueryDto,
  ): Promise<[ArticleEntity[], number]> {
    const qb = this.createQueryBuilder('article');

    qb.leftJoinAndSelect('article.tags', 'tag');
    qb.leftJoinAndSelect('article.user', 'user');
    qb.leftJoinAndSelect('article.likes', 'like', 'like.user_id = :userId');
    qb.leftJoinAndSelect(
      'user.followings',
      'following',
      'following.follower_id = :userId',
    );
    qb.setParameter('userId', userId);

    if (query.search) {
      qb.andWhere('CONCAT(article.title, article.description) ILIKE :search');
      qb.setParameter('search', `%${query.search}%`);
    }

    if (query.tag) {
      qb.andWhere('tag.name = :tag');
      qb.setParameter('tag', query.tag);
    }

    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }

  public async getById(
    userId: string,
    articleId: string,
    em?: EntityManager,
  ): Promise<ArticleEntity> {
    const repo = em ? em.getRepository(ArticleEntity) : this;
    const qb = repo.createQueryBuilder('article');

    qb.leftJoinAndSelect('article.tags', 'tag');
    qb.leftJoinAndSelect('article.user', 'user');
    qb.leftJoinAndSelect('article.likes', 'like', 'like.user_id = :userId');
    qb.leftJoinAndSelect(
      'user.followings',
      'following',
      'following.follower_id = :userId',
    );
    qb.setParameter('userId', userId);

    qb.andWhere('article.id = :articleId', { articleId });

    return await qb.getOneOrFail();
  }
}
