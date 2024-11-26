import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateColumDescInTblIconType1731929215800 implements MigrationInterface {
    name = 'UpdateColumDescInTblIconType1731929215800'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_icon_type\` CHANGE \`desc\` \`decription\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tbl_icon_type\` DROP COLUMN \`decription\``);
        await queryRunner.query(`ALTER TABLE \`tbl_icon_type\` ADD \`decription\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_icon_type\` DROP COLUMN \`decription\``);
        await queryRunner.query(`ALTER TABLE \`tbl_icon_type\` ADD \`decription\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tbl_icon_type\` CHANGE \`decription\` \`desc\` varchar(255) NOT NULL`);
    }

}
