import { Column, Entity, ManyToMany } from 'typeorm';

import { ArticleEntity } from './article.entity';
import { CreateUpdateModel } from './models/create-update.model';

@Entity('tags')
export class TagEntity extends CreateUpdateModel {
  @Column('text')
  name: string;

  @ManyToMany(() => ArticleEntity, (entity) => entity.tags)
  articles?: ArticleEntity[];
}
