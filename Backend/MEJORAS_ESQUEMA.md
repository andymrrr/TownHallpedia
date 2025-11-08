# 📊 Mejoras del Esquema de Base de Datos

## 🎯 Objetivos Alcanzados

✅ **ENUMs para tipos fijos** - Validación a nivel de BD  
✅ **Tablas separadas mantenidas** - Estructura clara y simple  
✅ **Mejor rendimiento** - Menos JOINs innecesarios  
✅ **Simplificación** - Código más claro y fácil de entender  
✅ **Parámetro optimizado** - Solo para valores configurables dinámicos  

---

## 📋 Comparación: Antes vs Después

### 1. **Tabla `parametro` - Antes (Sobrecargada)**

**Problema**: Se usaba para TODO (tipos de entidad, tipos de recurso, valores configurables, etc.)

```sql
-- Antes: Un solo tipo de tabla para todo
parametro:
  - tipo: 'tipo_entidad' | 'tipo_recurso' | 'tipo_edificio' | 'configuracion' | ...
  - clave: 'HEROE' | 'ORO' | 'DEFENSA' | 'max_niveles' | ...
```

**Después**: ENUMs para tipos fijos + parámetro solo para valores dinámicos

```sql
-- Ahora: ENUMs para tipos fijos
CREATE TYPE tipo_entidad AS ENUM ('EDIFICIO', 'TROPA', 'HECHIZO', 'HEROE', 'ANIMAL');
CREATE TYPE tipo_recurso AS ENUM ('ORO', 'ELIXIR', 'ELIXIR_OSCURO', 'GEMA');
CREATE TYPE tipo_edificio AS ENUM ('DEFENSA', 'RECURSO', 'TROPAS', ...);
CREATE TYPE tipo_tropa AS ENUM ('TIERRA', 'AIRE', 'ESPECIAL', 'SUPER');

-- Parámetro solo para valores configurables
parametro:
  - categoria: 'configuracion' | 'constantes' | 'mensajes'
  - clave: 'max_niveles' | 'tiempo_limite' | ...
```

**Beneficios**:
- ✅ Validación automática a nivel de BD
- ✅ Mejor rendimiento (menos JOINs)
- ✅ Código más claro y autodocumentado

---

### 2. **Tablas Separadas Mantenidas**

**Antes y Después**: Mantenemos las tablas separadas (más claro y simple)

```sql
-- Estructura clara: cada entidad en su propia tabla
heroe: id, nombre, descripcion, portada, tipo_recurso (ENUM), ...
tropa: id, nombre, descripcion, portada, tipo (ENUM), espacio_ejercito, ...
edificio: id, nombre, descripcion, portada, tipo (ENUM), ...
hechizo: id, nombre, descripcion, portada, tipo, espacio_hechizo, ...
animal: id, nombre, descripcion, portada, tipo, ...
```

**Beneficios**:
- ✅ Estructura clara y fácil de entender
- ✅ Cada tabla tiene solo lo que necesita
- ✅ Sin complejidad de tablas polimórficas

---

### 3. **Relaciones Polimórficas - Simplificadas**

**Problema**: Relaciones con JOINs a parámetro, validación compleja

```sql
-- Antes: JOIN a parámetro para obtener tipo
nivel_detalle:
  - tipo_entidad_parametro_id (FK a parametro) ❌ JOIN necesario
  - entidad_id (INTEGER sin FK)
  - ❌ Consulta requiere JOIN a parametro

desbloqueos_ayuntamiento:
  - tipo_entidad_parametro_id (FK a parametro) ❌ JOIN necesario
  - entidad_id (INTEGER sin FK)
  - ❌ Consulta requiere JOIN a parametro
```

**Después**: ENUM directo (sin JOIN), validación en aplicación

```sql
-- Ahora: ENUM directo, sin JOIN necesario
nivel_detalle:
  - tipo_entidad (ENUM) ✅ Validación automática
  - entidad_id (INTEGER - validado en aplicación según tipo)
  - ✅ Sin JOIN a parámetro

desbloqueos_ayuntamiento:
  - tipo_entidad (ENUM) ✅ Validación automática
  - entidad_id (INTEGER - validado en aplicación según tipo)
  - ✅ Sin JOIN a parámetro
```

**Beneficios**:
- ✅ Menos JOINs en consultas
- ✅ Validación de tipo garantizada por ENUM
- ✅ Código más simple

---

### 4. **Consultas - Antes vs Después**

#### Antes (Complejo):
```sql
-- Obtener desbloqueos con nombre de entidad
SELECT 
    d.*,
    p.valor as tipo_entidad,
    CASE p.valor
        WHEN 'HEROE' THEN h.nombre
        WHEN 'TROPA' THEN t.nombre
        WHEN 'HECHIZO' THEN hz.nombre
        -- ... más casos
    END as nombre_entidad
FROM desbloqueos_ayuntamiento d
JOIN parametro p ON d.tipo_entidad_parametro_id = p.id  -- ❌ JOIN innecesario
LEFT JOIN heroe h ON d.entidad_id = h.id AND p.valor = 'HEROE'
LEFT JOIN tropa t ON d.entidad_id = t.id AND p.valor = 'TROPA'
-- ... más JOINs
```

#### Después (Simple):
```sql
-- Obtener desbloqueos con nombre de entidad
SELECT 
    d.*,
    d.tipo_entidad,  -- ✅ ENUM directo, sin JOIN
    CASE d.tipo_entidad
        WHEN 'HEROE' THEN (SELECT nombre FROM heroe WHERE id = d.entidad_id)
        WHEN 'TROPA' THEN (SELECT nombre FROM tropa WHERE id = d.entidad_id)
        WHEN 'HECHIZO' THEN (SELECT nombre FROM hechizo WHERE id = d.entidad_id)
        WHEN 'EDIFICIO' THEN (SELECT nombre FROM edificio WHERE id = d.entidad_id)
        WHEN 'ANIMAL' THEN (SELECT nombre FROM animal WHERE id = d.entidad_id)
    END as nombre_entidad
FROM desbloqueos_ayuntamiento d;

-- O mejor aún, usar la vista:
SELECT * FROM v_desbloqueos_completos;
```

---

## 📊 Métricas de Mejora

| Métrica | Antes | Después | Mejora |
|---------|-------|---------|--------|
| **Tablas** | 9 | 9 | Mismo número |
| **JOINs típicos** | 3-5 | 1-2 | 50-60% menos |
| **ENUMs** | 0 | 4 | Validación automática |
| **Validación de tipos** | En código | ENUMs | 100% en BD |
| **Consultas a parámetro** | Muchas | Menos | Solo valores dinámicos |

---

## 🔄 Migración desde el Esquema Anterior

### Paso 1: Crear ENUMs y actualizar campos
```sql
-- Crear los ENUMs
CREATE TYPE tipo_entidad AS ENUM ('EDIFICIO', 'TROPA', 'HECHIZO', 'HEROE', 'ANIMAL');
CREATE TYPE tipo_recurso AS ENUM ('ORO', 'ELIXIR', 'ELIXIR_OSCURO', 'GEMA');
CREATE TYPE tipo_edificio AS ENUM ('DEFENSA', 'RECURSO', 'TROPAS', 'ESPECIAL', 'HECHIZOS', 'ALMACEN', 'OTRO');
CREATE TYPE tipo_tropa AS ENUM ('TIERRA', 'AIRE', 'ESPECIAL', 'SUPER');

-- Actualizar heroe: tipo_recurso_parametro_id → tipo_recurso (ENUM)
UPDATE heroe h
SET tipo_recurso = (SELECT p.valor::tipo_recurso 
                    FROM parametro p 
                    WHERE p.id = h.tipo_recurso_parametro_id 
                    AND p.tipo = 'tipo_recurso');

-- Actualizar edificio: tipo_parametro_id → tipo (ENUM)
UPDATE edificio e
SET tipo = (SELECT p.valor::tipo_edificio 
            FROM parametro p 
            WHERE p.id = e.tipo_parametro_id 
            AND p.tipo = 'tipo_edificio');

-- Similar para tropa, ayuntamiento, etc.
```

### Paso 2: Actualizar `nivel_detalle`
```sql
-- Convertir tipo_entidad_parametro_id → tipo_entidad (ENUM)
UPDATE nivel_detalle nd
SET tipo_entidad = (SELECT p.valor::tipo_entidad 
                    FROM parametro p 
                    WHERE p.id = nd.tipo_entidad_parametro_id 
                    AND p.tipo = 'tipo_entidad');

-- Convertir tipo_recurso_parametro_id → tipo_recurso (ENUM)
UPDATE nivel_detalle nd
SET tipo_recurso = (SELECT p.valor::tipo_recurso 
                    FROM parametro p 
                    WHERE p.id = nd.tipo_recurso_parametro_id 
                    AND p.tipo = 'tipo_recurso');
```

### Paso 3: Actualizar `desbloqueos_ayuntamiento`
```sql
-- Convertir tipo_entidad_parametro_id → tipo_entidad (ENUM)
UPDATE desbloqueos_ayuntamiento da
SET tipo_entidad = (SELECT p.valor::tipo_entidad 
                    FROM parametro p 
                    WHERE p.id = da.tipo_entidad_parametro_id 
                    AND p.tipo = 'tipo_entidad');
```

### Paso 4: Eliminar columnas antiguas
```sql
-- Eliminar columnas de FK a parametro que ya no se usan
ALTER TABLE heroe DROP COLUMN tipo_recurso_parametro_id;
ALTER TABLE edificio DROP COLUMN tipo_parametro_id;
ALTER TABLE tropa DROP COLUMN tipo_parametro_id;
ALTER TABLE nivel_detalle DROP COLUMN tipo_entidad_parametro_id;
ALTER TABLE nivel_detalle DROP COLUMN tipo_recurso_parametro_id;
ALTER TABLE desbloqueos_ayuntamiento DROP COLUMN tipo_entidad_parametro_id;
```

---

## 🎨 Ventajas Adicionales

### Vistas Útiles
```sql
-- Vista pre-construida para consultas comunes
SELECT * FROM v_desbloqueos_completos WHERE nivel_ayuntamiento = 12;
SELECT * FROM v_nivel_detalle_completo WHERE tipo_entidad = 'TROPA';
```

### Índices Optimizados
- Índices en ENUMs para búsquedas rápidas
- Índices compuestos para consultas comunes
- Mejor rendimiento en búsquedas por tipo

### Type Safety
- ENUMs garantizan valores válidos a nivel de BD
- Validación automática sin necesidad de código
- Menos errores de tipado

### Estructura Clara
- Tablas separadas fáciles de entender
- Cada tabla tiene su propósito específico
- Sin complejidad de tablas polimórficas

---

## 🚀 Próximos Pasos Recomendados

1. **Probar el esquema** con datos de prueba
2. **Crear script de migración** automatizado
3. **Actualizar entidades TypeORM** para usar el nuevo esquema
4. **Actualizar servicios** para aprovechar las nuevas vistas
5. **Documentar cambios** en la API

---

## ❓ Preguntas Frecuentes

**Q: ¿Qué pasa con los datos existentes?**  
R: Se necesita un script de migración que transforme los datos al nuevo formato.

**Q: ¿Los ENUMs son extensibles?**  
R: Sí, puedes agregar nuevos valores con `ALTER TYPE tipo_entidad ADD VALUE 'NUEVO_TIPO';`

**Q: ¿Qué pasa si necesito tipos dinámicos?**  
R: Para tipos realmente dinámicos, puedes usar la tabla `parametro` o agregar un campo VARCHAR (como en `hechizo.tipo` y `animal.tipo`).

**Q: ¿Esto rompe el código existente?**  
R: Sí, necesitarás actualizar las entidades TypeORM y servicios para usar ENUMs en lugar de FKs a parámetro, pero el código será más simple.

**Q: ¿Por qué mantener tablas separadas en lugar de una tabla "entidad"?**  
R: Por simplicidad y claridad. Cada tabla tiene sus campos específicos y es más fácil de entender y mantener.

