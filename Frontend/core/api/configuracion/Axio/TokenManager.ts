import { CONFIG } from './config';
import { TokenData } from './types';

// Intenta cargar RNStorage (RN) y/o StorageManager (web) de forma dinámica
let RNStorage: any = null;
let StorageManager: any = null;
try {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	RNStorage = require('../Storage/RNStorage').RNStorage;
} catch {}
try {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	StorageManager = require('../Storage/StorageManager').StorageManager;
} catch {}

// ==================== GESTIÓN DE TOKENS (CROSS-PLATFORM) ====================

export class TokenManager {
	private static readonly TOKEN_KEY = CONFIG.TOKEN_KEYS.ACCESS;
	private static readonly REFRESH_TOKEN_KEY = CONFIG.TOKEN_KEYS.REFRESH;

	// Caché en memoria para entornos sin storage sincrónico (RN) y acceso rápido
	private static inMemoryAccessToken: string | null = null;
	private static inMemoryRefreshToken: string | null = null;

	private static isWebStorageAvailable(): boolean {
		return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
	}

	private static readFromWebStorage(key: string): string | null {
		if (!this.isWebStorageAvailable()) return null;
		try {
			return window.localStorage.getItem(key);
		} catch {
			return null;
		}
	}

	private static writeToWebStorage(key: string, value: string): void {
		if (!this.isWebStorageAvailable()) return;
		try {
			window.localStorage.setItem(key, value);
		} catch {}
	}

	private static removeFromWebStorage(key: string): void {
		if (!this.isWebStorageAvailable()) return;
		try {
			window.localStorage.removeItem(key);
		} catch {}
	}

	static getToken(): string | null {
		if (this.inMemoryAccessToken) return this.inMemoryAccessToken;

		// Priorizar RNStorage (RN) y luego StorageManager (web)
		if (RNStorage?.getTokens) {
			const tokens = RNStorage.getTokens();
			if (tokens?.accessToken) {
				this.inMemoryAccessToken = tokens.accessToken;
				return tokens.accessToken;
			}
		}
		if (StorageManager?.getTokens) {
			const tokens = StorageManager.getTokens();
			if (tokens?.accessToken) {
				this.inMemoryAccessToken = tokens.accessToken;
				return tokens.accessToken;
			}
		}

		const fromLocal = this.readFromWebStorage(this.TOKEN_KEY);
		if (fromLocal) {
			this.inMemoryAccessToken = fromLocal;
		}
		return fromLocal;
	}

	static getAccessToken(): string | null {
		return this.getToken();
	}

	static setToken(token: string): void {
		this.inMemoryAccessToken = token;
		// Intentar guardar vía RNStorage o StorageManager
		if (RNStorage?.saveTokens) {
			RNStorage.saveTokens({ accessToken: token });
		}
		if (StorageManager?.saveTokens) {
			StorageManager.saveTokens({ accessToken: token });
		}
		this.writeToWebStorage(this.TOKEN_KEY, token);
	}

	static getRefreshToken(): string | null {
		if (this.inMemoryRefreshToken) return this.inMemoryRefreshToken;

		if (RNStorage?.getTokens) {
			const tokens = RNStorage.getTokens();
			if (tokens?.refreshToken) {
				this.inMemoryRefreshToken = tokens.refreshToken;
				return tokens.refreshToken;
			}
		}
		if (StorageManager?.getTokens) {
			const tokens = StorageManager.getTokens();
			if (tokens?.refreshToken) {
				this.inMemoryRefreshToken = tokens.refreshToken;
				return tokens.refreshToken;
			}
		}

		const fromLocal = this.readFromWebStorage(this.REFRESH_TOKEN_KEY);
		if (fromLocal) {
			this.inMemoryRefreshToken = fromLocal;
		}
		return fromLocal;
	}

	static setRefreshToken(token: string): void {
		this.inMemoryRefreshToken = token;
		if (RNStorage?.saveTokens) {
			RNStorage.saveTokens({ refreshToken: token });
		}
		if (StorageManager?.saveTokens) {
			StorageManager.saveTokens({ refreshToken: token });
		}
		this.writeToWebStorage(this.REFRESH_TOKEN_KEY, token);
	}

	static clearTokens(): void {
		this.inMemoryAccessToken = null;
		this.inMemoryRefreshToken = null;
		if (RNStorage?.removeTokens) {
			RNStorage.removeTokens();
		}
		if (StorageManager?.removeTokens) {
			StorageManager.removeTokens();
		}
		this.removeFromWebStorage(this.TOKEN_KEY);
		this.removeFromWebStorage(this.REFRESH_TOKEN_KEY);
	}

	static hasValidToken(): boolean {
		const token = this.getToken();
		if (!token) return false;

		const payload = this.safeDecodeJwtPayload(token);
		if (!payload || typeof payload.exp !== 'number') return false;

		const currentTimeSeconds = Math.floor(Date.now() / 1000);
		return payload.exp > currentTimeSeconds;
	}

	static setTokens(tokenData: TokenData): void {
		this.setToken(tokenData.access_token);
		if (tokenData.refresh_token) {
			this.setRefreshToken(tokenData.refresh_token);
		}
	}

	private static safeDecodeJwtPayload(token: string): any | null {
		const parts = token.split('.');
		if (parts.length < 2) return null;
		try {
			const base64 = parts[1]
				.replace(/-/g, '+')
				.replace(/_/g, '/');
			// Intentar con atob (web), si no, con Buffer (Node/RN metro), si no, fallback
			let json = '';
			if (typeof atob === 'function') {
				json = decodeURIComponent(
					Array.prototype.map
						.call(atob(base64), (c: string) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
						.join('')
				);
			} else if (typeof Buffer !== 'undefined') {
				json = Buffer.from(base64, 'base64').toString('utf-8');
			} else {
				return null;
			}
			return JSON.parse(json);
		} catch {
			return null;
		}
	}
} 