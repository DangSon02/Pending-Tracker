import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableCategoryExpense1732069115334 implements MigrationInterface {
    name = 'CreateTableCategoryExpense1732069115334'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tbl_category_expense\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`icon_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tbl_category_expense\` ADD CONSTRAINT \`FK_d973aaef20eeaeadb084c68042c\` FOREIGN KEY (\`icon_id\`) REFERENCES \`tbl_icon_images\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_category_expense\` DROP FOREIGN KEY \`FK_d973aaef20eeaeadb084c68042c\``);
        await queryRunner.query(`DROP TABLE \`tbl_category_expense\``);
    }

}
