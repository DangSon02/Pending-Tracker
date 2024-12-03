import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateNameTableSessiontoken1733128172900 implements MigrationInterface {
    name = 'UpdateNameTableSessiontoken1733128172900'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_session\` CHANGE \`sessionToken\` \`access_token\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tbl_session\` DROP COLUMN \`access_token\``);
        await queryRunner.query(`ALTER TABLE \`tbl_session\` ADD \`access_token\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_session\` DROP COLUMN \`access_token\``);
        await queryRunner.query(`ALTER TABLE \`tbl_session\` ADD \`access_token\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tbl_session\` CHANGE \`access_token\` \`sessionToken\` varchar(255) NOT NULL`);
    }

}
