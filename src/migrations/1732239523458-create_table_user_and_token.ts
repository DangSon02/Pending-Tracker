import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUserAndToken1732239523458 implements MigrationInterface {
    name = 'CreateTableUserAndToken1732239523458'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tbl_refresh_tokens\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`refresh_token\` varchar(255) NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`expires_at\` datetime NOT NULL, \`user_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_session\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`sessionToken\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`expires_at\` datetime NOT NULL, \`user_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_users\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`fisrt_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tbl_refresh_tokens\` ADD CONSTRAINT \`FK_cdc9043779337a9447b5f93f0cb\` FOREIGN KEY (\`user_id\`) REFERENCES \`tbl_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_session\` ADD CONSTRAINT \`FK_766d800da01ee3eec6389c75215\` FOREIGN KEY (\`user_id\`) REFERENCES \`tbl_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_session\` DROP FOREIGN KEY \`FK_766d800da01ee3eec6389c75215\``);
        await queryRunner.query(`ALTER TABLE \`tbl_refresh_tokens\` DROP FOREIGN KEY \`FK_cdc9043779337a9447b5f93f0cb\``);
        await queryRunner.query(`DROP TABLE \`tbl_users\``);
        await queryRunner.query(`DROP TABLE \`tbl_session\``);
        await queryRunner.query(`DROP TABLE \`tbl_refresh_tokens\``);
    }

}
