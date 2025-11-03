import { DebugLevel, DebugEntry } from './types';

export class DebugCommands {
  
  static stats(debugInstance: any) {
    const stats = debugInstance.getStats();
    const config = debugInstance.getConfig();
    
    console.group('📊 Debug System Statistics');
    console.log('🔧 Configuration:', config);
    console.log('📈 Total logs:', stats.total);
    console.log('📋 By level:', stats.byLevel);
    console.log('🏷️ Categories:', stats.categories);
    console.groupEnd();
    
    return stats;
  }
  static apiLogs(debugInstance: any, limit: number = 10) {
    const apiLogs = debugInstance.getLogs().filter((log: DebugEntry) => 
      log.category.startsWith('API_')
    ).slice(-limit);
    
    console.group(`🌐 Last ${limit} API Logs`);
    apiLogs.forEach((log: DebugEntry) => {
      const emoji = log.level === 'ERROR' ? '❌' : log.level === 'SUCCESS' ? '✅' : '🔍';
      console.log(`${emoji} [${log.timestamp}] ${log.category}: ${log.message}`);
      if (log.data) {
        console.log('   Data:', log.data);
      }
    });
    console.groupEnd();
    
    return apiLogs;
  }
  static errors(debugInstance: any, limit: number = 10) {
    const errors = debugInstance.getLogs(undefined, DebugLevel.ERROR).slice(-limit);
    
    console.group(`🚨 Last ${limit} Errors`);
    errors.forEach((error: DebugEntry) => {
      console.error(`❌ [${error.timestamp}] ${error.category}: ${error.message}`);
      if (error.data) {
        console.error('   Data:', error.data);
      }
    });
    console.groupEnd();
    
    return errors;
  }
  static test(debugInstance: any, debugAPI: any) {
    console.log('🧪 Testing Debug System...');
    
    debugInstance.info('TEST', 'Testing info log');
    debugInstance.success('TEST', 'Testing success log');
    debugInstance.warning('TEST', 'Testing warning log');
    debugInstance.error('TEST', 'Testing error log');
    
    debugAPI.request('Testing API request', { test: true });
    debugAPI.response('Testing API response', { success: true });
    debugAPI.error('Testing API error', { error: 'test error' });
    
    console.log('✅ Test completed! Check stats with Debug.stats()');
  }

  static configure(debugInstance: any, options: any) {
    const originalConfigure = Object.getPrototypeOf(debugInstance).configure;
    originalConfigure.call(debugInstance, options);
    console.log('🔧 Debug configuration updated:', debugInstance.getConfig());
  }
  static clear(debugInstance: any) {
    debugInstance.clearLogs();
    console.log('🧹 Debug logs cleared');
  }
  static concurrencyErrors(debugInstance: any) {
    const allLogs = debugInstance.getLogs();
    const concurrencyErrors = allLogs.filter((log: DebugEntry) => 
      log.message && (
        log.message.includes('Entity Framework Concurrency') ||
        log.message.includes('DbContext') ||
        log.message.includes('second operation was started')
      )
    );
    
    console.group('⚡ Entity Framework Concurrency Errors');
    if (concurrencyErrors.length === 0) {
      console.log('✅ No concurrency errors found');
    } else {
      concurrencyErrors.forEach((error: DebugEntry) => {
        console.error(`⚡ [${error.timestamp}] ${error.message}`);
        if (error.data?.backendSolutions) {
          console.log('🔧 Backend Solutions:', error.data.backendSolutions);
        }
        if (error.data?.frontendActions) {
          console.log('🎯 Frontend Actions:', error.data.frontendActions);
        }
      });
    }
    console.groupEnd();
    
    return concurrencyErrors;
  }
  static help() {
    console.group('🛠️ Debug Commands Help');
    console.log('📊 Debug.stats() - Show system statistics');
    console.log('🌐 Debug.apiLogs(limit?) - Show API logs');
    console.log('🚨 Debug.errors(limit?) - Show error logs');
    console.log('⚡ Debug.concurrencyErrors() - Show Entity Framework concurrency issues');
    console.log('🧪 Debug.test() - Test the debug system');
    console.log('🔧 Debug.configure(options) - Update configuration (original method)');
    console.log('🔧 Debug.configureDebug(options) - Update configuration (with logging)');
    console.log('🧹 Debug.clear() - Clear all logs');
    console.log('📋 Debug.help() - Show this help');
    console.groupEnd();
  }
}

export function initializeDebugCommands(debugInstance: any, debugAPI: any) {
  try {
    if (typeof window !== 'undefined' && debugInstance?.isDebugEnabled()) {
      const originalConfigure = debugInstance.configure.bind(debugInstance);
      Object.assign(debugInstance, {
        stats: () => DebugCommands.stats(debugInstance),
        apiLogs: (limit?: number) => DebugCommands.apiLogs(debugInstance, limit),
        errors: (limit?: number) => DebugCommands.errors(debugInstance, limit),
        concurrencyErrors: () => DebugCommands.concurrencyErrors(debugInstance),
        test: () => DebugCommands.test(debugInstance, debugAPI),
        configureDebug: (options: any) => DebugCommands.configure(debugInstance, options),
        clear: () => DebugCommands.clear(debugInstance),
        help: DebugCommands.help,
        configure: originalConfigure
      });
    }
  } catch {}
} 