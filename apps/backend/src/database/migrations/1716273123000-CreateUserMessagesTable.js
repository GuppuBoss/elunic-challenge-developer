const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class CreateUserMessagesTable1716273123000 {
    name = 'CreateUserMessagesTable1716273123000'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE \`user_messages\` (
                \`id\` varchar(36) NOT NULL DEFAULT (uuid()),
                \`username\` varchar(100) NOT NULL,
                \`message\` text NOT NULL,
                \`email\` varchar(255) NULL,
                \`isRead\` tinyint NOT NULL DEFAULT 0,
                \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                PRIMARY KEY (\`id\`)
            ) ENGINE=InnoDB
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`user_messages\``);
    }
} 