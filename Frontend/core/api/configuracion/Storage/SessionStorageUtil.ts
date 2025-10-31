/**
 * Utilidad para manejar operaciones de sessionStorage
 */
export class SessionStorageUtil {
    
    /**
     * Guardar un valor en sessionStorage
     * @param key Clave del valor
     * @param value Valor a guardar (se serializa automáticamente)
     */
    static setItem(key: string, value: any): void {
        try {
            const serializedValue = JSON.stringify(value);
            sessionStorage.setItem(key, serializedValue);
        } catch (error) {
            console.error(`Error al guardar en sessionStorage (${key}):`, error);
            throw new Error(`No se pudo guardar el valor en sessionStorage: ${key}`);
        }
    }

    /**
     * Obtener un valor de sessionStorage
     * @param key Clave del valor
     * @returns Valor deserializado o null si no existe
     */
    static getItem<T = any>(key: string): T | null {
        try {
            const item = sessionStorage.getItem(key);
            if (item === null) {
                return null;
            }
            return JSON.parse(item) as T;
        } catch (error) {
            console.error(`Error al obtener de sessionStorage (${key}):`, error);
            return null;
        }
    }

    /**
     * Eliminar un valor de sessionStorage
     * @param key Clave del valor a eliminar
     */
    static removeItem(key: string): void {
        try {
            sessionStorage.removeItem(key);
        } catch (error) {
            console.error(`Error al eliminar de sessionStorage (${key}):`, error);
        }
    }

    /**
     * Verificar si existe una clave en sessionStorage
     * @param key Clave a verificar
     * @returns true si existe, false si no
     */
    static hasItem(key: string): boolean {
        try {
            return sessionStorage.getItem(key) !== null;
        } catch (error) {
            console.error(`Error al verificar sessionStorage (${key}):`, error);
            return false;
        }
    }

    /**
     * Limpiar todo el sessionStorage
     */
    static clear(): void {
        try {
            sessionStorage.clear();
        } catch (error) {
            console.error('Error al limpiar sessionStorage:', error);
        }
    }

    /**
     * Obtener todas las claves de sessionStorage
     * @returns Array de claves
     */
    static getAllKeys(): string[] {
        try {
            const keys: string[] = [];
            for (let i = 0; i < sessionStorage.length; i++) {
                const key = sessionStorage.key(i);
                if (key) {
                    keys.push(key);
                }
            }
            return keys;
        } catch (error) {
            console.error('Error al obtener claves de sessionStorage:', error);
            return [];
        }
    }

    /**
     * Verificar si sessionStorage está disponible
     * @returns true si está disponible, false si no
     */
    static isAvailable(): boolean {
        try {
            const testKey = '__sessionStorage_test__';
            sessionStorage.setItem(testKey, 'test');
            sessionStorage.removeItem(testKey);
            return true;
        } catch (error) {
            return false;
        }
    }
}
