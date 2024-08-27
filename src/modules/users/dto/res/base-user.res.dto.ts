export class BaseUserResDto {
  id: string;

  name: string;

  email: string;

  bio?: string;

  image?: string;

  createdAt: Date;

  updatedAt: Date;
}
