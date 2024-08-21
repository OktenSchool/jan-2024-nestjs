import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBaseTables1724261579477 implements MigrationInterface {
    name = 'AddBaseTables1724261579477'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "likes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, "article_id" uuid NOT NULL, CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "articles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "title" text NOT NULL, "description" text NOT NULL, "body" text NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refresh_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "refreshToken" text NOT NULL, "deviceId" text NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_7d8bee0204106019488c4c50ffa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "articles_tags_tags" ("articlesId" uuid NOT NULL, "tagsId" uuid NOT NULL, CONSTRAINT "PK_bee9492f5e2157b6dc27fd510bd" PRIMARY KEY ("articlesId", "tagsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0adb8d108330d74e4a7f7d29de" ON "articles_tags_tags" ("articlesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_dcd523dc6473a35e6cb0cbf9f2" ON "articles_tags_tags" ("tagsId") `);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isVerified"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "age"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "created" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updated" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "bio" text`);
        await queryRunner.query(`ALTER TABLE "users" ADD "image" text`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_3f519ed95f775c781a254089171" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_0deaa79a910af56b33472c90ee0" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_87bb15395540ae06337a486a77a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "articles_tags_tags" ADD CONSTRAINT "FK_0adb8d108330d74e4a7f7d29de2" FOREIGN KEY ("articlesId") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "articles_tags_tags" ADD CONSTRAINT "FK_dcd523dc6473a35e6cb0cbf9f2d" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles_tags_tags" DROP CONSTRAINT "FK_dcd523dc6473a35e6cb0cbf9f2d"`);
        await queryRunner.query(`ALTER TABLE "articles_tags_tags" DROP CONSTRAINT "FK_0adb8d108330d74e4a7f7d29de2"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_87bb15395540ae06337a486a77a"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_0deaa79a910af56b33472c90ee0"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_3f519ed95f775c781a254089171"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "bio"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" text`);
        await queryRunner.query(`ALTER TABLE "users" ADD "age" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isVerified" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dcd523dc6473a35e6cb0cbf9f2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0adb8d108330d74e4a7f7d29de"`);
        await queryRunner.query(`DROP TABLE "articles_tags_tags"`);
        await queryRunner.query(`DROP TABLE "refresh_tokens"`);
        await queryRunner.query(`DROP TABLE "articles"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP TABLE "likes"`);
    }

}
