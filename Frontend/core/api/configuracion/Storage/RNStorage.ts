// Almacenamiento seguro para React Native (Expo):
// - Prioriza expo-secure-store para tokens sensibles
// - Fallback a @react-native-async-storage/async-storage si no hay SecureStore
// - Mantiene una caché en memoria para lecturas síncronas desde capas existentes

type TokenPair = { accessToken?: string; refreshToken?: string };

let SecureStore: any = null;
let AsyncStorage: any = null;

try {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	SecureStore = require('expo-secure-store');
} catch {}

try {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	AsyncStorage = require('@react-native-async-storage/async-storage').default;
} catch {}

const ACCESS_KEY = 'access-token';
const REFRESH_KEY = 'refresh-token';

let inMemory: TokenPair = { accessToken: undefined, refreshToken: undefined };
let initialized = false;
let initializingPromise: Promise<void> | null = null;

async function readSecure(key: string): Promise<string | null> {
	if (SecureStore?.getItemAsync) {
		try { return await SecureStore.getItemAsync(key); } catch { return null; }
	}
	if (AsyncStorage?.getItem) {
		try { return await AsyncStorage.getItem(key); } catch { return null; }
	}
	return null;
}

async function writeSecure(key: string, value: string | null): Promise<void> {
	if (value == null) {
		if (SecureStore?.deleteItemAsync) { try { await SecureStore.deleteItemAsync(key); } catch {} }
		if (AsyncStorage?.removeItem) { try { await AsyncStorage.removeItem(key); } catch {} }
		return;
	}
	if (SecureStore?.setItemAsync) { try { await SecureStore.setItemAsync(key, value); } catch {} }
	else if (AsyncStorage?.setItem) { try { await AsyncStorage.setItem(key, value); } catch {} }
}

export async function initializeRNStorage(): Promise<void> {
	if (initialized) return;
	if (!initializingPromise) {
		initializingPromise = (async () => {
			const [a, r] = await Promise.all([readSecure(ACCESS_KEY), readSecure(REFRESH_KEY)]);
			inMemory = { accessToken: a || undefined, refreshToken: r || undefined };
			initialized = true;
		})();
	}
	return initializingPromise;
}

export const RNStorage = {
	getTokens(): TokenPair | null {
		if (!initialized) {
			// Aún no inicializado: devolver lo que hay en caché (probablemente vacío)
			return (inMemory.accessToken || inMemory.refreshToken) ? { ...inMemory } : null;
		}
		return (inMemory.accessToken || inMemory.refreshToken) ? { ...inMemory } : null;
	},

	saveTokens(tokens: TokenPair): void {
		inMemory = { ...inMemory, ...tokens };
		if (typeof tokens.accessToken === 'string') {
			void writeSecure(ACCESS_KEY, tokens.accessToken);
		}
		if (typeof tokens.refreshToken === 'string') {
			void writeSecure(REFRESH_KEY, tokens.refreshToken);
		}
	},

	removeTokens(): void {
		inMemory = { accessToken: undefined, refreshToken: undefined };
		void writeSecure(ACCESS_KEY, null);
		void writeSecure(REFRESH_KEY, null);
	},

	getAccessToken(): string | null {
		return inMemory.accessToken ?? null;
	},

	getRefreshToken(): string | null {
		return inMemory.refreshToken ?? null;
	}
};


