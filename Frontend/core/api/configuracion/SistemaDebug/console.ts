import { DebugEntry, DebugLevel } from './types';

export class ConsoleManager {
  static printToConsole(entry: DebugEntry): void {
    const emoji = this.getEmojiForLevel(entry.level);
    const color = this.getColorForLevel(entry.level);
    const time = new Date(entry.timestamp).toLocaleTimeString();

    const hasGroup = typeof (console as any).groupCollapsed === 'function' && typeof (console as any).groupEnd === 'function';

    if (hasGroup) {
      (console as any).groupCollapsed(
        `%c${emoji} [${time}] ${entry.category} - ${entry.message}`,
        `color: ${color}; font-weight: bold;`
      );
      if (entry.data) {
        console.log('📦 Data:', entry.data);
      }
      if (entry.trace) {
        console.log('📍 Stack Trace:', entry.trace);
      }
      (console as any).groupEnd();
    } else {
      // Fallback para RN/entornos sin groupCollapsed ni estilos CSS
      console.log(`${emoji} [${time}] ${entry.category} - ${entry.message}`);
      if (entry.data) {
        console.log('Data:', entry.data);
      }
      if (entry.trace) {
        console.log('Stack:', entry.trace);
      }
    }
  }

  private static getEmojiForLevel(level: DebugLevel): string {
    const emojis = {
      [DebugLevel.INFO]: '🔍',
      [DebugLevel.WARNING]: '⚠️',
      [DebugLevel.ERROR]: '❌',
      [DebugLevel.SUCCESS]: '✅'
    } as const;
    return emojis[level];
  }

  private static getColorForLevel(level: DebugLevel): string {
    const colors = {
      [DebugLevel.INFO]: '#2196F3',
      [DebugLevel.WARNING]: '#FF9800', 
      [DebugLevel.ERROR]: '#F44336',
      [DebugLevel.SUCCESS]: '#4CAF50'
    } as const;
    return colors[level];
  }
} 