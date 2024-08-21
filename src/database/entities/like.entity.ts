import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { ArticleEntity } from './article.entity';
import { CreateUpdateModel } from './models/create-update.model';
import { UserEntity } from './user.entity';

@Entity('likes')
export class LikeEntity extends CreateUpdateModel {
  @Column()
  user_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.likes)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @Column()
  article_id: string;
  @ManyToOne(() => ArticleEntity, (entity) => entity.likes)
  @JoinColumn({ name: 'article_id' })
  article?: ArticleEntity;
}
