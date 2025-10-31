import { LocalStorageUtil } from './LocalStorageUtil';
import { SessionStorageUtil } from './SessionStorageUtil';
import { CookieUtil } from './CookieUtil';
import type { StateStorage } from 'zustand/middleware';

/**
 * Manager principal para manejar todas las operaciones de storage
 * Proporciona una interfaz unificada para localStorage, sessionStorage y cookies
 */
export class StorageManager {
    
    // Claves predefinidas para autenticación
    private static readonly AUTH_KEYS = {
        AUTH_STORAGE: 'auth-storage',
        USER_DATA: 'user-data',
        TOKENS: 'tokens',
        ACCESS_TOKEN: 'access-token',
        REFRESH_TOKEN: 'refresh-token',
        SESSION_ID: 'session-id',
        REMEMBER: 'auth-remember'
    };

    /**
     * === MÉTODOS DE AUTENTICACIÓN ===
     */

    /**
     * Guardar datos de autenticación
     * @param authData Datos de autenticación
     */
    static saveAuthData(authData: any): void {
        try {
            LocalStorageUtil.setItem(this.AUTH_KEYS.AUTH_STORAGE, authData);
        } catch (error) {
            console.error('Error al guardar datos de autenticación:', error);
        }
    }

    /** Guardar datos de autenticación en sessionStorage */
    static saveAuthDataSession(authData: any): void {
        try {
            SessionStorageUtil.setItem(this.AUTH_KEYS.AUTH_STORAGE, authData);
        } catch (error) {
            console.error('Error al guardar datos de autenticación en sesión:', error);
        }
    }

    /**
     * Obtener datos de autenticación
     * @returns Datos de autenticación o null
     */
    static getAuthData<T = any>(): T | null {
        // Preferir sessionStorage si existe (cuando no se marcó "Recordar")
        const fromSession = SessionStorageUtil.getItem<T>(this.AUTH_KEYS.AUTH_STORAGE);
        if (fromSession) return fromSession;
        return LocalStorageUtil.getItem<T>(this.AUTH_KEYS.AUTH_STORAGE);
    }

    /**
     * Eliminar datos de autenticación
     */
    static removeAuthData(): void {
        LocalStorageUtil.removeItem(this.AUTH_KEYS.AUTH_STORAGE);
    }

    /**
     * Guardar tokens
     * @param tokens Objeto con los tokens
     */
    static saveTokens(tokens: { accessToken?: string; refreshToken?: string }): void {
        try {
            LocalStorageUtil.setItem(this.AUTH_KEYS.TOKENS, tokens);
            
            // También guardar en cookies para mayor seguridad
            if (tokens.accessToken) {
                CookieUtil.setPersistentCookie(this.AUTH_KEYS.ACCESS_TOKEN, tokens.accessToken, 7);
            }
            if (tokens.refreshToken) {
                CookieUtil.setPersistentCookie(this.AUTH_KEYS.REFRESH_TOKEN, tokens.refreshToken, 30);
            }
        } catch (error) {
            console.error('Error al guardar tokens:', error);
        }
    }

    /** Guardar tokens de forma de sesión (no persistentes) */
    static saveTokensSession(tokens: { accessToken?: string; refreshToken?: string }): void {
        try {
            SessionStorageUtil.setItem(this.AUTH_KEYS.TOKENS, tokens);

            // Guardar como cookies de sesión (sin expiración)
            if (tokens.accessToken) {
                CookieUtil.setSessionCookie(this.AUTH_KEYS.ACCESS_TOKEN, tokens.accessToken, { path: '/' });
            }
            if (tokens.refreshToken) {
                CookieUtil.setSessionCookie(this.AUTH_KEYS.REFRESH_TOKEN, tokens.refreshToken, { path: '/' });
            }
        } catch (error) {
            console.error('Error al guardar tokens de sesión:', error);
        }
    }

    /**
     * Obtener tokens
     * @returns Tokens o null
     */
    static getTokens(): { accessToken?: string; refreshToken?: string } | null {
        // Intentar desde sessionStorage primero
        let tokens = SessionStorageUtil.getItem<{ accessToken?: string; refreshToken?: string }>(this.AUTH_KEYS.TOKENS);
        if (tokens) return tokens;
        // Luego desde localStorage
        tokens = LocalStorageUtil.getItem<{ accessToken?: string; refreshToken?: string }>(this.AUTH_KEYS.TOKENS);
        if (tokens) return tokens;
        // Finalmente desde cookies
        const accessToken = CookieUtil.getCookie(this.AUTH_KEYS.ACCESS_TOKEN);
        const refreshToken = CookieUtil.getCookie(this.AUTH_KEYS.REFRESH_TOKEN);
        if (accessToken || refreshToken) {
            return { accessToken: accessToken || undefined, refreshToken: refreshToken || undefined };
        }
        return null;
    }

    /**
     * Eliminar tokens
     */
    static removeTokens(): void {
        LocalStorageUtil.removeItem(this.AUTH_KEYS.TOKENS);
        CookieUtil.removeCookie(this.AUTH_KEYS.ACCESS_TOKEN);
        CookieUtil.removeCookie(this.AUTH_KEYS.REFRESH_TOKEN);
    }

    /**
     * Guardar datos de usuario
     * @param userData Datos del usuario
     */
    static saveUserData(userData: any): void {
        try {
            LocalStorageUtil.setItem(this.AUTH_KEYS.USER_DATA, userData);
        } catch (error) {
            console.error('Error al guardar datos de usuario:', error);
        }
    }

    /** Guardar datos de usuario en sessionStorage */
    static saveUserDataSession(userData: any): void {
        try {
            SessionStorageUtil.setItem(this.AUTH_KEYS.USER_DATA, userData);
        } catch (error) {
            console.error('Error al guardar datos de usuario en sesión:', error);
        }
    }

    /**
     * Obtener datos de usuario
     * @returns Datos del usuario o null
     */
    static getUserData<T = any>(): T | null {
        const fromSession = SessionStorageUtil.getItem<T>(this.AUTH_KEYS.USER_DATA);
        if (fromSession) return fromSession;
        return LocalStorageUtil.getItem<T>(this.AUTH_KEYS.USER_DATA);
    }

    /**
     * Eliminar datos de usuario
     */
    static removeUserData(): void {
        LocalStorageUtil.removeItem(this.AUTH_KEYS.USER_DATA);
    }

    /**
     * === MÉTODOS DE LIMPIEZA ===
     */

    /**
     * Limpiar todos los datos de autenticación
     */
    static clearAuthData(): void {
        this.removeAuthData();
        this.removeTokens();
        this.removeUserData();
        CookieUtil.clearAuthCookies();
    }

    /**
     * Limpiar todo el storage
     */
    static clearAll(): void {
        LocalStorageUtil.clear();
        SessionStorageUtil.clear();
        CookieUtil.clearAllCookies();
    }

    /**
     * === MÉTODOS DE VERIFICACIÓN ===
     */

    /**
     * Verificar si hay datos de autenticación
     * @returns true si hay datos de auth, false si no
     */
    static hasAuthData(): boolean {
        return LocalStorageUtil.hasItem(this.AUTH_KEYS.AUTH_STORAGE) || 
               CookieUtil.hasCookie(this.AUTH_KEYS.ACCESS_TOKEN);
    }

    /**
     * Verificar si hay tokens
     * @returns true si hay tokens, false si no
     */
    static hasTokens(): boolean {
        return LocalStorageUtil.hasItem(this.AUTH_KEYS.TOKENS) || 
               CookieUtil.hasCookie(this.AUTH_KEYS.ACCESS_TOKEN);
    }

    /**
     * Verificar si hay datos de usuario
     * @returns true si hay datos de usuario, false si no
     */
    static hasUserData(): boolean {
        return LocalStorageUtil.hasItem(this.AUTH_KEYS.USER_DATA);
    }

    /**
     * Obtener información del storage
     * @returns Información del estado del storage
     */
    static getStorageInfo(): {
        hasAuth: boolean;
        hasTokens: boolean;
        hasUser: boolean;
        localStorageSize: number;
        sessionStorageKeys: number;
        cookiesCount: number;
    } {
        return {
            hasAuth: this.hasAuthData(),
            hasTokens: this.hasTokens(),
            hasUser: this.hasUserData(),
            localStorageSize: LocalStorageUtil.getSize(),
            sessionStorageKeys: SessionStorageUtil.getAllKeys().length,
            cookiesCount: Object.keys(CookieUtil.getAllCookies()).length
        };
    }

    /**
     * === MÉTODOS DE UTILIDAD ===
     */

    /**
     * Verificar si el storage está disponible
     * @returns true si está disponible, false si no
     */
    static isStorageAvailable(): {
        localStorage: boolean;
        sessionStorage: boolean;
        cookies: boolean;
    } {
        return {
            localStorage: LocalStorageUtil.isAvailable(),
            sessionStorage: SessionStorageUtil.isAvailable(),
            cookies: true // Las cookies siempre están disponibles en el navegador
        };
    }

    /**
     * Migrar datos de localStorage a sessionStorage
     * @param keys Claves a migrar
     */
    static migrateToSessionStorage(keys: string[]): void {
        keys.forEach(key => {
            const value = LocalStorageUtil.getItem(key);
            if (value !== null) {
                SessionStorageUtil.setItem(key, value);
                LocalStorageUtil.removeItem(key);
            }
        });
    }

    /**
     * Migrar datos de sessionStorage a localStorage
     * @param keys Claves a migrar
     */
    static migrateToLocalStorage(keys: string[]): void {
        keys.forEach(key => {
            const value = SessionStorageUtil.getItem(key);
            if (value !== null) {
                LocalStorageUtil.setItem(key, value);
                SessionStorageUtil.removeItem(key);
            }
        });
    }

    /** Preferencia global: recordar sesión (true) o solo sesión (false) */
    static setRememberSession(remember: boolean): void {
        try {
            LocalStorageUtil.setItem(this.AUTH_KEYS.REMEMBER, remember);
        } catch (error) {
            console.error('Error al establecer preferencia de recordar sesión:', error);
        }
    }

    static getRememberSession(): boolean {
        const val = LocalStorageUtil.getItem<boolean>(this.AUTH_KEYS.REMEMBER);
        return val === null ? true : !!val;
    }

    /** Storage proxy para persist de Zustand que decide en tiempo de ejecución */
    static getAuthPersistStorage(): StateStorage {
        const proxy: StateStorage = {
            getItem: (key: string): string | null => {
                return (this.getRememberSession() ? window.localStorage : window.sessionStorage).getItem(key);
            },
            setItem: (key: string, value: string): void => {
                (this.getRememberSession() ? window.localStorage : window.sessionStorage).setItem(key, value);
            },
            removeItem: (key: string): void => {
                (this.getRememberSession() ? window.localStorage : window.sessionStorage).removeItem(key);
            }
        };
        return proxy;
    }
}
