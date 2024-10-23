import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueForLikes1725473560407 implements MigrationInterface {
    name = 'AddUniqueForLikes1725473560407'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_9769b295a8d670435ce210ba15" ON "refresh_tokens" ("deviceId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_9769b295a8d670435ce210ba15"`);
    }

}
