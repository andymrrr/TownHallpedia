import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey, TableIndex, TableUnique } from 'typeorm';

export class InitialSchema1762191053941 implements MigrationInterface {
  name = 'InitialSchema1762191053941';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // ============================================
    // ENUMs: Tipos fijos del sistema
    // ============================================
    await queryRunner.query(`
      DO $$ BEGIN
        CREATE TYPE tipo_edificio AS ENUM ('DEFENSA', 'RECURSO', 'TROPAS', 'ESPECIAL', 'HECHIZOS', 'ALMACEN', 'OTRO');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    await queryRunner.query(`
      DO $$ BEGIN
        CREATE TYPE tipo_tropa AS ENUM ('TIERRA', 'AIRE', 'ESPECIAL', 'SUPER');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    // ============================================
    // TABLA: recurso
    // ============================================
    await queryRunner.createTable(
      new Table({
        name: 'recurso',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'nombre',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'descripcion',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'fecha_creacion',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'fecha_actualizacion',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createUniqueConstraint(
      'recurso',
      new TableUnique({
        name: 'UQ_recurso_nombre',
        columnNames: ['nombre'],
      }),
    );

    await queryRunner.createIndex(
      'recurso',
      new TableIndex({
        name: 'IDX_recurso_nombre',
        columnNames: ['nombre'],
      }),
    );

    // ============================================
    // TABLA: ayuntamiento
    // ============================================
    await queryRunner.createTable(
      new Table({
        name: 'ayuntamiento',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'nivel',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'capacidad_almacen_oro',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'capacidad_almacen_elixir',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'capacidad_almacen_oscuro',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'tiempo_construccion_horas',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'costo_mejora',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'tipo_recurso_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'portada',
            type: 'varchar',
            length: '300',
            isNullable: true,
          },
          {
            name: 'fecha_creacion',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'fecha_actualizacion',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createUniqueConstraint(
      'ayuntamiento',
      new TableUnique({
        name: 'UQ_ayuntamiento_nivel',
        columnNames: ['nivel'],
      }),
    );

    await queryRunner.createForeignKey(
      'ayuntamiento',
      new TableForeignKey({
        name: 'FK_ayuntamiento_tipo_recurso',
        columnNames: ['tipo_recurso_id'],
        referencedTableName: 'recurso',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createIndex(
      'ayuntamiento',
      new TableIndex({
        name: 'IDX_ayuntamiento_nivel',
        columnNames: ['nivel'],
      }),
    );

    await queryRunner.createIndex(
      'ayuntamiento',
      new TableIndex({
        name: 'IDX_ayuntamiento_tipo_recurso',
        columnNames: ['tipo_recurso_id'],
      }),
    );

    // ============================================
    // TABLA: edificio
    // ============================================
    await queryRunner.createTable(
      new Table({
        name: 'edificio',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'nombre',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'tipo',
            type: 'varchar',
            length: '50',
            isNullable: true,
            comment: 'Tipo de edificio: DEFENSA, RECURSO, TROPAS, ESPECIAL, HECHIZOS, ALMACEN, OTRO',
          },
          {
            name: 'descripcion',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'portada',
            type: 'varchar',
            length: '300',
            isNullable: true,
          },
          {
            name: 'fecha_creacion',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'fecha_actualizacion',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'edificio',
      new TableIndex({
        name: 'IDX_edificio_nombre',
        columnNames: ['nombre'],
      }),
    );

    await queryRunner.createIndex(
      'edificio',
      new TableIndex({
        name: 'IDX_edificio_tipo',
        columnNames: ['tipo'],
      }),
    );

    // ============================================
    // TABLA: heroe
    // ============================================
    await queryRunner.createTable(
      new Table({
        name: 'heroe',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'nombre',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'descripcion',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'tipo_recurso_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'portada',
            type: 'varchar',
            length: '300',
            isNullable: true,
          },
          {
            name: 'fecha_creacion',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'fecha_actualizacion',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'heroe',
      new TableForeignKey({
        name: 'FK_heroe_tipo_recurso',
        columnNames: ['tipo_recurso_id'],
        referencedTableName: 'recurso',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createIndex(
      'heroe',
      new TableIndex({
        name: 'IDX_heroe_nombre',
        columnNames: ['nombre'],
      }),
    );

    await queryRunner.createIndex(
      'heroe',
      new TableIndex({
        name: 'IDX_heroe_tipo_recurso',
        columnNames: ['tipo_recurso_id'],
      }),
    );

    // ============================================
    // TABLA: tropa
    // ============================================
    await queryRunner.createTable(
      new Table({
        name: 'tropa',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'nombre',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'tipo',
            type: 'varchar',
            length: '50',
            isNullable: true,
            comment: 'Tipo de tropa: TIERRA, AIRE, ESPECIAL, SUPER',
          },
          {
            name: 'espacio_ejercito',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'descripcion',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'portada',
            type: 'varchar',
            length: '300',
            isNullable: true,
          },
          {
            name: 'desbloquea_en_cuartel',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'fecha_creacion',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'fecha_actualizacion',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'tropa',
      new TableForeignKey({
        name: 'FK_tropa_desbloquea_cuartel',
        columnNames: ['desbloquea_en_cuartel'],
        referencedTableName: 'edificio',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createIndex(
      'tropa',
      new TableIndex({
        name: 'IDX_tropa_nombre',
        columnNames: ['nombre'],
      }),
    );

    await queryRunner.createIndex(
      'tropa',
      new TableIndex({
        name: 'IDX_tropa_tipo',
        columnNames: ['tipo'],
      }),
    );

    // ============================================
    // TABLA: hechizo
    // ============================================
    await queryRunner.createTable(
      new Table({
        name: 'hechizo',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'nombre',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'tipo',
            type: 'varchar',
            length: '50',
            isNullable: true,
          },
          {
            name: 'espacio_hechizo',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'descripcion',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'portada',
            type: 'varchar',
            length: '300',
            isNullable: true,
          },
          {
            name: 'fecha_creacion',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'fecha_actualizacion',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'hechizo',
      new TableIndex({
        name: 'IDX_hechizo_nombre',
        columnNames: ['nombre'],
      }),
    );

    // ============================================
    // TABLA: animal
    // ============================================
    await queryRunner.createTable(
      new Table({
        name: 'animal',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'nombre',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'tipo',
            type: 'varchar',
            length: '50',
            isNullable: true,
          },
          {
            name: 'descripcion',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'portada',
            type: 'varchar',
            length: '300',
            isNullable: true,
          },
          {
            name: 'fecha_creacion',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'fecha_actualizacion',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'animal',
      new TableIndex({
        name: 'IDX_animal_nombre',
        columnNames: ['nombre'],
      }),
    );

    // ============================================
    // TABLA: nivel_detalle_heroe
    // ============================================
    await queryRunner.createTable(
      new Table({
        name: 'nivel_detalle_heroe',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'heroe_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'nivel',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'costo_mejora',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'tipo_recurso_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'tiempo_horas',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'dano_por_segundo',
            type: 'real',
            isNullable: true,
          },
          {
            name: 'vida',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'capacidad',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'desbloquea_en_ayuntamiento_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'fecha_creacion',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'fecha_actualizacion',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createUniqueConstraint(
      'nivel_detalle_heroe',
      new TableUnique({
        name: 'UQ_nivel_detalle_heroe_heroe_nivel',
        columnNames: ['heroe_id', 'nivel'],
      }),
    );

    await queryRunner.createForeignKey(
      'nivel_detalle_heroe',
      new TableForeignKey({
        name: 'FK_nivel_detalle_heroe_heroe',
        columnNames: ['heroe_id'],
        referencedTableName: 'heroe',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'nivel_detalle_heroe',
      new TableForeignKey({
        name: 'FK_nivel_detalle_heroe_ayuntamiento',
        columnNames: ['desbloquea_en_ayuntamiento_id'],
        referencedTableName: 'ayuntamiento',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'nivel_detalle_heroe',
      new TableForeignKey({
        name: 'FK_nivel_detalle_heroe_tipo_recurso',
        columnNames: ['tipo_recurso_id'],
        referencedTableName: 'recurso',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createIndex(
      'nivel_detalle_heroe',
      new TableIndex({
        name: 'IDX_nivel_detalle_heroe_heroe_nivel',
        columnNames: ['heroe_id', 'nivel'],
      }),
    );

    await queryRunner.createIndex(
      'nivel_detalle_heroe',
      new TableIndex({
        name: 'IDX_nivel_detalle_heroe_ayuntamiento',
        columnNames: ['desbloquea_en_ayuntamiento_id'],
      }),
    );

    // ============================================
    // TABLA: nivel_detalle_tropa
    // ============================================
    await queryRunner.createTable(
      new Table({
        name: 'nivel_detalle_tropa',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'tropa_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'nivel',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'costo_mejora',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'tipo_recurso_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'tiempo_horas',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'dano_por_segundo',
            type: 'real',
            isNullable: true,
          },
          {
            name: 'vida',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'capacidad',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'desbloquea_en_ayuntamiento_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'fecha_creacion',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'fecha_actualizacion',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createUniqueConstraint(
      'nivel_detalle_tropa',
      new TableUnique({
        name: 'UQ_nivel_detalle_tropa_tropa_nivel',
        columnNames: ['tropa_id', 'nivel'],
      }),
    );

    await queryRunner.createForeignKey(
      'nivel_detalle_tropa',
      new TableForeignKey({
        name: 'FK_nivel_detalle_tropa_tropa',
        columnNames: ['tropa_id'],
        referencedTableName: 'tropa',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'nivel_detalle_tropa',
      new TableForeignKey({
        name: 'FK_nivel_detalle_tropa_ayuntamiento',
        columnNames: ['desbloquea_en_ayuntamiento_id'],
        referencedTableName: 'ayuntamiento',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'nivel_detalle_tropa',
      new TableForeignKey({
        name: 'FK_nivel_detalle_tropa_tipo_recurso',
        columnNames: ['tipo_recurso_id'],
        referencedTableName: 'recurso',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createIndex(
      'nivel_detalle_tropa',
      new TableIndex({
        name: 'IDX_nivel_detalle_tropa_tropa_nivel',
        columnNames: ['tropa_id', 'nivel'],
      }),
    );

    await queryRunner.createIndex(
      'nivel_detalle_tropa',
      new TableIndex({
        name: 'IDX_nivel_detalle_tropa_ayuntamiento',
        columnNames: ['desbloquea_en_ayuntamiento_id'],
      }),
    );

    // ============================================
    // TABLA: nivel_detalle_hechizo
    // ============================================
    await queryRunner.createTable(
      new Table({
        name: 'nivel_detalle_hechizo',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'hechizo_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'nivel',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'costo_mejora',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'tipo_recurso_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'tiempo_horas',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'dano_por_segundo',
            type: 'real',
            isNullable: true,
          },
          {
            name: 'vida',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'capacidad',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'desbloquea_en_ayuntamiento_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'fecha_creacion',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'fecha_actualizacion',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createUniqueConstraint(
      'nivel_detalle_hechizo',
      new TableUnique({
        name: 'UQ_nivel_detalle_hechizo_hechizo_nivel',
        columnNames: ['hechizo_id', 'nivel'],
      }),
    );

    await queryRunner.createForeignKey(
      'nivel_detalle_hechizo',
      new TableForeignKey({
        name: 'FK_nivel_detalle_hechizo_hechizo',
        columnNames: ['hechizo_id'],
        referencedTableName: 'hechizo',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'nivel_detalle_hechizo',
      new TableForeignKey({
        name: 'FK_nivel_detalle_hechizo_ayuntamiento',
        columnNames: ['desbloquea_en_ayuntamiento_id'],
        referencedTableName: 'ayuntamiento',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'nivel_detalle_hechizo',
      new TableForeignKey({
        name: 'FK_nivel_detalle_hechizo_tipo_recurso',
        columnNames: ['tipo_recurso_id'],
        referencedTableName: 'recurso',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createIndex(
      'nivel_detalle_hechizo',
      new TableIndex({
        name: 'IDX_nivel_detalle_hechizo_hechizo_nivel',
        columnNames: ['hechizo_id', 'nivel'],
      }),
    );

    await queryRunner.createIndex(
      'nivel_detalle_hechizo',
      new TableIndex({
        name: 'IDX_nivel_detalle_hechizo_ayuntamiento',
        columnNames: ['desbloquea_en_ayuntamiento_id'],
      }),
    );

    // ============================================
    // TABLA: nivel_detalle_edificio
    // ============================================
    await queryRunner.createTable(
      new Table({
        name: 'nivel_detalle_edificio',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'edificio_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'nivel',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'costo_mejora',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'tipo_recurso_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'tiempo_horas',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'dano_por_segundo',
            type: 'real',
            isNullable: true,
          },
          {
            name: 'vida',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'capacidad',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'desbloquea_en_ayuntamiento_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'fecha_creacion',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'fecha_actualizacion',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createUniqueConstraint(
      'nivel_detalle_edificio',
      new TableUnique({
        name: 'UQ_nivel_detalle_edificio_edificio_nivel',
        columnNames: ['edificio_id', 'nivel'],
      }),
    );

    await queryRunner.createForeignKey(
      'nivel_detalle_edificio',
      new TableForeignKey({
        name: 'FK_nivel_detalle_edificio_edificio',
        columnNames: ['edificio_id'],
        referencedTableName: 'edificio',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'nivel_detalle_edificio',
      new TableForeignKey({
        name: 'FK_nivel_detalle_edificio_ayuntamiento',
        columnNames: ['desbloquea_en_ayuntamiento_id'],
        referencedTableName: 'ayuntamiento',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'nivel_detalle_edificio',
      new TableForeignKey({
        name: 'FK_nivel_detalle_edificio_tipo_recurso',
        columnNames: ['tipo_recurso_id'],
        referencedTableName: 'recurso',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createIndex(
      'nivel_detalle_edificio',
      new TableIndex({
        name: 'IDX_nivel_detalle_edificio_edificio_nivel',
        columnNames: ['edificio_id', 'nivel'],
      }),
    );

    await queryRunner.createIndex(
      'nivel_detalle_edificio',
      new TableIndex({
        name: 'IDX_nivel_detalle_edificio_ayuntamiento',
        columnNames: ['desbloquea_en_ayuntamiento_id'],
      }),
    );

    // ============================================
    // TABLA: nivel_detalle_animal
    // ============================================
    await queryRunner.createTable(
      new Table({
        name: 'nivel_detalle_animal',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'animal_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'nivel',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'costo_mejora',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'tipo_recurso_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'tiempo_horas',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'dano_por_segundo',
            type: 'real',
            isNullable: true,
          },
          {
            name: 'vida',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'capacidad',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'desbloquea_en_ayuntamiento_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'fecha_creacion',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'fecha_actualizacion',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createUniqueConstraint(
      'nivel_detalle_animal',
      new TableUnique({
        name: 'UQ_nivel_detalle_animal_animal_nivel',
        columnNames: ['animal_id', 'nivel'],
      }),
    );

    await queryRunner.createForeignKey(
      'nivel_detalle_animal',
      new TableForeignKey({
        name: 'FK_nivel_detalle_animal_animal',
        columnNames: ['animal_id'],
        referencedTableName: 'animal',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'nivel_detalle_animal',
      new TableForeignKey({
        name: 'FK_nivel_detalle_animal_ayuntamiento',
        columnNames: ['desbloquea_en_ayuntamiento_id'],
        referencedTableName: 'ayuntamiento',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'nivel_detalle_animal',
      new TableForeignKey({
        name: 'FK_nivel_detalle_animal_tipo_recurso',
        columnNames: ['tipo_recurso_id'],
        referencedTableName: 'recurso',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createIndex(
      'nivel_detalle_animal',
      new TableIndex({
        name: 'IDX_nivel_detalle_animal_animal_nivel',
        columnNames: ['animal_id', 'nivel'],
      }),
    );

    await queryRunner.createIndex(
      'nivel_detalle_animal',
      new TableIndex({
        name: 'IDX_nivel_detalle_animal_ayuntamiento',
        columnNames: ['desbloquea_en_ayuntamiento_id'],
      }),
    );

    // ============================================
    // TABLA: desbloqueos_ayuntamiento_heroe
    // ============================================
    await queryRunner.createTable(
      new Table({
        name: 'desbloqueos_ayuntamiento_heroe',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'ayuntamiento_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'heroe_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'es_nuevo',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'nivel_minimo_disponible',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'nivel_maximo_disponible',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'fecha_creacion',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'fecha_actualizacion',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createUniqueConstraint(
      'desbloqueos_ayuntamiento_heroe',
      new TableUnique({
        name: 'UQ_desbloqueos_ayuntamiento_heroe_ayuntamiento_heroe',
        columnNames: ['ayuntamiento_id', 'heroe_id'],
      }),
    );

    await queryRunner.createForeignKey(
      'desbloqueos_ayuntamiento_heroe',
      new TableForeignKey({
        name: 'FK_desbloqueos_ayuntamiento_heroe_ayuntamiento',
        columnNames: ['ayuntamiento_id'],
        referencedTableName: 'ayuntamiento',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'desbloqueos_ayuntamiento_heroe',
      new TableForeignKey({
        name: 'FK_desbloqueos_ayuntamiento_heroe_heroe',
        columnNames: ['heroe_id'],
        referencedTableName: 'heroe',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.query(`
      ALTER TABLE desbloqueos_ayuntamiento_heroe
      ADD CONSTRAINT CHK_desbloqueos_ayuntamiento_heroe_niveles
      CHECK (nivel_maximo_disponible >= nivel_minimo_disponible);
    `);

    await queryRunner.createIndex(
      'desbloqueos_ayuntamiento_heroe',
      new TableIndex({
        name: 'IDX_desbloqueos_ayuntamiento_heroe_ayuntamiento',
        columnNames: ['ayuntamiento_id'],
      }),
    );

    await queryRunner.createIndex(
      'desbloqueos_ayuntamiento_heroe',
      new TableIndex({
        name: 'IDX_desbloqueos_ayuntamiento_heroe_heroe',
        columnNames: ['heroe_id'],
      }),
    );

    await queryRunner.createIndex(
      'desbloqueos_ayuntamiento_heroe',
      new TableIndex({
        name: 'IDX_desbloqueos_ayuntamiento_heroe_es_nuevo',
        columnNames: ['es_nuevo'],
      }),
    );

    // ============================================
    // TABLA: desbloqueos_ayuntamiento_tropa
    // ============================================
    await queryRunner.createTable(
      new Table({
        name: 'desbloqueos_ayuntamiento_tropa',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'ayuntamiento_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'tropa_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'es_nuevo',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'nivel_minimo_disponible',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'nivel_maximo_disponible',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'fecha_creacion',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'fecha_actualizacion',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createUniqueConstraint(
      'desbloqueos_ayuntamiento_tropa',
      new TableUnique({
        name: 'UQ_desbloqueos_ayuntamiento_tropa_ayuntamiento_tropa',
        columnNames: ['ayuntamiento_id', 'tropa_id'],
      }),
    );

    await queryRunner.createForeignKey(
      'desbloqueos_ayuntamiento_tropa',
      new TableForeignKey({
        name: 'FK_desbloqueos_ayuntamiento_tropa_ayuntamiento',
        columnNames: ['ayuntamiento_id'],
        referencedTableName: 'ayuntamiento',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'desbloqueos_ayuntamiento_tropa',
      new TableForeignKey({
        name: 'FK_desbloqueos_ayuntamiento_tropa_tropa',
        columnNames: ['tropa_id'],
        referencedTableName: 'tropa',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.query(`
      ALTER TABLE desbloqueos_ayuntamiento_tropa
      ADD CONSTRAINT CHK_desbloqueos_ayuntamiento_tropa_niveles
      CHECK (nivel_maximo_disponible >= nivel_minimo_disponible);
    `);

    await queryRunner.createIndex(
      'desbloqueos_ayuntamiento_tropa',
      new TableIndex({
        name: 'IDX_desbloqueos_ayuntamiento_tropa_ayuntamiento',
        columnNames: ['ayuntamiento_id'],
      }),
    );

    await queryRunner.createIndex(
      'desbloqueos_ayuntamiento_tropa',
      new TableIndex({
        name: 'IDX_desbloqueos_ayuntamiento_tropa_tropa',
        columnNames: ['tropa_id'],
      }),
    );

    await queryRunner.createIndex(
      'desbloqueos_ayuntamiento_tropa',
      new TableIndex({
        name: 'IDX_desbloqueos_ayuntamiento_tropa_es_nuevo',
        columnNames: ['es_nuevo'],
      }),
    );

    // ============================================
    // TABLA: desbloqueos_ayuntamiento_hechizo
    // ============================================
    await queryRunner.createTable(
      new Table({
        name: 'desbloqueos_ayuntamiento_hechizo',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'ayuntamiento_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'hechizo_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'es_nuevo',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'nivel_minimo_disponible',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'nivel_maximo_disponible',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'fecha_creacion',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'fecha_actualizacion',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createUniqueConstraint(
      'desbloqueos_ayuntamiento_hechizo',
      new TableUnique({
        name: 'UQ_desbloqueos_ayuntamiento_hechizo_ayuntamiento_hechizo',
        columnNames: ['ayuntamiento_id', 'hechizo_id'],
      }),
    );

    await queryRunner.createForeignKey(
      'desbloqueos_ayuntamiento_hechizo',
      new TableForeignKey({
        name: 'FK_desbloqueos_ayuntamiento_hechizo_ayuntamiento',
        columnNames: ['ayuntamiento_id'],
        referencedTableName: 'ayuntamiento',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'desbloqueos_ayuntamiento_hechizo',
      new TableForeignKey({
        name: 'FK_desbloqueos_ayuntamiento_hechizo_hechizo',
        columnNames: ['hechizo_id'],
        referencedTableName: 'hechizo',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.query(`
      ALTER TABLE desbloqueos_ayuntamiento_hechizo
      ADD CONSTRAINT CHK_desbloqueos_ayuntamiento_hechizo_niveles
      CHECK (nivel_maximo_disponible >= nivel_minimo_disponible);
    `);

    await queryRunner.createIndex(
      'desbloqueos_ayuntamiento_hechizo',
      new TableIndex({
        name: 'IDX_desbloqueos_ayuntamiento_hechizo_ayuntamiento',
        columnNames: ['ayuntamiento_id'],
      }),
    );

    await queryRunner.createIndex(
      'desbloqueos_ayuntamiento_hechizo',
      new TableIndex({
        name: 'IDX_desbloqueos_ayuntamiento_hechizo_hechizo',
        columnNames: ['hechizo_id'],
      }),
    );

    await queryRunner.createIndex(
      'desbloqueos_ayuntamiento_hechizo',
      new TableIndex({
        name: 'IDX_desbloqueos_ayuntamiento_hechizo_es_nuevo',
        columnNames: ['es_nuevo'],
      }),
    );

    // ============================================
    // TABLA: desbloqueos_ayuntamiento_edificio
    // ============================================
    await queryRunner.createTable(
      new Table({
        name: 'desbloqueos_ayuntamiento_edificio',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'ayuntamiento_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'edificio_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'es_nuevo',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'nivel_minimo_disponible',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'nivel_maximo_disponible',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'fecha_creacion',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'fecha_actualizacion',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createUniqueConstraint(
      'desbloqueos_ayuntamiento_edificio',
      new TableUnique({
        name: 'UQ_desbloqueos_ayuntamiento_edificio_ayuntamiento_edificio',
        columnNames: ['ayuntamiento_id', 'edificio_id'],
      }),
    );

    await queryRunner.createForeignKey(
      'desbloqueos_ayuntamiento_edificio',
      new TableForeignKey({
        name: 'FK_desbloqueos_ayuntamiento_edificio_ayuntamiento',
        columnNames: ['ayuntamiento_id'],
        referencedTableName: 'ayuntamiento',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'desbloqueos_ayuntamiento_edificio',
      new TableForeignKey({
        name: 'FK_desbloqueos_ayuntamiento_edificio_edificio',
        columnNames: ['edificio_id'],
        referencedTableName: 'edificio',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.query(`
      ALTER TABLE desbloqueos_ayuntamiento_edificio
      ADD CONSTRAINT CHK_desbloqueos_ayuntamiento_edificio_niveles
      CHECK (nivel_maximo_disponible >= nivel_minimo_disponible);
    `);

    await queryRunner.createIndex(
      'desbloqueos_ayuntamiento_edificio',
      new TableIndex({
        name: 'IDX_desbloqueos_ayuntamiento_edificio_ayuntamiento',
        columnNames: ['ayuntamiento_id'],
      }),
    );

    await queryRunner.createIndex(
      'desbloqueos_ayuntamiento_edificio',
      new TableIndex({
        name: 'IDX_desbloqueos_ayuntamiento_edificio_edificio',
        columnNames: ['edificio_id'],
      }),
    );

    await queryRunner.createIndex(
      'desbloqueos_ayuntamiento_edificio',
      new TableIndex({
        name: 'IDX_desbloqueos_ayuntamiento_edificio_es_nuevo',
        columnNames: ['es_nuevo'],
      }),
    );

    // ============================================
    // TABLA: desbloqueos_ayuntamiento_animal
    // ============================================
    await queryRunner.createTable(
      new Table({
        name: 'desbloqueos_ayuntamiento_animal',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'ayuntamiento_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'animal_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'es_nuevo',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'nivel_minimo_disponible',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'nivel_maximo_disponible',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'fecha_creacion',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'fecha_actualizacion',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createUniqueConstraint(
      'desbloqueos_ayuntamiento_animal',
      new TableUnique({
        name: 'UQ_desbloqueos_ayuntamiento_animal_ayuntamiento_animal',
        columnNames: ['ayuntamiento_id', 'animal_id'],
      }),
    );

    await queryRunner.createForeignKey(
      'desbloqueos_ayuntamiento_animal',
      new TableForeignKey({
        name: 'FK_desbloqueos_ayuntamiento_animal_ayuntamiento',
        columnNames: ['ayuntamiento_id'],
        referencedTableName: 'ayuntamiento',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'desbloqueos_ayuntamiento_animal',
      new TableForeignKey({
        name: 'FK_desbloqueos_ayuntamiento_animal_animal',
        columnNames: ['animal_id'],
        referencedTableName: 'animal',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.query(`
      ALTER TABLE desbloqueos_ayuntamiento_animal
      ADD CONSTRAINT CHK_desbloqueos_ayuntamiento_animal_niveles
      CHECK (nivel_maximo_disponible >= nivel_minimo_disponible);
    `);

    await queryRunner.createIndex(
      'desbloqueos_ayuntamiento_animal',
      new TableIndex({
        name: 'IDX_desbloqueos_ayuntamiento_animal_ayuntamiento',
        columnNames: ['ayuntamiento_id'],
      }),
    );

    await queryRunner.createIndex(
      'desbloqueos_ayuntamiento_animal',
      new TableIndex({
        name: 'IDX_desbloqueos_ayuntamiento_animal_animal',
        columnNames: ['animal_id'],
      }),
    );

    await queryRunner.createIndex(
      'desbloqueos_ayuntamiento_animal',
      new TableIndex({
        name: 'IDX_desbloqueos_ayuntamiento_animal_es_nuevo',
        columnNames: ['es_nuevo'],
      }),
    );

    // ============================================
    // TRIGGERS: Actualización automática de fecha_actualizacion
    // ============================================
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.fecha_actualizacion = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ language 'plpgsql';
    `);

    const tables = [
      'recurso',
      'ayuntamiento',
      'edificio',
      'heroe',
      'tropa',
      'hechizo',
      'animal',
      'nivel_detalle_heroe',
      'nivel_detalle_tropa',
      'nivel_detalle_hechizo',
      'nivel_detalle_edificio',
      'nivel_detalle_animal',
      'desbloqueos_ayuntamiento_heroe',
      'desbloqueos_ayuntamiento_tropa',
      'desbloqueos_ayuntamiento_hechizo',
      'desbloqueos_ayuntamiento_edificio',
      'desbloqueos_ayuntamiento_animal',
    ];

    for (const table of tables) {
      await queryRunner.query(`
        DROP TRIGGER IF EXISTS update_${table}_updated_at ON ${table};
        CREATE TRIGGER update_${table}_updated_at
        BEFORE UPDATE ON ${table}
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
      `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Eliminar triggers
    const tables = [
      'desbloqueos_ayuntamiento_animal',
      'desbloqueos_ayuntamiento_edificio',
      'desbloqueos_ayuntamiento_hechizo',
      'desbloqueos_ayuntamiento_tropa',
      'desbloqueos_ayuntamiento_heroe',
      'nivel_detalle_animal',
      'nivel_detalle_edificio',
      'nivel_detalle_hechizo',
      'nivel_detalle_tropa',
      'nivel_detalle_heroe',
      'animal',
      'hechizo',
      'tropa',
      'heroe',
      'edificio',
      'ayuntamiento',
      'recurso',
    ];

    for (const table of tables) {
      await queryRunner.query(`DROP TRIGGER IF EXISTS update_${table}_updated_at ON ${table};`);
    }

    // Eliminar función
    await queryRunner.query(`DROP FUNCTION IF EXISTS update_updated_at_column();`);

    // Eliminar tablas en orden inverso
    await queryRunner.dropTable('desbloqueos_ayuntamiento_animal', true);
    await queryRunner.dropTable('desbloqueos_ayuntamiento_edificio', true);
    await queryRunner.dropTable('desbloqueos_ayuntamiento_hechizo', true);
    await queryRunner.dropTable('desbloqueos_ayuntamiento_tropa', true);
    await queryRunner.dropTable('desbloqueos_ayuntamiento_heroe', true);
    await queryRunner.dropTable('nivel_detalle_animal', true);
    await queryRunner.dropTable('nivel_detalle_edificio', true);
    await queryRunner.dropTable('nivel_detalle_hechizo', true);
    await queryRunner.dropTable('nivel_detalle_tropa', true);
    await queryRunner.dropTable('nivel_detalle_heroe', true);
    await queryRunner.dropTable('animal', true);
    await queryRunner.dropTable('hechizo', true);
    await queryRunner.dropTable('tropa', true);
    await queryRunner.dropTable('heroe', true);
    await queryRunner.dropTable('edificio', true);
    await queryRunner.dropTable('ayuntamiento', true);
    await queryRunner.dropTable('recurso', true);

    // Eliminar ENUMs
    await queryRunner.query(`DROP TYPE IF EXISTS tipo_tropa;`);
    await queryRunner.query(`DROP TYPE IF EXISTS tipo_edificio;`);
  }
}
