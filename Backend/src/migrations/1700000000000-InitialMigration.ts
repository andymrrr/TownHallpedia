import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1700000000000 implements MigrationInterface {
  name = 'InitialMigration1700000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Crear tabla Ayuntamiento
    await queryRunner.query(`
      CREATE TABLE "ayuntamiento" (
        "id" SERIAL NOT NULL,
        "nivel" integer NOT NULL,
        "capacidad_almacen_oro" integer,
        "capacidad_almacen_elixir" integer,
        "capacidad_almacen_oscuro" integer,
        "tiempo_construccion_horas" integer,
        "costo_mejora" integer,
        "tipo_recurso" character varying(20),
        "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(),
        "fecha_actualizacion" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_ayuntamiento_nivel" UNIQUE ("nivel"),
        CONSTRAINT "PK_ayuntamiento" PRIMARY KEY ("id")
      )
    `);

    // Crear tabla Edificio
    await queryRunner.query(`
      CREATE TABLE "edificio" (
        "id" SERIAL NOT NULL,
        "nombre" character varying(100) NOT NULL,
        "tipo" character varying(50),
        "descripcion" text,
        "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(),
        "fecha_actualizacion" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_edificio" PRIMARY KEY ("id")
      )
    `);

    // Crear tabla Tropa
    await queryRunner.query(`
      CREATE TABLE "tropa" (
        "id" SERIAL NOT NULL,
        "nombre" character varying(100) NOT NULL,
        "tipo" character varying(50),
        "espacio_ejercito" integer,
        "descripcion" text,
        "desbloquea_en_cuartel" integer,
        "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(),
        "fecha_actualizacion" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_tropa" PRIMARY KEY ("id")
      )
    `);

    // Crear tabla Heroe
    await queryRunner.query(`
      CREATE TABLE "heroe" (
        "id" SERIAL NOT NULL,
        "nombre" character varying(100) NOT NULL,
        "descripcion" text,
        "tipo_recurso" character varying(20),
        "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(),
        "fecha_actualizacion" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_heroe" PRIMARY KEY ("id")
      )
    `);

    // Crear tabla Hechizo
    await queryRunner.query(`
      CREATE TABLE "hechizo" (
        "id" SERIAL NOT NULL,
        "nombre" character varying(100) NOT NULL,
        "tipo" character varying(20),
        "espacio_hechizo" integer,
        "descripcion" text,
        "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(),
        "fecha_actualizacion" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_hechizo" PRIMARY KEY ("id")
      )
    `);

    // Crear tabla NivelDetalle
    await queryRunner.query(`
      CREATE TABLE "nivel_detalle" (
        "id" SERIAL NOT NULL,
        "tipo_entidad" character varying(20) NOT NULL,
        "entidad_id" integer NOT NULL,
        "nivel" integer NOT NULL,
        "costo_mejora" integer,
        "tipo_recurso" character varying(20),
        "tiempo_horas" integer,
        "dano_por_segundo" real,
        "vida" integer,
        "capacidad" integer,
        "desbloquea_en_ayuntamiento" integer,
        "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(),
        "fecha_actualizacion" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_nivel_detalle" PRIMARY KEY ("id")
      )
    `);

    // Crear tabla DesbloqueosAyuntamiento
    await queryRunner.query(`
      CREATE TABLE "desbloqueos_ayuntamiento" (
        "id" SERIAL NOT NULL,
        "ayuntamiento_id" integer NOT NULL,
        "tipo_entidad" character varying(20) NOT NULL,
        "entidad_id" integer NOT NULL,
        "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(),
        "fecha_actualizacion" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_desbloqueos_ayuntamiento" PRIMARY KEY ("id")
      )
    `);

    // Agregar foreign keys
    await queryRunner.query(`
      ALTER TABLE "tropa" 
      ADD CONSTRAINT "FK_tropa_desbloquea_en_cuartel" 
      FOREIGN KEY ("desbloquea_en_cuartel") REFERENCES "edificio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE "nivel_detalle" 
      ADD CONSTRAINT "FK_nivel_detalle_desbloquea_en_ayuntamiento" 
      FOREIGN KEY ("desbloquea_en_ayuntamiento") REFERENCES "ayuntamiento"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE "desbloqueos_ayuntamiento" 
      ADD CONSTRAINT "FK_desbloqueos_ayuntamiento_ayuntamiento" 
      FOREIGN KEY ("ayuntamiento_id") REFERENCES "ayuntamiento"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    // Crear índices únicos
    await queryRunner.query(`
      CREATE UNIQUE INDEX "IDX_nivel_detalle_unique" 
      ON "nivel_detalle" ("tipo_entidad", "entidad_id", "nivel")
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX "IDX_desbloqueos_ayuntamiento_unique" 
      ON "desbloqueos_ayuntamiento" ("ayuntamiento_id", "tipo_entidad", "entidad_id")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Eliminar foreign keys
    await queryRunner.query(`ALTER TABLE "desbloqueos_ayuntamiento" DROP CONSTRAINT "FK_desbloqueos_ayuntamiento_ayuntamiento"`);
    await queryRunner.query(`ALTER TABLE "nivel_detalle" DROP CONSTRAINT "FK_nivel_detalle_desbloquea_en_ayuntamiento"`);
    await queryRunner.query(`ALTER TABLE "tropa" DROP CONSTRAINT "FK_tropa_desbloquea_en_cuartel"`);

    // Eliminar índices
    await queryRunner.query(`DROP INDEX "IDX_desbloqueos_ayuntamiento_unique"`);
    await queryRunner.query(`DROP INDEX "IDX_nivel_detalle_unique"`);

    // Eliminar tablas
    await queryRunner.query(`DROP TABLE "desbloqueos_ayuntamiento"`);
    await queryRunner.query(`DROP TABLE "nivel_detalle"`);
    await queryRunner.query(`DROP TABLE "hechizo"`);
    await queryRunner.query(`DROP TABLE "heroe"`);
    await queryRunner.query(`DROP TABLE "tropa"`);
    await queryRunner.query(`DROP TABLE "edificio"`);
    await queryRunner.query(`DROP TABLE "ayuntamiento"`);
  }
}
