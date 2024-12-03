import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteIsActive1733126896952 implements MigrationInterface {
    name = 'DeleteIsActive1733126896952'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_refresh_tokens\` DROP COLUMN \`is_active\``);
        await queryRunner.query(`ALTER TABLE \`tbl_session\` DROP COLUMN \`isActive\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_session\` ADD \`isActive\` tinyint NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`tbl_refresh_tokens\` ADD \`is_active\` tinyint NOT NULL DEFAULT '1'`);
    }

}
