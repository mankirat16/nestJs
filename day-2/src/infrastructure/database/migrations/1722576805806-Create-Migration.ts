import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMigration1722576805806 implements MigrationInterface {
    name = 'CreateMigration1722576805806'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "User" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(65) NOT NULL, "otp" character varying(65), CONSTRAINT "UQ_4a257d2c9837248d70640b3e36e" UNIQUE ("email"), CONSTRAINT "PK_65480f20ffc4f826f332037ce69" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "Session" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "sessionId" character varying(50) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "userId" uuid, CONSTRAINT "UQ_fb2543ad2229684616730360c1b" UNIQUE ("sessionId"), CONSTRAINT "PK_0f395225ec715f8cc5621915e3a" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`ALTER TABLE "Session" ADD CONSTRAINT "FK_5d4e8000d78793c81fe0b2f38f6" FOREIGN KEY ("userId") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Session" DROP CONSTRAINT "FK_5d4e8000d78793c81fe0b2f38f6"`);
        await queryRunner.query(`DROP TABLE "Session"`);
        await queryRunner.query(`DROP TABLE "User"`);
    }

}
