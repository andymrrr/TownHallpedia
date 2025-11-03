import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey, TableIndex, TableUnique } from 'typeorm';

export class InitialSchema1762191053941 implements MigrationInterface {
  name = 'InitialSchema1762191053941';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // ============================================
    // TABLA: parametro (Catálogos generales)
    // ============================================
    await queryRunner.createTable(
      new Table({
        name: 'parametro',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'tipo',
            type: 'varchar',
            length: '50',
            isNullable: false,
            comment: 'Categoría del parámetro: tipo_entidad, tipo_recurso, etc.',
          },
          {
            name: 'clave',
            type: 'varchar',
            length: '100',
            isNullable: false,
            comment: 'Nombre interno o código del valor.',
          },
          {
            name: 'valor',
            type: 'varchar',
            length: '200',
            isNullable: true,
            comment: 'Valor legible o nombre a mostrar.',
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
            onUpdate: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createUniqueConstraint(
      'parametro',
      new TableUnique({
        name: 'UQ_parametro_tipo_clave',
        columnNames: ['tipo', 'clave'],
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
            name: 'tipo_recurso_parametro_id',
            type: 'int',
            isNullable: true,
            comment: 'FK lógica a parametro.id donde tipo=tipo_recurso',
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

    await queryRunner.createIndex(
      'ayuntamiento',
      new TableIndex({
        name: 'IDX_ayuntamiento_recurso',
        columnNames: ['tipo_recurso_parametro_id'],
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
            name: 'tipo_parametro_id',
            type: 'int',
            isNullable: true,
            comment: 'FK lógica a parametro.id (tipo_entidad = Edificio)',
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
        name: 'IDX_edificio_tipo',
        columnNames: ['tipo_parametro_id'],
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
            name: 'tipo_recurso_parametro_id',
            type: 'int',
            isNullable: true,
            comment: 'FK lógica a parametro.id (tipo_recurso)',
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
      'heroe',
      new TableIndex({
        name: 'IDX_heroe_recurso',
        columnNames: ['tipo_recurso_parametro_id'],
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
            name: 'tipo_parametro_id',
            type: 'int',
            isNullable: true,
            comment: 'FK lógica a parametro.id (tipo_entidad = Hechizo)',
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
        name: 'IDX_hechizo_tipo',
        columnNames: ['tipo_parametro_id'],
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
            name: 'descripcion',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'tipo_parametro_id',
            type: 'int',
            isNullable: true,
            comment: 'FK lógica a parametro.id (tipo_entidad = Animal)',
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
        name: 'IDX_animal_tipo',
        columnNames: ['tipo_parametro_id'],
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
            name: 'tipo_parametro_id',
            type: 'int',
            isNullable: true,
            comment: 'FK lógica a parametro.id (tipo_entidad = Tropa)',
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
        name: 'FK_tropa_edificio',
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
        name: 'IDX_tropa_tipo',
        columnNames: ['tipo_parametro_id'],
      }),
    );

    // ============================================
    // TABLA: nivel_detalle
    // ============================================
    await queryRunner.createTable(
      new Table({
        name: 'nivel_detalle',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'tipo_entidad_parametro_id',
            type: 'int',
            isNullable: false,
            comment: 'FK lógica a parametro.id donde tipo=tipo_entidad',
          },
          {
            name: 'entidad_id',
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
            name: 'tipo_recurso_parametro_id',
            type: 'int',
            isNullable: true,
            comment: 'FK lógica a parametro.id donde tipo=tipo_recurso',
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
            name: 'desbloquea_en_ayuntamiento',
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
      'nivel_detalle',
      new TableUnique({
        name: 'UQ_nivel_detalle_tipo_entidad_id_nivel',
        columnNames: ['tipo_entidad_parametro_id', 'entidad_id', 'nivel'],
      }),
    );

    await queryRunner.createForeignKey(
      'nivel_detalle',
      new TableForeignKey({
        name: 'FK_nivel_detalle_ayuntamiento',
        columnNames: ['desbloquea_en_ayuntamiento'],
        referencedTableName: 'ayuntamiento',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createIndex(
      'nivel_detalle',
      new TableIndex({
        name: 'IDX_nivel_detalle_entidad',
        columnNames: ['entidad_id'],
      }),
    );

    await queryRunner.createIndex(
      'nivel_detalle',
      new TableIndex({
        name: 'IDX_nivel_detalle_entidad_tipo',
        columnNames: ['tipo_entidad_parametro_id'],
      }),
    );

    await queryRunner.createIndex(
      'nivel_detalle',
      new TableIndex({
        name: 'IDX_nivel_detalle_recurso',
        columnNames: ['tipo_recurso_parametro_id'],
      }),
    );

    // ============================================
    // TABLA: desbloqueos_ayuntamiento
    // ============================================
    await queryRunner.createTable(
      new Table({
        name: 'desbloqueos_ayuntamiento',
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
            name: 'tipo_entidad_parametro_id',
            type: 'int',
            isNullable: false,
            comment: 'FK lógica a parametro.id (tipo_entidad)',
          },
          {
            name: 'entidad_id',
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
      'desbloqueos_ayuntamiento',
      new TableUnique({
        name: 'UQ_desbloqueos_ayuntamiento_ayuntamiento_tipo_entidad',
        columnNames: ['ayuntamiento_id', 'tipo_entidad_parametro_id', 'entidad_id'],
      }),
    );

    await queryRunner.createForeignKey(
      'desbloqueos_ayuntamiento',
      new TableForeignKey({
        name: 'FK_desbloqueos_ayuntamiento_ayuntamiento',
        columnNames: ['ayuntamiento_id'],
        referencedTableName: 'ayuntamiento',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createIndex(
      'desbloqueos_ayuntamiento',
      new TableIndex({
        name: 'IDX_desbloqueos_tipo',
        columnNames: ['tipo_entidad_parametro_id'],
      }),
    );

    await queryRunner.createIndex(
      'desbloqueos_ayuntamiento',
      new TableIndex({
        name: 'IDX_desbloqueos_entidad',
        columnNames: ['entidad_id'],
      }),
    );

    // Crear trigger para actualizar fecha_actualizacion automáticamente
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.fecha_actualizacion = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ language 'plpgsql';
    `);

    // Aplicar trigger a todas las tablas
    const tables = [
      'parametro',
      'ayuntamiento',
      'edificio',
      'heroe',
      'hechizo',
      'animal',
      'tropa',
      'nivel_detalle',
      'desbloqueos_ayuntamiento',
    ];

    for (const table of tables) {
      await queryRunner.query(`
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
      'desbloqueos_ayuntamiento',
      'nivel_detalle',
      'tropa',
      'animal',
      'hechizo',
      'heroe',
      'edificio',
      'ayuntamiento',
      'parametro',
    ];

    for (const table of tables) {
      await queryRunner.query(`DROP TRIGGER IF EXISTS update_${table}_updated_at ON ${table};`);
    }

    // Eliminar función
    await queryRunner.query(`DROP FUNCTION IF EXISTS update_updated_at_column();`);

    // Eliminar tablas en orden inverso
    await queryRunner.dropTable('desbloqueos_ayuntamiento', true);
    await queryRunner.dropTable('nivel_detalle', true);
    await queryRunner.dropTable('tropa', true);
    await queryRunner.dropTable('animal', true);
    await queryRunner.dropTable('hechizo', true);
    await queryRunner.dropTable('heroe', true);
    await queryRunner.dropTable('edificio', true);
    await queryRunner.dropTable('ayuntamiento', true);
    await queryRunner.dropTable('parametro', true);
  }
}

