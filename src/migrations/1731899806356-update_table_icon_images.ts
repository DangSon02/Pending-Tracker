import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTableIconImages1731899806356 implements MigrationInterface {
    name = 'UpdateTableIconImages1731899806356'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_icon_images\` ADD \`icon_name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tbl_icon_type\` ADD \`desc\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_icon_type\` DROP COLUMN \`desc\``);
        await queryRunner.query(`ALTER TABLE \`tbl_icon_images\` DROP COLUMN \`icon_name\``);
    }

}
