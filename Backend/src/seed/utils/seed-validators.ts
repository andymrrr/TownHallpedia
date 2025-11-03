import { SeedEntityException } from '../exceptions/seed.exception';

/**
 * Valida que un nombre no esté vacío
 */
export function validarNombre(nombre: string | null | undefined, entidad: string): asserts nombre is string {
  if (!nombre || nombre.trim().length === 0) {
    throw new SeedEntityException(entidad, 'El nombre no puede estar vacío', { nombre });
  }
}

/**
 * Valida que un nivel esté en un rango válido
 */
export function validarNivel(nivel: number, min: number, max: number, entidad: string): void {
  if (!Number.isInteger(nivel) || nivel < min || nivel > max) {
    throw new SeedEntityException(
      entidad,
      `El nivel debe estar entre ${min} y ${max}`,
      { nivel, min, max },
    );
  }
}

/**
 * Valida que un número sea positivo o cero
 */
export function validarNumeroPositivo(
  valor: number,
  campo: string,
  entidad: string,
  permitirCero = true,
): void {
  const min = permitirCero ? 0 : 1;
  if (!Number.isFinite(valor) || valor < min) {
    throw new SeedEntityException(
      entidad,
      `El campo ${campo} debe ser ${permitirCero ? 'mayor o igual a cero' : 'mayor que cero'}`,
      { campo, valor, min },
    );
  }
}

/**
 * Valida que una URL sea válida (si se proporciona)
 */
export function validarUrl(url: string | null | undefined, campo: string, entidad: string): void {
  if (url && url.trim().length > 0) {
    try {
      new URL(url);
    } catch {
      throw new SeedEntityException(
        entidad,
        `La URL en ${campo} no es válida`,
        { campo, url },
      );
    }
  }
}




