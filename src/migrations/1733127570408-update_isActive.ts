import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateIsActive1733127570408 implements MigrationInterface {
    name = 'UpdateIsActive1733127570408'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_refresh_tokens\` ADD \`is_active\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`tbl_session\` ADD \`isActive\` tinyint NOT NULL DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_session\` DROP COLUMN \`isActive\``);
        await queryRunner.query(`ALTER TABLE \`tbl_refresh_tokens\` DROP COLUMN \`is_active\``);
    }

}
