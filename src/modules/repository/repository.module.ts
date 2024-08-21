import { Global, Module } from '@nestjs/common';

import { ArticleRepository } from './services/article.repository';
import { UserRepository } from './services/user.repository';

const repositories = [ArticleRepository, UserRepository];

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: repositories,
  exports: repositories,
})
export class RepositoryModule {}
