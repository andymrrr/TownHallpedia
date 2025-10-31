import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedInitialData1729968000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Asegurar columnas 'portada' en tablas principales
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "ayuntamiento" ADD COLUMN IF NOT EXISTS "portada" varchar(300)`
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "edificio" ADD COLUMN IF NOT EXISTS "portada" varchar(300)`
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "tropa" ADD COLUMN IF NOT EXISTS "portada" varchar(300)`
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "hechizo" ADD COLUMN IF NOT EXISTS "portada" varchar(300)`
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "heroe" ADD COLUMN IF NOT EXISTS "portada" varchar(300)`
    );

    // Seed: Ayuntamientos (niveles 1..15)
    const ayunValues: Array<{ nivel: number; portada: string | null }> = Array.from(
      { length: 15 },
      (_, i) => ({ nivel: i + 1, portada: null })
    );
    for (const a of ayunValues) {
      await queryRunner.query(
        `INSERT INTO "ayuntamiento" ("nivel")
         SELECT $1
         WHERE NOT EXISTS (SELECT 1 FROM "ayuntamiento" WHERE "nivel" = $1)`,
        [a.nivel]
      );
    }

    // Seed: Edificios base
    type BuildingSeed = { nombre: string; tipo?: string | null; portada?: string | null; descripcion?: string | null };
    const edificios: BuildingSeed[] = [
      { nombre: 'Cuartel', tipo: 'Ejército' },
      { nombre: 'Cuartel Oscuro', tipo: 'Ejército' },
      { nombre: 'Laboratorio', tipo: 'Ejército' },
      { nombre: 'Fábrica de Hechizos', tipo: 'Ejército' },
      { nombre: 'Fábrica de Hechizos Oscuros', tipo: 'Ejército' },
      { nombre: 'Campamento de Ejército', tipo: 'Ejército' },
      { nombre: 'Almacén de Oro', tipo: 'Recurso' },
      { nombre: 'Almacén de Elixir', tipo: 'Recurso' },
      { nombre: 'Almacén de Elixir Oscuro', tipo: 'Recurso' },
    ];
    for (const e of edificios) {
      await queryRunner.query(
        `INSERT INTO "edificio" ("nombre", "tipo", "portada")
         SELECT $1::varchar, $2::varchar, $3::varchar
         WHERE NOT EXISTS (SELECT 1 FROM "edificio" WHERE "nombre" = $1::varchar)`,
        [e.nombre, e.tipo ?? null, e.portada ?? null]
      );
    }

    // Seed: Héroes
    type HeroSeed = { nombre: string; tipoRecurso: string | null; portada?: string | null; };
    const heroes: HeroSeed[] = [
      { nombre: 'Rey Bárbaro', tipoRecurso: 'Elixir Oscuro' },
      { nombre: 'Reina Arquera', tipoRecurso: 'Elixir Oscuro' },
      { nombre: 'Gran Centinela', tipoRecurso: 'Elixir' },
      { nombre: 'Campeona Real', tipoRecurso: 'Elixir Oscuro' },
    ];
    for (const h of heroes) {
      await queryRunner.query(
        `INSERT INTO "heroe" ("nombre", "tipo_recurso", "portada")
         SELECT $1::varchar, $2::varchar, $3::varchar
         WHERE NOT EXISTS (SELECT 1 FROM "heroe" WHERE "nombre" = $1::varchar)`,
        [h.nombre, h.tipoRecurso, h.portada ?? null]
      );
    }

    // Seed: Hechizos (lista base)
    type SpellSeed = { nombre: string; tipo?: string | null; portada?: string | null; };
    const hechizos: SpellSeed[] = [
      { nombre: 'Rayo', tipo: 'Normal' },
      { nombre: 'Curación', tipo: 'Normal' },
      { nombre: 'Furia', tipo: 'Normal' },
      { nombre: 'Salto', tipo: 'Normal' },
      { nombre: 'Hielo', tipo: 'Normal' },
      { nombre: 'Clon', tipo: 'Normal' },
      { nombre: 'Invisibilidad', tipo: 'Normal' },
      { nombre: 'Veneno', tipo: 'Oscuro' },
      { nombre: 'Terremoto', tipo: 'Oscuro' },
      { nombre: 'Aceleración', tipo: 'Oscuro' },
      { nombre: 'Esqueleto', tipo: 'Oscuro' },
      { nombre: 'Murciélago', tipo: 'Oscuro' },
    ];
    for (const s of hechizos) {
      await queryRunner.query(
        `INSERT INTO "hechizo" ("nombre", "tipo", "portada")
         SELECT $1::varchar, $2::varchar, $3::varchar
         WHERE NOT EXISTS (SELECT 1 FROM "hechizo" WHERE "nombre" = $1::varchar)`,
        [s.nombre, s.tipo ?? null, s.portada ?? null]
      );
    }

    // Seed: Tropas (lista base)
    type TroopSeed = { nombre: string; tipo?: string | null; portada?: string | null; };
    const tropas: TroopSeed[] = [
      { nombre: 'Bárbaro', tipo: 'Normal' },
      { nombre: 'Arquera', tipo: 'Normal' },
      { nombre: 'Gigante', tipo: 'Normal' },
      { nombre: 'Duende', tipo: 'Normal' },
      { nombre: 'Rompemuros', tipo: 'Normal' },
      { nombre: 'Globo', tipo: 'Normal' },
      { nombre: 'Mago', tipo: 'Normal' },
      { nombre: 'Sanadora', tipo: 'Normal' },
      { nombre: 'Dragón', tipo: 'Normal' },
      { nombre: 'P.E.K.K.A', tipo: 'Normal' },
      { nombre: 'Baby Dragón', tipo: 'Normal' },
      { nombre: 'Minero', tipo: 'Normal' },
      { nombre: 'Dragón Eléctrico', tipo: 'Normal' },
      { nombre: 'Yeti', tipo: 'Normal' },
      { nombre: 'Jinete de Dragón', tipo: 'Normal' },
      { nombre: 'Esbirro', tipo: 'Oscuro' },
      { nombre: 'Montapuercos', tipo: 'Oscuro' },
      { nombre: 'Valquiria', tipo: 'Oscuro' },
      { nombre: 'Gólem', tipo: 'Oscuro' },
      { nombre: 'Bruja', tipo: 'Oscuro' },
      { nombre: 'Sabueso de Lava', tipo: 'Oscuro' },
      { nombre: 'Lanzarrocas', tipo: 'Oscuro' },
      { nombre: 'Cazadora de Héroes', tipo: 'Oscuro' },
    ];
    for (const t of tropas) {
      await queryRunner.query(
        `INSERT INTO "tropa" ("nombre", "tipo", "portada")
         SELECT $1::varchar, $2::varchar, $3::varchar
         WHERE NOT EXISTS (SELECT 1 FROM "tropa" WHERE "nombre" = $1::varchar)`,
        [t.nombre, t.tipo ?? null, t.portada ?? null]
      );
    }

    // Desbloqueos por ayuntamiento (mínimo útil)
    // Ayuntamiento 1 desbloquea: Cuartel, Campamento de Ejército, Bárbaro
    await queryRunner.query(
      `INSERT INTO "desbloqueos_ayuntamiento" ("ayuntamiento_id", "tipo_entidad", "entidad_id")
       SELECT a.id, 'Edificio', e.id
       FROM ayuntamiento a, edificio e
       WHERE a.nivel = 1 AND e.nombre IN ('Cuartel','Campamento de Ejército')
       AND NOT EXISTS (
         SELECT 1 FROM desbloqueos_ayuntamiento d WHERE d.ayuntamiento_id = a.id AND d.tipo_entidad = 'Edificio' AND d.entidad_id = e.id
       )`
    );

    await queryRunner.query(
      `INSERT INTO "desbloqueos_ayuntamiento" ("ayuntamiento_id", "tipo_entidad", "entidad_id")
       SELECT a.id, 'Tropa', t.id
       FROM ayuntamiento a, tropa t
       WHERE a.nivel = 1 AND t.nombre IN ('Bárbaro')
       AND NOT EXISTS (
         SELECT 1 FROM desbloqueos_ayuntamiento d WHERE d.ayuntamiento_id = a.id AND d.tipo_entidad = 'Tropa' AND d.entidad_id = t.id
       )`
    );

    // Ayuntamiento 5 desbloquea: Fábrica de Hechizos, Hechizo Rayo
    await queryRunner.query(
      `INSERT INTO "desbloqueos_ayuntamiento" ("ayuntamiento_id", "tipo_entidad", "entidad_id")
       SELECT a.id, 'Edificio', e.id
       FROM ayuntamiento a, edificio e
       WHERE a.nivel = 5 AND e.nombre IN ('Fábrica de Hechizos')
       AND NOT EXISTS (
         SELECT 1 FROM desbloqueos_ayuntamiento d WHERE d.ayuntamiento_id = a.id AND d.tipo_entidad = 'Edificio' AND d.entidad_id = e.id
       )`
    );
    await queryRunner.query(
      `INSERT INTO "desbloqueos_ayuntamiento" ("ayuntamiento_id", "tipo_entidad", "entidad_id")
       SELECT a.id, 'Hechizo', h.id
       FROM ayuntamiento a, hechizo h
       WHERE a.nivel = 5 AND h.nombre IN ('Rayo')
       AND NOT EXISTS (
         SELECT 1 FROM desbloqueos_ayuntamiento d WHERE d.ayuntamiento_id = a.id AND d.tipo_entidad = 'Hechizo' AND d.entidad_id = h.id
       )`
    );

    // NivelDetalle mínimo (niveles 1-3 donde aplique) — datos mínimos coherentes
    // Tropas: Bárbaro (costos aproximados y tiempo)
    const nivelBarbaro = [
      { nivel: 1, costo: 25, recurso: 'Elixir', tiempo: 0, dano: 8, vida: 45 },
      { nivel: 2, costo: 40, recurso: 'Elixir', tiempo: 0, dano: 11, vida: 54 },
      { nivel: 3, costo: 60, recurso: 'Elixir', tiempo: 0, dano: 14, vida: 65 },
    ];
    for (const n of nivelBarbaro) {
      await queryRunner.query(
        `INSERT INTO "nivel_detalle" ("tipo_entidad","entidad_id","nivel","costo_mejora","tipo_recurso","tiempo_horas","dano_por_segundo","vida")
         SELECT 'Tropa', t.id, $1::int, $2::int, $3::varchar, $4::int, $5::float, $6::int
         FROM tropa t WHERE t.nombre = 'Bárbaro'
         AND NOT EXISTS (
           SELECT 1 FROM nivel_detalle nd WHERE nd.tipo_entidad='Tropa' AND nd.entidad_id=t.id AND nd.nivel=$1::int
         )`,
        [n.nivel, n.costo, n.recurso, n.tiempo, n.dano, n.vida]
      );
    }

    // Hechizo: Rayo (niveles 1-3, costo y tiempo básicos)
    const nivelRayo = [
      { nivel: 1, costo: 15000, recurso: 'Elixir', tiempo: 0, dano: 240, capacidad: null },
      { nivel: 2, costo: 16000, recurso: 'Elixir', tiempo: 0, dano: 280, capacidad: null },
      { nivel: 3, costo: 17000, recurso: 'Elixir', tiempo: 0, dano: 320, capacidad: null },
    ];
    for (const n of nivelRayo) {
      await queryRunner.query(
        `INSERT INTO "nivel_detalle" ("tipo_entidad","entidad_id","nivel","costo_mejora","tipo_recurso","tiempo_horas","dano_por_segundo","capacidad")
         SELECT 'Hechizo', h.id, $1::int, $2::int, $3::varchar, $4::int, $5::float, $6::int
         FROM hechizo h WHERE h.nombre = 'Rayo'
         AND NOT EXISTS (
           SELECT 1 FROM nivel_detalle nd WHERE nd.tipo_entidad='Hechizo' AND nd.entidad_id=h.id AND nd.nivel=$1::int
         )`,
        [n.nivel, n.costo, n.recurso, n.tiempo, n.dano, n.capacidad]
      );
    }

    // Héroe: Rey Bárbaro (niveles 1-3, costo en elixir oscuro y tiempo estimado)
    const nivelRey = [
      { nivel: 1, costo: 10000, recurso: 'Elixir Oscuro', tiempo: 12, vida: 1700 },
      { nivel: 2, costo: 12000, recurso: 'Elixir Oscuro', tiempo: 12, vida: 1746 },
      { nivel: 3, costo: 14000, recurso: 'Elixir Oscuro', tiempo: 12, vida: 1792 },
    ];
    for (const n of nivelRey) {
      await queryRunner.query(
        `INSERT INTO "nivel_detalle" ("tipo_entidad","entidad_id","nivel","costo_mejora","tipo_recurso","tiempo_horas","vida")
         SELECT 'Heroe', he.id, $1::int, $2::int, $3::varchar, $4::int, $5::int
         FROM heroe he WHERE he.nombre = 'Rey Bárbaro'
         AND NOT EXISTS (
           SELECT 1 FROM nivel_detalle nd WHERE nd.tipo_entidad='Heroe' AND nd.entidad_id=he.id AND nd.nivel=$1::int
         )`,
        [n.nivel, n.costo, n.recurso, n.tiempo, n.vida]
      );
    }

    // Edificio: Cuartel (niveles 1-3, costo y tiempo básicos)
    const nivelCuartel = [
      { nivel: 1, costo: 150, recurso: 'Oro', tiempo: 0, vida: 250 },
      { nivel: 2, costo: 250, recurso: 'Oro', tiempo: 0, vida: 290 },
      { nivel: 3, costo: 450, recurso: 'Oro', tiempo: 0, vida: 330 },
    ];
    for (const n of nivelCuartel) {
      await queryRunner.query(
        `INSERT INTO "nivel_detalle" ("tipo_entidad","entidad_id","nivel","costo_mejora","tipo_recurso","tiempo_horas","vida")
         SELECT 'Edificio', e.id, $1::int, $2::int, $3::varchar, $4::int, $5::int
         FROM edificio e WHERE e.nombre = 'Cuartel'
         AND NOT EXISTS (
           SELECT 1 FROM nivel_detalle nd WHERE nd.tipo_entidad='Edificio' AND nd.entidad_id=e.id AND nd.nivel=$1::int
         )`,
        [n.nivel, n.costo, n.recurso, n.tiempo, n.vida]
      );
    }

    // Nota: Edificios se pueden sembrar más adelante según necesidad
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revertir seeds (no borramos columnas para no romper datos futuros)
    await queryRunner.query(`DELETE FROM "tropa" WHERE "nombre" IN (
      'Bárbaro','Arquera','Gigante','Duende','Rompemuros','Globo','Mago','Sanadora','Dragón','P.E.K.K.A','Baby Dragón','Minero','Dragón Eléctrico','Yeti','Jinete de Dragón','Esbirro','Montapuercos','Valquiria','Gólem','Bruja','Sabueso de Lava','Lanzarrocas','Cazadora de Héroes'
    )`);
    await queryRunner.query(`DELETE FROM "hechizo" WHERE "nombre" IN (
      'Rayo','Curación','Furia','Salto','Hielo','Clon','Invisibilidad','Veneno','Terremoto','Aceleración','Esqueleto','Murciélago'
    )`);
    await queryRunner.query(`DELETE FROM "heroe" WHERE "nombre" IN (
      'Rey Bárbaro','Reina Arquera','Gran Centinela','Campeona Real'
    )`);
    // No eliminamos ayuntamientos por ser base; si se requiere:
    // await queryRunner.query(`DELETE FROM "ayuntamiento" WHERE "nivel" BETWEEN 1 AND 15`);
  }
}


