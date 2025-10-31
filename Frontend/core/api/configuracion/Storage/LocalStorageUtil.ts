/**
 * Utilidad para manejar operaciones de localStorage
 */
export class LocalStorageUtil {
    
    /**
     * Guardar un valor en localStorage
     * @param key Clave del valor
     * @param value Valor a guardar (se serializa automáticamente)
     */
    static setItem(key: string, value: any): void {
        try {
            const serializedValue = JSON.stringify(value);
            localStorage.setItem(key, serializedValue);
        } catch (error) {
            console.error(`Error al guardar en localStorage (${key}):`, error);
            throw new Error(`No se pudo guardar el valor en localStorage: ${key}`);
        }
    }

    /**
     * Obtener un valor de localStorage
     * @param key Clave del valor
     * @returns Valor deserializado o null si no existe
     */
    static getItem<T = any>(key: string): T | null {
        try {
            const item = localStorage.getItem(key);
            if (item === null) {
                return null;
            }
            return JSON.parse(item) as T;
        } catch (error) {
            console.error(`Error al obtener de localStorage (${key}):`, error);
            return null;
        }
    }

    /**
     * Eliminar un valor de localStorage
     * @param key Clave del valor a eliminar
     */
    static removeItem(key: string): void {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`Error al eliminar de localStorage (${key}):`, error);
        }
    }

    /**
     * Verificar si existe una clave en localStorage
     * @param key Clave a verificar
     * @returns true si existe, false si no
     */
    static hasItem(key: string): boolean {
        try {
            return localStorage.getItem(key) !== null;
        } catch (error) {
            console.error(`Error al verificar localStorage (${key}):`, error);
            return false;
        }
    }

    /**
     * Limpiar todo el localStorage
     */
    static clear(): void {
        try {
            localStorage.clear();
        } catch (error) {
            console.error('Error al limpiar localStorage:', error);
        }
    }

    /**
     * Obtener todas las claves de localStorage
     * @returns Array de claves
     */
    static getAllKeys(): string[] {
        try {
            const keys: string[] = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key) {
                    keys.push(key);
                }
            }
            return keys;
        } catch (error) {
            console.error('Error al obtener claves de localStorage:', error);
            return [];
        }
    }

    /**
     * Obtener el tamaño del localStorage en bytes
     * @returns Tamaño aproximado en bytes
     */
    static getSize(): number {
        try {
            let totalSize = 0;
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key) {
                    const value = localStorage.getItem(key);
                    if (value) {
                        totalSize += key.length + value.length;
                    }
                }
            }
            return totalSize;
        } catch (error) {
            console.error('Error al calcular tamaño de localStorage:', error);
            return 0;
        }
    }

    /**
     * Verificar si localStorage está disponible
     * @returns true si está disponible, false si no
     */
    static isAvailable(): boolean {
        try {
            const testKey = '__localStorage_test__';
            localStorage.setItem(testKey, 'test');
            localStorage.removeItem(testKey);
            return true;
        } catch (error) {
            return false;
        }
    }
}
