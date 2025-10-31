type Listener = (...args: any[]) => void;

class SimpleEventEmitter {
	private listeners: Record<string, Listener[]> = {};

	on(event: string, listener: Listener): () => void {
		this.listeners[event] = this.listeners[event] || [];
		this.listeners[event].push(listener);
		return () => this.off(event, listener);
	}

	off(event: string, listener: Listener): void {
		this.listeners[event] = (this.listeners[event] || []).filter(l => l !== listener);
	}

	emit(event: string, ...args: any[]): void {
		(this.listeners[event] || []).forEach(l => {
			try { l(...args); } catch {}
		});
	}
}

export const AuthEvents = new SimpleEventEmitter();


