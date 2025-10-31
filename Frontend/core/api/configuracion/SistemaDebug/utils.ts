import { DebugEntry, DebugLevel } from './types';

export class DebugUtils {
  static sanitizeData(data: any): any {
    if (typeof data !== 'object' || data === null) return data;

    const sensitiveKeys = ['password', 'token', 'authorization', 'secret', 'key'];
    const sanitized = JSON.parse(JSON.stringify(data));

    const sanitizeObject = (obj: any) => {
      Object.keys(obj).forEach(key => {
        if (sensitiveKeys.some(sk => key.toLowerCase().includes(sk))) {
          obj[key] = '***HIDDEN***';
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          sanitizeObject(obj[key]);
        }
      });
    };

    sanitizeObject(sanitized);
    return sanitized;
  }

  static generateStats(logs: DebugEntry[]) {
    const stats = logs.reduce((acc, log) => {
      acc[log.level] = (acc[log.level] || 0) + 1;
      return acc;
    }, {} as Record<DebugLevel, number>);

    return {
      total: logs.length,
      byLevel: stats,
      categories: [...new Set(logs.map(l => l.category))]
    };
  }

  static filterLogs(logs: DebugEntry[], category?: string, level?: DebugLevel): DebugEntry[] {
    return logs.filter(log => 
      (!category || log.category === category) &&
      (!level || log.level === level)
    );
  }

  static exportLogs(logs: DebugEntry[]): string {
    return JSON.stringify(logs, null, 2);
  }
} 