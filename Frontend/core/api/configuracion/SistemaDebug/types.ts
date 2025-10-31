export enum DebugLevel {
  INFO = 'INFO',
  WARNING = 'WARNING', 
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS'
}

export interface DebugEntry {
  timestamp: string;
  level: DebugLevel;
  category: string;
  message: string;
  data?: any;
  trace?: string;
}

export interface DebugConfig {
  enabled: boolean;
  consoleOutput: boolean;
  maxLogs: number;
  logLevels: DebugLevel[];
  categories: string[];
} 