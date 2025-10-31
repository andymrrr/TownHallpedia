/**
 * Utilidad para manejar operaciones de cookies
 */
export class CookieUtil {
    
    /**
     * Establecer una cookie
     * @param name Nombre de la cookie
     * @param value Valor de la cookie
     * @param options Opciones adicionales (expires, path, domain, secure, sameSite)
     */
    static setCookie(
        name: string, 
        value: string, 
        options: {
            expires?: Date | number;
            path?: string;
            domain?: string;
            secure?: boolean;
            sameSite?: 'strict' | 'lax' | 'none';
        } = {}
    ): void {
        try {
            let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

            // Expires
            if (options.expires) {
                if (typeof options.expires === 'number') {
                    const date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                    cookieString += `; expires=${date.toUTCString()}`;
                } else {
                    cookieString += `; expires=${options.expires.toUTCString()}`;
                }
            }

            // Path
            if (options.path) {
                cookieString += `; path=${options.path}`;
            }

            // Domain
            if (options.domain) {
                cookieString += `; domain=${options.domain}`;
            }

            // Secure
            if (options.secure) {
                cookieString += `; secure`;
            }

            // SameSite
            if (options.sameSite) {
                cookieString += `; samesite=${options.sameSite}`;
            }

            document.cookie = cookieString;
        } catch (error) {
            console.error(`Error al establecer cookie (${name}):`, error);
        }
    }

    /**
     * Obtener el valor de una cookie
     * @param name Nombre de la cookie
     * @returns Valor de la cookie o null si no existe
     */
    static getCookie(name: string): string | null {
        try {
            const nameEQ = encodeURIComponent(name) + "=";
            const cookies = document.cookie.split(';');
            
            for (let cookie of cookies) {
                cookie = cookie.trim();
                if (cookie.indexOf(nameEQ) === 0) {
                    return decodeURIComponent(cookie.substring(nameEQ.length));
                }
            }
            return null;
        } catch (error) {
            console.error(`Error al obtener cookie (${name}):`, error);
            return null;
        }
    }

    /**
     * Eliminar una cookie
     * @param name Nombre de la cookie
     * @param path Ruta de la cookie (opcional)
     * @param domain Dominio de la cookie (opcional)
     */
    static removeCookie(name: string, path?: string, domain?: string): void {
        try {
            // Establecer la cookie con fecha de expiración en el pasado
            this.setCookie(name, '', {
                expires: new Date(0),
                path: path || '/',
                domain: domain
            });
        } catch (error) {
            console.error(`Error al eliminar cookie (${name}):`, error);
        }
    }

    /**
     * Verificar si existe una cookie
     * @param name Nombre de la cookie
     * @returns true si existe, false si no
     */
    static hasCookie(name: string): boolean {
        return this.getCookie(name) !== null;
    }

    /**
     * Obtener todas las cookies como objeto
     * @returns Objeto con todas las cookies
     */
    static getAllCookies(): Record<string, string> {
        try {
            const cookies: Record<string, string> = {};
            const cookieArray = document.cookie.split(';');
            
            for (let cookie of cookieArray) {
                cookie = cookie.trim();
                if (cookie) {
                    const [name, value] = cookie.split('=');
                    if (name && value) {
                        cookies[decodeURIComponent(name)] = decodeURIComponent(value);
                    }
                }
            }
            return cookies;
        } catch (error) {
            console.error('Error al obtener todas las cookies:', error);
            return {};
        }
    }

    /**
     * Limpiar todas las cookies (solo las del dominio actual)
     */
    static clearAllCookies(): void {
        try {
            const cookies = this.getAllCookies();
            for (const name in cookies) {
                this.removeCookie(name);
            }
        } catch (error) {
            console.error('Error al limpiar todas las cookies:', error);
        }
    }

    /**
     * Limpiar cookies de autenticación específicas
     */
    static clearAuthCookies(): void {
        const authCookies = ['auth-token', 'refresh-token', 'session-id', 'access-token'];
        authCookies.forEach(cookieName => {
            this.removeCookie(cookieName);
            // También intentar eliminar con diferentes dominios
            this.removeCookie(cookieName, '/', window.location.hostname);
            this.removeCookie(cookieName, '/', `.${window.location.hostname}`);
        });
    }

    /**
     * Establecer cookie de sesión (expira cuando se cierra el navegador)
     * @param name Nombre de la cookie
     * @param value Valor de la cookie
     * @param options Opciones adicionales
     */
    static setSessionCookie(
        name: string, 
        value: string, 
        options: {
            path?: string;
            domain?: string;
            secure?: boolean;
            sameSite?: 'strict' | 'lax' | 'none';
        } = {}
    ): void {
        this.setCookie(name, value, {
            ...options,
            // No establecer expires para que sea una cookie de sesión
        });
    }

    /**
     * Establecer cookie persistente
     * @param name Nombre de la cookie
     * @param value Valor de la cookie
     * @param days Días hasta que expire
     * @param options Opciones adicionales
     */
    static setPersistentCookie(
        name: string, 
        value: string, 
        days: number,
        options: {
            path?: string;
            domain?: string;
            secure?: boolean;
            sameSite?: 'strict' | 'lax' | 'none';
        } = {}
    ): void {
        this.setCookie(name, value, {
            ...options,
            expires: days
        });
    }
}
