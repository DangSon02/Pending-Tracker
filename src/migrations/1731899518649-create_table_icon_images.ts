import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableIconImages1731899518649 implements MigrationInterface {
    name = 'CreateTableIconImages1731899518649'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tbl_icon_images\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`icon_url\` varchar(255) NOT NULL, \`icon_type_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tbl_icon_images\` ADD CONSTRAINT \`FK_73bfa948ba1c161ed1062d44b31\` FOREIGN KEY (\`icon_type_id\`) REFERENCES \`tbl_icon_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_icon_images\` DROP FOREIGN KEY \`FK_73bfa948ba1c161ed1062d44b31\``);
        await queryRunner.query(`DROP TABLE \`tbl_icon_images\``);
    }

}
