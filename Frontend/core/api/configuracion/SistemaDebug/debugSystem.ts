export type { DebugEntry, DebugConfig } from './types';
export { DebugLevel } from './types';

import { DebugSystem } from './core';
import { initializeDebugCommands } from './debugCommands';

export const Debug = new DebugSystem();

export const DebugAPI = {
  request: (message: string, data?: any) => Debug.info('API_REQUEST', message, data),
  response: (message: string, data?: any) => Debug.success('API_RESPONSE', message, data),
  error: (message: string, data?: any) => Debug.error('API_ERROR', message, data)
};

export const DebugForm = {
  validation: (message: string, data?: any) => Debug.info('FORM_VALIDATION', message, data),
  submit: (message: string, data?: any) => Debug.info('FORM_SUBMIT', message, data),
  error: (message: string, data?: any) => Debug.error('FORM_ERROR', message, data)
};

export const DebugSteps = {
  navigation: (message: string, data?: any) => Debug.info('STEPS_NAVIGATION', message, data),
  validation: (message: string, data?: any) => Debug.info('STEPS_VALIDATION', message, data),
  complete: (message: string, data?: any) => Debug.success('STEPS_COMPLETE', message, data)
};

if (typeof window !== 'undefined') {
  (window as any).Debug = Debug;
  (window as any).DebugAPI = DebugAPI;
  (window as any).DebugForm = DebugForm;
  (window as any).DebugSteps = DebugSteps;
  (window as any).testDebug = () => Debug.test();
  
  initializeDebugCommands(Debug, DebugAPI);
} 