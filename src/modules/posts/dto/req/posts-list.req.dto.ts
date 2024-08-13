import { ApiProperty } from '@nestjs/swagger';

export class PostsListReqDto {
  @ApiProperty({
    example: 1,
    description: 'The page number',
    required: false,
  })
  page: number;

  @ApiProperty({
    example: 10,
    description: 'The limit of items per page',
    required: false,
  })
  limit: number;

  @ApiProperty({
    example: 'search',
    description: 'The search query',
    required: false,
  })
  search: string;

  @ApiProperty({
    example: 'asc',
    description: 'The sort order',
    required: false,
  })
  sort: string;

  @ApiProperty({
    example: 'id',
    description: 'The field to order by',
    required: false,
  })
  order: string;

  @ApiProperty({
    example: 'id',
    description: 'The field to order by',
    required: false,
  })
  orderBy: string;
}