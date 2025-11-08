-- ============================================================================
-- SCRIPT SQL: ESQUEMA COMPLETO DE BASE DE DATOS
-- TownHallpedia Backend
-- ============================================================================

-- ----------------------------------------------------------------------------
-- TABLA: parametro
-- Descripción: Almacena parámetros configurables del sistema (tipos, recursos, etc.)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "parametro" (
    "id" SERIAL PRIMARY KEY,
    "tipo" VARCHAR(50) NOT NULL,
    "clave" VARCHAR(100) NOT NULL,
    "valor" VARCHAR(200) NULL,
    "descripcion" TEXT NULL,
    "fecha_creacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UQ_parametro_tipo_clave" UNIQUE ("tipo", "clave")
);

CREATE INDEX IF NOT EXISTS "IDX_parametro_tipo_clave" ON "parametro" ("tipo", "clave");

-- ----------------------------------------------------------------------------
-- TABLA: ayuntamiento
-- Descripción: Niveles de ayuntamiento (Town Hall) con sus características
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "ayuntamiento" (
    "id" SERIAL PRIMARY KEY,
    "nivel" INTEGER NOT NULL,
    "capacidad_almacen_oro" INTEGER NULL,
    "capacidad_almacen_elixir" INTEGER NULL,
    "capacidad_almacen_oscuro" INTEGER NULL,
    "tiempo_construccion_horas" INTEGER NULL,
    "costo_mejora" INTEGER NULL,
    "tipo_recurso_parametro_id" INTEGER NULL,
    "portada" VARCHAR(300) NULL,
    "fecha_creacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UQ_ayuntamiento_nivel" UNIQUE ("nivel"),
    CONSTRAINT "FK_ayuntamiento_tipo_recurso" FOREIGN KEY ("tipo_recurso_parametro_id") 
        REFERENCES "parametro"("id") ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS "IDX_ayuntamiento_nivel" ON "ayuntamiento" ("nivel");

-- ----------------------------------------------------------------------------
-- TABLA: edificio
-- Descripción: Edificios disponibles en el juego
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "edificio" (
    "id" SERIAL PRIMARY KEY,
    "nombre" VARCHAR(100) NOT NULL,
    "tipo_parametro_id" INTEGER NULL,
    "descripcion" TEXT NULL,
    "portada" VARCHAR(300) NULL,
    "fecha_creacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "FK_edificio_tipo_parametro" FOREIGN KEY ("tipo_parametro_id") 
        REFERENCES "parametro"("id") ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS "IDX_edificio_nombre" ON "edificio" ("nombre");

-- ----------------------------------------------------------------------------
-- TABLA: heroe
-- Descripción: Héroes del juego (Rey Bárbaro, Reina Arquera, etc.)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "heroe" (
    "id" SERIAL PRIMARY KEY,
    "nombre" VARCHAR(100) NOT NULL,
    "descripcion" TEXT NULL,
    "tipo_recurso_parametro_id" INTEGER NULL,
    "portada" VARCHAR(300) NULL,
    "fecha_creacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "FK_heroe_tipo_recurso" FOREIGN KEY ("tipo_recurso_parametro_id") 
        REFERENCES "parametro"("id") ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS "IDX_heroe_nombre" ON "heroe" ("nombre");

-- ----------------------------------------------------------------------------
-- TABLA: tropa
-- Descripción: Tropas disponibles en el juego
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "tropa" (
    "id" SERIAL PRIMARY KEY,
    "nombre" VARCHAR(100) NOT NULL,
    "tipo_parametro_id" INTEGER NULL,
    "espacio_ejercito" INTEGER NULL,
    "descripcion" TEXT NULL,
    "portada" VARCHAR(300) NULL,
    "desbloquea_en_cuartel" INTEGER NULL,
    "fecha_creacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "FK_tropa_tipo_parametro" FOREIGN KEY ("tipo_parametro_id") 
        REFERENCES "parametro"("id") ON DELETE SET NULL,
    CONSTRAINT "FK_tropa_desbloquea_cuartel" FOREIGN KEY ("desbloquea_en_cuartel") 
        REFERENCES "edificio"("id") ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS "IDX_tropa_nombre" ON "tropa" ("nombre");

-- ----------------------------------------------------------------------------
-- TABLA: hechizo
-- Descripción: Hechizos disponibles en el juego
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "hechizo" (
    "id" SERIAL PRIMARY KEY,
    "nombre" VARCHAR(100) NOT NULL,
    "tipo_parametro_id" INTEGER NULL,
    "espacio_hechizo" INTEGER NULL,
    "descripcion" TEXT NULL,
    "portada" VARCHAR(300) NULL,
    "fecha_creacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "FK_hechizo_tipo_parametro" FOREIGN KEY ("tipo_parametro_id") 
        REFERENCES "parametro"("id") ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS "IDX_hechizo_nombre" ON "hechizo" ("nombre");

-- ----------------------------------------------------------------------------
-- TABLA: animal
-- Descripción: Animales (mascotas) disponibles en el juego
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "animal" (
    "id" SERIAL PRIMARY KEY,
    "nombre" VARCHAR(100) NOT NULL,
    "descripcion" TEXT NULL,
    "tipo_parametro_id" INTEGER NULL,
    "portada" VARCHAR(300) NULL,
    "fecha_creacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "FK_animal_tipo_parametro" FOREIGN KEY ("tipo_parametro_id") 
        REFERENCES "parametro"("id") ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS "IDX_animal_nombre" ON "animal" ("nombre");

-- ----------------------------------------------------------------------------
-- TABLA: nivel_detalle
-- Descripción: Detalles de niveles para entidades (héroes, tropas, hechizos, edificios)
-- Nota: entidadId es polimórfico - puede referenciar a heroe, tropa, hechizo, edificio o animal
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "nivel_detalle" (
    "id" SERIAL PRIMARY KEY,
    "tipo_entidad_parametro_id" INTEGER NOT NULL,
    "entidad_id" INTEGER NOT NULL,
    "nivel" INTEGER NOT NULL,
    "costo_mejora" INTEGER NULL,
    "tipo_recurso_parametro_id" INTEGER NULL,
    "tiempo_horas" INTEGER NULL,
    "dano_por_segundo" FLOAT NULL,
    "vida" INTEGER NULL,
    "capacidad" INTEGER NULL,
    "desbloquea_en_ayuntamiento" INTEGER NULL,
    "fecha_creacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UQ_nivel_detalle_tipo_entidad_entidad_nivel" UNIQUE ("tipo_entidad_parametro_id", "entidad_id", "nivel"),
    CONSTRAINT "FK_nivel_detalle_tipo_entidad" FOREIGN KEY ("tipo_entidad_parametro_id") 
        REFERENCES "parametro"("id") ON DELETE CASCADE,
    CONSTRAINT "FK_nivel_detalle_tipo_recurso" FOREIGN KEY ("tipo_recurso_parametro_id") 
        REFERENCES "parametro"("id") ON DELETE SET NULL,
    CONSTRAINT "FK_nivel_detalle_ayuntamiento" FOREIGN KEY ("desbloquea_en_ayuntamiento") 
        REFERENCES "ayuntamiento"("id") ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS "IDX_nivel_detalle_tipo_entidad_entidad_nivel" 
    ON "nivel_detalle" ("tipo_entidad_parametro_id", "entidad_id", "nivel");

-- ----------------------------------------------------------------------------
-- TABLA: desbloqueos_ayuntamiento
-- Descripción: Relación entre ayuntamientos y entidades desbloqueadas
-- Nota: entidadId es polimórfico - puede referenciar a heroe, tropa, hechizo, edificio o animal
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "desbloqueos_ayuntamiento" (
    "id" SERIAL PRIMARY KEY,
    "ayuntamiento_id" INTEGER NOT NULL,
    "tipo_entidad_parametro_id" INTEGER NOT NULL,
    "entidad_id" INTEGER NOT NULL,
    "nivel_minimo_disponible" INTEGER NULL,
    "nivel_maximo_disponible" INTEGER NULL,
    "fecha_creacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UQ_desbloqueos_ayuntamiento_ayuntamiento_tipo_entidad" 
        UNIQUE ("ayuntamiento_id", "tipo_entidad_parametro_id", "entidad_id"),
    CONSTRAINT "FK_desbloqueos_ayuntamiento" FOREIGN KEY ("ayuntamiento_id") 
        REFERENCES "ayuntamiento"("id") ON DELETE CASCADE,
    CONSTRAINT "FK_desbloqueos_tipo_entidad" FOREIGN KEY ("tipo_entidad_parametro_id") 
        REFERENCES "parametro"("id") ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "IDX_desbloqueos_ayuntamiento_tipo_entidad_entidad" 
    ON "desbloqueos_ayuntamiento" ("ayuntamiento_id", "tipo_entidad_parametro_id", "entidad_id");

-- ============================================================================
-- COMENTARIOS SOBRE RELACIONES POLIMÓRFICAS
-- ============================================================================
-- 
-- NOTA IMPORTANTE: Las siguientes columnas usan relaciones polimórficas:
-- 
-- 1. nivel_detalle.entidad_id:
--    - Puede referenciar: heroe.id, tropa.id, hechizo.id, edificio.id, animal.id
--    - El tipo se determina por: tipo_entidad_parametro_id
--    - No hay Foreign Key directa por limitaciones de SQL
-- 
-- 2. desbloqueos_ayuntamiento.entidad_id:
--    - Puede referenciar: heroe.id, tropa.id, hechizo.id, edificio.id, animal.id
--    - El tipo se determina por: tipo_entidad_parametro_id
--    - No hay Foreign Key directa por limitaciones de SQL
-- 
-- ============================================================================


