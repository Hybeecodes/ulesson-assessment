import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOtherTables1702863408909 implements MigrationInterface {
    name = 'CreateOtherTables1702863408909'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_courses\` (\`id\` varchar(36) NOT NULL, \`deleted_at\` timestamp NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user id\` varchar(36) NULL, \`course id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`notes\` (\`id\` varchar(36) NOT NULL, \`deleted_at\` timestamp NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`content\` text NOT NULL, \`timestamp_in_seconds\` varchar(255) NOT NULL, \`lesson id\` varchar(36) NULL, \`user id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`quiz_questions\` (\`id\` varchar(36) NOT NULL, \`deleted_at\` timestamp NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`quiz_id\` varchar(255) NOT NULL, \`text\` text NOT NULL, \`options\` json NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`quizzes\` (\`id\` varchar(36) NOT NULL, \`deleted_at\` timestamp NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`image_url\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`lesson_quizzes\` (\`id\` varchar(36) NOT NULL, \`deleted_at\` timestamp NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`lesson_id\` varchar(255) NOT NULL, \`quiz_id\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_15a35121186be720d59cde2412\` (\`lesson_id\`, \`quiz_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`lessons\` (\`id\` varchar(36) NOT NULL, \`deleted_at\` timestamp NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`image_url\` varchar(255) NULL, \`video_url\` varchar(255) NOT NULL, \`group id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`lesson_groups\` (\`id\` varchar(36) NOT NULL, \`deleted_at\` timestamp NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`image_url\` varchar(255) NULL, \`chapter_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`chapters\` (\`id\` varchar(36) NOT NULL, \`deleted_at\` timestamp NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`image_url\` varchar(255) NULL, \`course_id\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`courses\` (\`id\` varchar(36) NOT NULL, \`deleted_at\` timestamp NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`image_url\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_lessons\` (\`id\` varchar(36) NOT NULL, \`deleted_at\` timestamp NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` varchar(255) NOT NULL, \`lesson_id\` varchar(255) NOT NULL, \`is_completed\` tinyint NOT NULL DEFAULT 0, \`current_timestamp\` int NOT NULL DEFAULT '0', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_courses\` ADD CONSTRAINT \`FK_b9d27ba9648ac2cd59bcccdac17\` FOREIGN KEY (\`user id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_courses\` ADD CONSTRAINT \`FK_a0b1f1c542f6fc1d11496a1b1c1\` FOREIGN KEY (\`course id\`) REFERENCES \`courses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notes\` ADD CONSTRAINT \`FK_8cd6944c342b0aa92b67e0093df\` FOREIGN KEY (\`lesson id\`) REFERENCES \`lessons\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notes\` ADD CONSTRAINT \`FK_454cce45958a7fb47507080ece7\` FOREIGN KEY (\`user id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`quiz_questions\` ADD CONSTRAINT \`FK_14c6d2b8f5be0bdb406a3895bb4\` FOREIGN KEY (\`quiz_id\`) REFERENCES \`quizzes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lesson_quizzes\` ADD CONSTRAINT \`FK_76602072f90b62d3c901177bd7d\` FOREIGN KEY (\`lesson_id\`) REFERENCES \`lessons\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lesson_quizzes\` ADD CONSTRAINT \`FK_7b1ebeb6e8fca9631ce147aae5f\` FOREIGN KEY (\`quiz_id\`) REFERENCES \`quizzes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lessons\` ADD CONSTRAINT \`FK_181ded071b6ee2a23568ba232b8\` FOREIGN KEY (\`group id\`) REFERENCES \`lesson_groups\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lesson_groups\` ADD CONSTRAINT \`FK_bfecf08534818a141cefddb8c5f\` FOREIGN KEY (\`chapter_id\`) REFERENCES \`chapters\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`chapters\` ADD CONSTRAINT \`FK_9909a69a63f1d064b42ef35ab04\` FOREIGN KEY (\`course_id\`) REFERENCES \`courses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_lessons\` ADD CONSTRAINT \`FK_23d86671266c94d90e7e5a9844d\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_lessons\` ADD CONSTRAINT \`FK_1ec25283d0c9c2c1de634786caa\` FOREIGN KEY (\`lesson_id\`) REFERENCES \`lessons\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_lessons\` DROP FOREIGN KEY \`FK_1ec25283d0c9c2c1de634786caa\``);
        await queryRunner.query(`ALTER TABLE \`user_lessons\` DROP FOREIGN KEY \`FK_23d86671266c94d90e7e5a9844d\``);
        await queryRunner.query(`ALTER TABLE \`chapters\` DROP FOREIGN KEY \`FK_9909a69a63f1d064b42ef35ab04\``);
        await queryRunner.query(`ALTER TABLE \`lesson_groups\` DROP FOREIGN KEY \`FK_bfecf08534818a141cefddb8c5f\``);
        await queryRunner.query(`ALTER TABLE \`lessons\` DROP FOREIGN KEY \`FK_181ded071b6ee2a23568ba232b8\``);
        await queryRunner.query(`ALTER TABLE \`lesson_quizzes\` DROP FOREIGN KEY \`FK_7b1ebeb6e8fca9631ce147aae5f\``);
        await queryRunner.query(`ALTER TABLE \`lesson_quizzes\` DROP FOREIGN KEY \`FK_76602072f90b62d3c901177bd7d\``);
        await queryRunner.query(`ALTER TABLE \`quiz_questions\` DROP FOREIGN KEY \`FK_14c6d2b8f5be0bdb406a3895bb4\``);
        await queryRunner.query(`ALTER TABLE \`notes\` DROP FOREIGN KEY \`FK_454cce45958a7fb47507080ece7\``);
        await queryRunner.query(`ALTER TABLE \`notes\` DROP FOREIGN KEY \`FK_8cd6944c342b0aa92b67e0093df\``);
        await queryRunner.query(`ALTER TABLE \`user_courses\` DROP FOREIGN KEY \`FK_a0b1f1c542f6fc1d11496a1b1c1\``);
        await queryRunner.query(`ALTER TABLE \`user_courses\` DROP FOREIGN KEY \`FK_b9d27ba9648ac2cd59bcccdac17\``);
        await queryRunner.query(`DROP TABLE \`user_lessons\``);
        await queryRunner.query(`DROP TABLE \`courses\``);
        await queryRunner.query(`DROP TABLE \`chapters\``);
        await queryRunner.query(`DROP TABLE \`lesson_groups\``);
        await queryRunner.query(`DROP TABLE \`lessons\``);
        await queryRunner.query(`DROP INDEX \`IDX_15a35121186be720d59cde2412\` ON \`lesson_quizzes\``);
        await queryRunner.query(`DROP TABLE \`lesson_quizzes\``);
        await queryRunner.query(`DROP TABLE \`quizzes\``);
        await queryRunner.query(`DROP TABLE \`quiz_questions\``);
        await queryRunner.query(`DROP TABLE \`notes\``);
        await queryRunner.query(`DROP TABLE \`user_courses\``);
    }

}
