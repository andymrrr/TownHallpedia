-- ============================================================================
-- SCRIPT SQL: ESQUEMA MEJORADO DE BASE DE DATOS
-- TownHallpedia Backend - Versión Optimizada
-- ============================================================================
-- 
-- MEJORAS IMPLEMENTADAS:
-- 1. ENUMs para tipos fijos (reemplaza FK a parametro donde tiene sentido)
-- 2. Tabla recurso para manejar tipos de recursos (ORO, ELIXIR, ELIXIR_OSCURO, GEMA)
-- 3. Tablas separadas para cada tipo de entidad (sin relaciones polimórficas)
-- 4. Tablas de nivel_detalle separadas por tipo (heroe, tropa, hechizo, edificio, animal)
-- 5. Tablas de desbloqueos separadas por tipo con campo es_nuevo (BOOLEAN)
-- 6. Foreign Keys directas con integridad referencial garantizada
-- ============================================================================

-- ----------------------------------------------------------------------------
-- ENUMs: Tipos fijos del sistema (reemplazan parámetros innecesarios)
-- ----------------------------------------------------------------------------
CREATE TYPE tipo_edificio AS ENUM ('DEFENSA', 'RECURSO', 'TROPAS', 'ESPECIAL', 'HECHIZOS', 'ALMACEN', 'OTRO');
CREATE TYPE tipo_tropa AS ENUM ('TIERRA', 'AIRE', 'ESPECIAL', 'SUPER');

-- ----------------------------------------------------------------------------
-- TABLA: recurso
-- Descripción: Tipos de recursos disponibles en el juego
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "recurso" (
    "id" SERIAL PRIMARY KEY,
    "nombre" VARCHAR(50) NOT NULL UNIQUE,  -- Ej: 'ORO', 'ELIXIR', 'ELIXIR_OSCURO', 'GEMA'
    "descripcion" TEXT NULL,
    "fecha_creacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS "IDX_recurso_nombre" ON "recurso" ("nombre");

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
    "tipo_recurso_id" INTEGER NULL,  -- FK a recurso
    "portada" VARCHAR(300) NULL,
    "fecha_creacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UQ_ayuntamiento_nivel" UNIQUE ("nivel"),
    CONSTRAINT "FK_ayuntamiento_tipo_recurso" FOREIGN KEY ("tipo_recurso_id") 
        REFERENCES "recurso"("id") ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS "IDX_ayuntamiento_nivel" ON "ayuntamiento" ("nivel");
CREATE INDEX IF NOT EXISTS "IDX_ayuntamiento_tipo_recurso" ON "ayuntamiento" ("tipo_recurso_id");

-- ----------------------------------------------------------------------------
-- TABLA: edificio
-- Descripción: Edificios disponibles en el juego
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "edificio" (
    "id" SERIAL PRIMARY KEY,
    "nombre" VARCHAR(100) NOT NULL,
    "tipo" tipo_edificio NULL,  -- ENUM en lugar de FK a parametro
    "descripcion" TEXT NULL,
    "portada" VARCHAR(300) NULL,
    "fecha_creacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS "IDX_edificio_nombre" ON "edificio" ("nombre");
CREATE INDEX IF NOT EXISTS "IDX_edificio_tipo" ON "edificio" ("tipo");

-- ----------------------------------------------------------------------------
-- TABLA: heroe
-- Descripción: Héroes del juego (Rey Bárbaro, Reina Arquera, etc.)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "heroe" (
    "id" SERIAL PRIMARY KEY,
    "nombre" VARCHAR(100) NOT NULL,
    "descripcion" TEXT NULL,
    "tipo_recurso_id" INTEGER NULL,  -- FK a recurso
    "portada" VARCHAR(300) NULL,
    "fecha_creacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "FK_heroe_tipo_recurso" FOREIGN KEY ("tipo_recurso_id") 
        REFERENCES "recurso"("id") ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS "IDX_heroe_nombre" ON "heroe" ("nombre");
CREATE INDEX IF NOT EXISTS "IDX_heroe_tipo_recurso" ON "heroe" ("tipo_recurso_id");

-- ----------------------------------------------------------------------------
-- TABLA: tropa
-- Descripción: Tropas disponibles en el juego
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "tropa" (
    "id" SERIAL PRIMARY KEY,
    "nombre" VARCHAR(100) NOT NULL,
    "tipo" tipo_tropa NULL,  -- ENUM en lugar de FK a parametro
    "espacio_ejercito" INTEGER NULL,
    "descripcion" TEXT NULL,
    "portada" VARCHAR(300) NULL,
    "desbloquea_en_cuartel" INTEGER NULL,
    "fecha_creacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "FK_tropa_desbloquea_cuartel" FOREIGN KEY ("desbloquea_en_cuartel") 
        REFERENCES "edificio"("id") ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS "IDX_tropa_nombre" ON "tropa" ("nombre");
CREATE INDEX IF NOT EXISTS "IDX_tropa_tipo" ON "tropa" ("tipo");

-- ----------------------------------------------------------------------------
-- TABLA: hechizo
-- Descripción: Hechizos disponibles en el juego
-- Nota: Si hay tipos fijos de hechizos, se puede agregar un ENUM después
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "hechizo" (
    "id" SERIAL PRIMARY KEY,
    "nombre" VARCHAR(100) NOT NULL,
    "tipo" VARCHAR(50) NULL,  -- VARCHAR por ahora, se puede convertir a ENUM si hay tipos fijos
    "espacio_hechizo" INTEGER NULL,
    "descripcion" TEXT NULL,
    "portada" VARCHAR(300) NULL,
    "fecha_creacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS "IDX_hechizo_nombre" ON "hechizo" ("nombre");

-- ----------------------------------------------------------------------------
-- TABLA: animal
-- Descripción: Animales (mascotas) disponibles en el juego
-- Nota: Si hay tipos fijos de animales, se puede agregar un ENUM después
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "animal" (
    "id" SERIAL PRIMARY KEY,
    "nombre" VARCHAR(100) NOT NULL,
    "tipo" VARCHAR(50) NULL,  -- VARCHAR por ahora, se puede convertir a ENUM si hay tipos fijos
    "descripcion" TEXT NULL,
    "portada" VARCHAR(300) NULL,
    "fecha_creacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS "IDX_animal_nombre" ON "animal" ("nombre");

-- ----------------------------------------------------------------------------
-- TABLA: nivel_detalle_heroe
-- Descripción: Detalles de niveles para héroes
-- 
-- Esta tabla define las características de cada nivel de un héroe.
-- El campo "desbloquea_en_ayuntamiento_id" indica en qué ayuntamiento se desbloquea ese nivel específico.
-- Los rangos de niveles disponibles por ayuntamiento se definen en desbloqueos_ayuntamiento_heroe
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "nivel_detalle_heroe" (
    "id" SERIAL PRIMARY KEY,
    "heroe_id" INTEGER NOT NULL,
    "nivel" INTEGER NOT NULL,
    "costo_mejora" INTEGER NULL,
    "tipo_recurso_id" INTEGER NULL,  -- FK a recurso
    "tiempo_horas" INTEGER NULL,
    "dano_por_segundo" FLOAT NULL,
    "vida" INTEGER NULL,
    "capacidad" INTEGER NULL,
    "desbloquea_en_ayuntamiento_id" INTEGER NULL,
    "fecha_creacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UQ_nivel_detalle_heroe_heroe_nivel" UNIQUE ("heroe_id", "nivel"),
    CONSTRAINT "FK_nivel_detalle_heroe_heroe" FOREIGN KEY ("heroe_id") 
        REFERENCES "heroe"("id") ON DELETE CASCADE,
    CONSTRAINT "FK_nivel_detalle_heroe_ayuntamiento" FOREIGN KEY ("desbloquea_en_ayuntamiento_id") 
        REFERENCES "ayuntamiento"("id") ON DELETE SET NULL,
    CONSTRAINT "FK_nivel_detalle_heroe_tipo_recurso" FOREIGN KEY ("tipo_recurso_id") 
        REFERENCES "recurso"("id") ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS "IDX_nivel_detalle_heroe_heroe_nivel" 
    ON "nivel_detalle_heroe" ("heroe_id", "nivel");
CREATE INDEX IF NOT EXISTS "IDX_nivel_detalle_heroe_ayuntamiento" 
    ON "nivel_detalle_heroe" ("desbloquea_en_ayuntamiento_id");

-- ----------------------------------------------------------------------------
-- TABLA: nivel_detalle_tropa
-- Descripción: Detalles de niveles para tropas
-- 
-- Esta tabla define las características de cada nivel de una tropa.
-- El campo "desbloquea_en_ayuntamiento_id" indica en qué ayuntamiento se desbloquea ese nivel específico.
-- Los rangos de niveles disponibles por ayuntamiento se definen en desbloqueos_ayuntamiento_tropa
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "nivel_detalle_tropa" (
    "id" SERIAL PRIMARY KEY,
    "tropa_id" INTEGER NOT NULL,
    "nivel" INTEGER NOT NULL,
    "costo_mejora" INTEGER NULL,
    "tipo_recurso_id" INTEGER NULL,  -- FK a recurso
    "tiempo_horas" INTEGER NULL,
    "dano_por_segundo" FLOAT NULL,
    "vida" INTEGER NULL,
    "capacidad" INTEGER NULL,
    "desbloquea_en_ayuntamiento_id" INTEGER NULL,
    "fecha_creacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UQ_nivel_detalle_tropa_tropa_nivel" UNIQUE ("tropa_id", "nivel"),
    CONSTRAINT "FK_nivel_detalle_tropa_tropa" FOREIGN KEY ("tropa_id") 
        REFERENCES "tropa"("id") ON DELETE CASCADE,
    CONSTRAINT "FK_nivel_detalle_tropa_ayuntamiento" FOREIGN KEY ("desbloquea_en_ayuntamiento_id") 
        REFERENCES "ayuntamiento"("id") ON DELETE SET NULL,
    CONSTRAINT "FK_nivel_detalle_tropa_tipo_recurso" FOREIGN KEY ("tipo_recurso_id") 
        REFERENCES "recurso"("id") ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS "IDX_nivel_detalle_tropa_tropa_nivel" 
    ON "nivel_detalle_tropa" ("tropa_id", "nivel");
CREATE INDEX IF NOT EXISTS "IDX_nivel_detalle_tropa_ayuntamiento" 
    ON "nivel_detalle_tropa" ("desbloquea_en_ayuntamiento_id");

-- ----------------------------------------------------------------------------
-- TABLA: nivel_detalle_hechizo
-- Descripción: Detalles de niveles para hechizos
-- 
-- Esta tabla define las características de cada nivel de un hechizo.
-- El campo "desbloquea_en_ayuntamiento_id" indica en qué ayuntamiento se desbloquea ese nivel específico.
-- Los rangos de niveles disponibles por ayuntamiento se definen en desbloqueos_ayuntamiento_hechizo
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "nivel_detalle_hechizo" (
    "id" SERIAL PRIMARY KEY,
    "hechizo_id" INTEGER NOT NULL,
    "nivel" INTEGER NOT NULL,
    "costo_mejora" INTEGER NULL,
    "tipo_recurso_id" INTEGER NULL,  -- FK a recurso
    "tiempo_horas" INTEGER NULL,
    "dano_por_segundo" FLOAT NULL,
    "vida" INTEGER NULL,
    "capacidad" INTEGER NULL,
    "desbloquea_en_ayuntamiento_id" INTEGER NULL,
    "fecha_creacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UQ_nivel_detalle_hechizo_hechizo_nivel" UNIQUE ("hechizo_id", "nivel"),
    CONSTRAINT "FK_nivel_detalle_hechizo_hechizo" FOREIGN KEY ("hechizo_id") 
        REFERENCES "hechizo"("id") ON DELETE CASCADE,
    CONSTRAINT "FK_nivel_detalle_hechizo_ayuntamiento" FOREIGN KEY ("desbloquea_en_ayuntamiento_id") 
        REFERENCES "ayuntamiento"("id") ON DELETE SET NULL,
    CONSTRAINT "FK_nivel_detalle_hechizo_tipo_recurso" FOREIGN KEY ("tipo_recurso_id") 
        REFERENCES "recurso"("id") ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS "IDX_nivel_detalle_hechizo_hechizo_nivel" 
    ON "nivel_detalle_hechizo" ("hechizo_id", "nivel");
CREATE INDEX IF NOT EXISTS "IDX_nivel_detalle_hechizo_ayuntamiento" 
    ON "nivel_detalle_hechizo" ("desbloquea_en_ayuntamiento_id");

-- ----------------------------------------------------------------------------
-- TABLA: nivel_detalle_edificio
-- Descripción: Detalles de niveles para edificios
-- 
-- Esta tabla define las características de cada nivel de un edificio.
-- El campo "desbloquea_en_ayuntamiento_id" indica en qué ayuntamiento se desbloquea ese nivel específico.
-- Los rangos de niveles disponibles por ayuntamiento se definen en desbloqueos_ayuntamiento_edificio
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "nivel_detalle_edificio" (
    "id" SERIAL PRIMARY KEY,
    "edificio_id" INTEGER NOT NULL,
    "nivel" INTEGER NOT NULL,
    "costo_mejora" INTEGER NULL,
    "tipo_recurso_id" INTEGER NULL,  -- FK a recurso
    "tiempo_horas" INTEGER NULL,
    "dano_por_segundo" FLOAT NULL,
    "vida" INTEGER NULL,
    "capacidad" INTEGER NULL,
    "desbloquea_en_ayuntamiento_id" INTEGER NULL,
    "fecha_creacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UQ_nivel_detalle_edificio_edificio_nivel" UNIQUE ("edificio_id", "nivel"),
    CONSTRAINT "FK_nivel_detalle_edificio_edificio" FOREIGN KEY ("edificio_id") 
        REFERENCES "edificio"("id") ON DELETE CASCADE,
    CONSTRAINT "FK_nivel_detalle_edificio_ayuntamiento" FOREIGN KEY ("desbloquea_en_ayuntamiento_id") 
        REFERENCES "ayuntamiento"("id") ON DELETE SET NULL,
    CONSTRAINT "FK_nivel_detalle_edificio_tipo_recurso" FOREIGN KEY ("tipo_recurso_id") 
        REFERENCES "recurso"("id") ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS "IDX_nivel_detalle_edificio_edificio_nivel" 
    ON "nivel_detalle_edificio" ("edificio_id", "nivel");
CREATE INDEX IF NOT EXISTS "IDX_nivel_detalle_edificio_ayuntamiento" 
    ON "nivel_detalle_edificio" ("desbloquea_en_ayuntamiento_id");

-- ----------------------------------------------------------------------------
-- TABLA: nivel_detalle_animal
-- Descripción: Detalles de niveles para animales
-- 
-- Esta tabla define las características de cada nivel de un animal.
-- El campo "desbloquea_en_ayuntamiento_id" indica en qué ayuntamiento se desbloquea ese nivel específico.
-- Los rangos de niveles disponibles por ayuntamiento se definen en desbloqueos_ayuntamiento_animal
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "nivel_detalle_animal" (
    "id" SERIAL PRIMARY KEY,
    "animal_id" INTEGER NOT NULL,
    "nivel" INTEGER NOT NULL,
    "costo_mejora" INTEGER NULL,
    "tipo_recurso_id" INTEGER NULL,  -- FK a recurso
    "tiempo_horas" INTEGER NULL,
    "dano_por_segundo" FLOAT NULL,
    "vida" INTEGER NULL,
    "capacidad" INTEGER NULL,
    "desbloquea_en_ayuntamiento_id" INTEGER NULL,
    "fecha_creacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UQ_nivel_detalle_animal_animal_nivel" UNIQUE ("animal_id", "nivel"),
    CONSTRAINT "FK_nivel_detalle_animal_animal" FOREIGN KEY ("animal_id") 
        REFERENCES "animal"("id") ON DELETE CASCADE,
    CONSTRAINT "FK_nivel_detalle_animal_ayuntamiento" FOREIGN KEY ("desbloquea_en_ayuntamiento_id") 
        REFERENCES "ayuntamiento"("id") ON DELETE SET NULL,
    CONSTRAINT "FK_nivel_detalle_animal_tipo_recurso" FOREIGN KEY ("tipo_recurso_id") 
        REFERENCES "recurso"("id") ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS "IDX_nivel_detalle_animal_animal_nivel" 
    ON "nivel_detalle_animal" ("animal_id", "nivel");
CREATE INDEX IF NOT EXISTS "IDX_nivel_detalle_animal_ayuntamiento" 
    ON "nivel_detalle_animal" ("desbloquea_en_ayuntamiento_id");

-- ----------------------------------------------------------------------------
-- TABLA: desbloqueos_ayuntamiento_heroe
-- Descripción: Relación entre ayuntamientos y héroes desbloqueados
-- 
-- EJEMPLO: En el ayuntamiento nivel 5 se desbloquea el "Rey Bárbaro" (es_nuevo=TRUE)
--          con nivel_minimo_disponible=1 y nivel_maximo_disponible=10
--          Esto significa que el héroe se desbloquea por primera vez y puede mejorarse del nivel 1 al 10
--          En el ayuntamiento nivel 8 se pueden desbloquear niveles adicionales (es_nuevo=FALSE)
--          con nivel_minimo_disponible=11 y nivel_maximo_disponible=15
--          Los niveles individuales están definidos en nivel_detalle_heroe
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "desbloqueos_ayuntamiento_heroe" (
    "id" SERIAL PRIMARY KEY,
    "ayuntamiento_id" INTEGER NOT NULL,
    "heroe_id" INTEGER NOT NULL,
    "es_nuevo" BOOLEAN NOT NULL DEFAULT FALSE,  -- TRUE si es la primera vez que se desbloquea este héroe, FALSE si solo se desbloquean niveles adicionales
    "nivel_minimo_disponible" INTEGER NOT NULL,  -- Nivel mínimo del héroe disponible al desbloquearse
    "nivel_maximo_disponible" INTEGER NOT NULL,  -- Nivel máximo del héroe disponible al desbloquearse
    "fecha_creacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UQ_desbloqueos_ayuntamiento_heroe_ayuntamiento_heroe" 
        UNIQUE ("ayuntamiento_id", "heroe_id"),
    CONSTRAINT "FK_desbloqueos_ayuntamiento_heroe_ayuntamiento" FOREIGN KEY ("ayuntamiento_id") 
        REFERENCES "ayuntamiento"("id") ON DELETE CASCADE,
    CONSTRAINT "FK_desbloqueos_ayuntamiento_heroe_heroe" FOREIGN KEY ("heroe_id") 
        REFERENCES "heroe"("id") ON DELETE CASCADE,
    CONSTRAINT "CHK_desbloqueos_ayuntamiento_heroe_niveles" 
        CHECK ("nivel_maximo_disponible" >= "nivel_minimo_disponible")
);

CREATE INDEX IF NOT EXISTS "IDX_desbloqueos_ayuntamiento_heroe_ayuntamiento" 
    ON "desbloqueos_ayuntamiento_heroe" ("ayuntamiento_id");
CREATE INDEX IF NOT EXISTS "IDX_desbloqueos_ayuntamiento_heroe_heroe" 
    ON "desbloqueos_ayuntamiento_heroe" ("heroe_id");
CREATE INDEX IF NOT EXISTS "IDX_desbloqueos_ayuntamiento_heroe_es_nuevo" 
    ON "desbloqueos_ayuntamiento_heroe" ("es_nuevo");

-- ----------------------------------------------------------------------------
-- TABLA: desbloqueos_ayuntamiento_tropa
-- Descripción: Relación entre ayuntamientos y tropas desbloqueadas
-- 
-- EJEMPLO: En el ayuntamiento nivel 7 se desbloquea la "Tropa Bárbara" (es_nuevo=TRUE)
--          con nivel_minimo_disponible=1 y nivel_maximo_disponible=8
--          En el ayuntamiento nivel 10 se pueden desbloquear niveles adicionales (es_nuevo=FALSE)
--          con nivel_minimo_disponible=9 y nivel_maximo_disponible=12
--          Los niveles individuales están definidos en nivel_detalle_tropa
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "desbloqueos_ayuntamiento_tropa" (
    "id" SERIAL PRIMARY KEY,
    "ayuntamiento_id" INTEGER NOT NULL,
    "tropa_id" INTEGER NOT NULL,
    "es_nuevo" BOOLEAN NOT NULL DEFAULT FALSE,  -- TRUE si es la primera vez que se desbloquea esta tropa, FALSE si solo se desbloquean niveles adicionales
    "nivel_minimo_disponible" INTEGER NOT NULL,  -- Nivel mínimo de la tropa disponible al desbloquearse
    "nivel_maximo_disponible" INTEGER NOT NULL,  -- Nivel máximo de la tropa disponible al desbloquearse
    "fecha_creacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UQ_desbloqueos_ayuntamiento_tropa_ayuntamiento_tropa" 
        UNIQUE ("ayuntamiento_id", "tropa_id"),
    CONSTRAINT "FK_desbloqueos_ayuntamiento_tropa_ayuntamiento" FOREIGN KEY ("ayuntamiento_id") 
        REFERENCES "ayuntamiento"("id") ON DELETE CASCADE,
    CONSTRAINT "FK_desbloqueos_ayuntamiento_tropa_tropa" FOREIGN KEY ("tropa_id") 
        REFERENCES "tropa"("id") ON DELETE CASCADE,
    CONSTRAINT "CHK_desbloqueos_ayuntamiento_tropa_niveles" 
        CHECK ("nivel_maximo_disponible" >= "nivel_minimo_disponible")
);

CREATE INDEX IF NOT EXISTS "IDX_desbloqueos_ayuntamiento_tropa_ayuntamiento" 
    ON "desbloqueos_ayuntamiento_tropa" ("ayuntamiento_id");
CREATE INDEX IF NOT EXISTS "IDX_desbloqueos_ayuntamiento_tropa_tropa" 
    ON "desbloqueos_ayuntamiento_tropa" ("tropa_id");
CREATE INDEX IF NOT EXISTS "IDX_desbloqueos_ayuntamiento_tropa_es_nuevo" 
    ON "desbloqueos_ayuntamiento_tropa" ("es_nuevo");

-- ----------------------------------------------------------------------------
-- TABLA: desbloqueos_ayuntamiento_hechizo
-- Descripción: Relación entre ayuntamientos y hechizos desbloqueados
-- 
-- EJEMPLO: En el ayuntamiento nivel 6 se desbloquea el "Rayo" (es_nuevo=TRUE)
--          con nivel_minimo_disponible=1 y nivel_maximo_disponible=7
--          En el ayuntamiento nivel 9 se pueden desbloquear niveles adicionales (es_nuevo=FALSE)
--          con nivel_minimo_disponible=8 y nivel_maximo_disponible=10
--          Los niveles individuales están definidos en nivel_detalle_hechizo
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "desbloqueos_ayuntamiento_hechizo" (
    "id" SERIAL PRIMARY KEY,
    "ayuntamiento_id" INTEGER NOT NULL,
    "hechizo_id" INTEGER NOT NULL,
    "es_nuevo" BOOLEAN NOT NULL DEFAULT FALSE,  -- TRUE si es la primera vez que se desbloquea este hechizo, FALSE si solo se desbloquean niveles adicionales
    "nivel_minimo_disponible" INTEGER NOT NULL,  -- Nivel mínimo del hechizo disponible al desbloquearse
    "nivel_maximo_disponible" INTEGER NOT NULL,  -- Nivel máximo del hechizo disponible al desbloquearse
    "fecha_creacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UQ_desbloqueos_ayuntamiento_hechizo_ayuntamiento_hechizo" 
        UNIQUE ("ayuntamiento_id", "hechizo_id"),
    CONSTRAINT "FK_desbloqueos_ayuntamiento_hechizo_ayuntamiento" FOREIGN KEY ("ayuntamiento_id") 
        REFERENCES "ayuntamiento"("id") ON DELETE CASCADE,
    CONSTRAINT "FK_desbloqueos_ayuntamiento_hechizo_hechizo" FOREIGN KEY ("hechizo_id") 
        REFERENCES "hechizo"("id") ON DELETE CASCADE,
    CONSTRAINT "CHK_desbloqueos_ayuntamiento_hechizo_niveles" 
        CHECK ("nivel_maximo_disponible" >= "nivel_minimo_disponible")
);

CREATE INDEX IF NOT EXISTS "IDX_desbloqueos_ayuntamiento_hechizo_ayuntamiento" 
    ON "desbloqueos_ayuntamiento_hechizo" ("ayuntamiento_id");
CREATE INDEX IF NOT EXISTS "IDX_desbloqueos_ayuntamiento_hechizo_hechizo" 
    ON "desbloqueos_ayuntamiento_hechizo" ("hechizo_id");
CREATE INDEX IF NOT EXISTS "IDX_desbloqueos_ayuntamiento_hechizo_es_nuevo" 
    ON "desbloqueos_ayuntamiento_hechizo" ("es_nuevo");

-- ----------------------------------------------------------------------------
-- TABLA: desbloqueos_ayuntamiento_edificio
-- Descripción: Relación entre ayuntamientos y edificios desbloqueados
-- 
-- EJEMPLO: En el ayuntamiento nivel 4 se desbloquea el "Cuartel" (es_nuevo=TRUE)
--          con nivel_minimo_disponible=1 y nivel_maximo_disponible=11
--          En el ayuntamiento nivel 7 se pueden desbloquear niveles adicionales (es_nuevo=FALSE)
--          con nivel_minimo_disponible=12 y nivel_maximo_disponible=15
--          Los niveles individuales están definidos en nivel_detalle_edificio
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "desbloqueos_ayuntamiento_edificio" (
    "id" SERIAL PRIMARY KEY,
    "ayuntamiento_id" INTEGER NOT NULL,
    "edificio_id" INTEGER NOT NULL,
    "es_nuevo" BOOLEAN NOT NULL DEFAULT FALSE,  -- TRUE si es la primera vez que se desbloquea este edificio, FALSE si solo se desbloquean niveles adicionales
    "nivel_minimo_disponible" INTEGER NOT NULL,  -- Nivel mínimo del edificio disponible al desbloquearse
    "nivel_maximo_disponible" INTEGER NOT NULL,  -- Nivel máximo del edificio disponible al desbloquearse
    "fecha_creacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UQ_desbloqueos_ayuntamiento_edificio_ayuntamiento_edificio" 
        UNIQUE ("ayuntamiento_id", "edificio_id"),
    CONSTRAINT "FK_desbloqueos_ayuntamiento_edificio_ayuntamiento" FOREIGN KEY ("ayuntamiento_id") 
        REFERENCES "ayuntamiento"("id") ON DELETE CASCADE,
    CONSTRAINT "FK_desbloqueos_ayuntamiento_edificio_edificio" FOREIGN KEY ("edificio_id") 
        REFERENCES "edificio"("id") ON DELETE CASCADE,
    CONSTRAINT "CHK_desbloqueos_ayuntamiento_edificio_niveles" 
        CHECK ("nivel_maximo_disponible" >= "nivel_minimo_disponible")
);

CREATE INDEX IF NOT EXISTS "IDX_desbloqueos_ayuntamiento_edificio_ayuntamiento" 
    ON "desbloqueos_ayuntamiento_edificio" ("ayuntamiento_id");
CREATE INDEX IF NOT EXISTS "IDX_desbloqueos_ayuntamiento_edificio_edificio" 
    ON "desbloqueos_ayuntamiento_edificio" ("edificio_id");
CREATE INDEX IF NOT EXISTS "IDX_desbloqueos_ayuntamiento_edificio_es_nuevo" 
    ON "desbloqueos_ayuntamiento_edificio" ("es_nuevo");

-- ----------------------------------------------------------------------------
-- TABLA: desbloqueos_ayuntamiento_animal
-- Descripción: Relación entre ayuntamientos y animales desbloqueados
-- 
-- EJEMPLO: En el ayuntamiento nivel 9 se desbloquea el "L.A.S.S.I" (es_nuevo=TRUE)
--          con nivel_minimo_disponible=1 y nivel_maximo_disponible=15
--          En el ayuntamiento nivel 12 se pueden desbloquear niveles adicionales (es_nuevo=FALSE)
--          con nivel_minimo_disponible=16 y nivel_maximo_disponible=20
--          Los niveles individuales están definidos en nivel_detalle_animal
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "desbloqueos_ayuntamiento_animal" (
    "id" SERIAL PRIMARY KEY,
    "ayuntamiento_id" INTEGER NOT NULL,
    "animal_id" INTEGER NOT NULL,
    "es_nuevo" BOOLEAN NOT NULL DEFAULT FALSE,  -- TRUE si es la primera vez que se desbloquea este animal, FALSE si solo se desbloquean niveles adicionales
    "nivel_minimo_disponible" INTEGER NOT NULL,  -- Nivel mínimo del animal disponible al desbloquearse
    "nivel_maximo_disponible" INTEGER NOT NULL,  -- Nivel máximo del animal disponible al desbloquearse
    "fecha_creacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UQ_desbloqueos_ayuntamiento_animal_ayuntamiento_animal" 
        UNIQUE ("ayuntamiento_id", "animal_id"),
    CONSTRAINT "FK_desbloqueos_ayuntamiento_animal_ayuntamiento" FOREIGN KEY ("ayuntamiento_id") 
        REFERENCES "ayuntamiento"("id") ON DELETE CASCADE,
    CONSTRAINT "FK_desbloqueos_ayuntamiento_animal_animal" FOREIGN KEY ("animal_id") 
        REFERENCES "animal"("id") ON DELETE CASCADE,
    CONSTRAINT "CHK_desbloqueos_ayuntamiento_animal_niveles" 
        CHECK ("nivel_maximo_disponible" >= "nivel_minimo_disponible")
);

CREATE INDEX IF NOT EXISTS "IDX_desbloqueos_ayuntamiento_animal_ayuntamiento" 
    ON "desbloqueos_ayuntamiento_animal" ("ayuntamiento_id");
CREATE INDEX IF NOT EXISTS "IDX_desbloqueos_ayuntamiento_animal_animal" 
    ON "desbloqueos_ayuntamiento_animal" ("animal_id");
CREATE INDEX IF NOT EXISTS "IDX_desbloqueos_ayuntamiento_animal_es_nuevo" 
    ON "desbloqueos_ayuntamiento_animal" ("es_nuevo");
