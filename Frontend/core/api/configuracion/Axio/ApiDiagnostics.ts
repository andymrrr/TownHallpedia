import { DebugAPI } from '../SistemaDebug/debugSystem';

export class ApiDiagnostics {
  
  static diagnoseConnectionError(responseData: any, endpoint: string): void {
    if (!responseData || typeof responseData !== 'object') return;
    
    const mensaje = responseData.mensaje || responseData.message || '';
    
    if (typeof mensaje === 'string' && mensaje.includes('Connection is not open')) {
      DebugAPI.error('🔌 Database Connection Issue', {
        problem: 'Backend database connection is closed',
        endpoint,
        possibleCauses: [
          'Backend server is down',
          'Database server is not running',
          'Connection string is incorrect',
          'Database connection pool exhausted'
        ],
        solutions: [
          'Check backend server status',
          'Verify database server is running',
          'Check connection string configuration',
          'Restart backend application'
        ],
        timestamp: new Date().toISOString()
      });
    }
  }

  static diagnoseDbConcurrencyError(responseData: any, endpoint: string): void {
    if (!responseData || typeof responseData !== 'object') return;
    
    const mensaje = responseData.mensaje || responseData.message || '';
    
    if (typeof mensaje === 'string' && 
        (mensaje.includes('A second operation was started on this context instance') ||
         mensaje.includes('concurrently using the same instance of DbContext'))) {
      
      DebugAPI.error('⚡ Entity Framework Concurrency Issue', {
        problem: 'Multiple operations running simultaneously on same DbContext',
        endpoint,
        technicalDetails: {
          issue: 'DbContext thread safety violation',
          documentation: 'https://go.microsoft.com/fwlink/?linkid=2097913'
        },
        possibleCauses: [
          'Multiple async operations on same DbContext instance',
          'Singleton DbContext registration (should be Scoped)',
          'Concurrent HTTP requests sharing same context',
          'Background tasks interfering with request context',
          'Improper async/await usage in backend'
        ],
        backendSolutions: [
          'Ensure DbContext is registered as Scoped (not Singleton)',
          'Use proper async/await patterns',
          'Avoid sharing DbContext between threads',
          'Use separate DbContext for background jobs',
          'Add .ConfigureAwait(false) to async calls'
        ],
        frontendActions: [
          'Check if multiple simultaneous requests to same endpoint',
          'Implement request debouncing if needed',
          'Add loading states to prevent multiple clicks',
          'Consider request queuing for heavy operations'
        ],
        quickFixes: [
          'Restart backend application',
          'Reduce concurrent request frequency',
          'Add delays between requests if testing'
        ],
        timestamp: new Date().toISOString()
      });
    }
  }

  static diagnose400Error(responseData: any, endpoint: string): void {
    if (!responseData || typeof responseData !== 'object') return;
    
    const mensaje = responseData.mensaje || responseData.message || '';
    const errores = responseData.errores || responseData.errors || [];
    
    DebugAPI.error('📋 Bad Request Analysis', {
      endpoint,
      serverMessage: mensaje,
      validationErrors: errores,
      possibleCauses: [
        'Invalid request parameters',
        'Missing required fields',
        'Data format mismatch',
        'Backend validation failure'
      ],
      troubleshooting: {
        checkParameters: 'Verify all required parameters are provided',
        checkFormat: 'Ensure data types match API expectations',
        checkBackend: 'Review backend logs for detailed error information'
      },
      timestamp: new Date().toISOString()
    });
  }

  static diagnoseNetworkError(error: any, endpoint: string): void {
    DebugAPI.error('🌐 Network Error Analysis', {
      endpoint,
      errorCode: error.code,
      errorMessage: error.message,
      possibleCauses: [
        'Backend server is not running',
        'Network connectivity issues',
        'CORS configuration problems',
        'Firewall blocking requests'
      ],
      solutions: [
        'Check if backend server is running on expected port',
        'Verify network connectivity',
        'Check CORS settings on backend',
        'Review firewall/proxy settings'
      ],
      timestamp: new Date().toISOString()
    });
  }

  static diagnoseAuthError(status: number, endpoint: string): void {
    const isUnauthorized = status === 401;
    const isForbidden = status === 403;
    
    if (isUnauthorized) {
      DebugAPI.error('🔐 Authentication Error', {
        status: '401 Unauthorized',
        endpoint,
        problem: 'Authentication required or token invalid',
        solutions: [
          'Check if user is logged in',
          'Verify access token validity',
          'Try refreshing authentication token',
          'Check token expiration time'
        ],
        timestamp: new Date().toISOString()
      });
    } else if (isForbidden) {
      DebugAPI.error('🚫 Authorization Error', {
        status: '403 Forbidden',
        endpoint,
        problem: 'User lacks permission for this resource',
        solutions: [
          'Check user permissions/roles',
          'Verify endpoint access requirements',
          'Contact administrator for access',
          'Review authorization policies'
        ],
        timestamp: new Date().toISOString()
      });
    }
  }

  static diagnoseHttpError(status: number, responseData: any, endpoint: string): void {
    switch (status) {
      case 400:
        this.diagnose400Error(responseData, endpoint);
        this.diagnoseConnectionError(responseData, endpoint);
        this.diagnoseDbConcurrencyError(responseData, endpoint);
        break;
      case 401:
      case 403:
        this.diagnoseAuthError(status, endpoint);
        break;
      case 404:
        DebugAPI.error('🔍 Endpoint Not Found', {
          status: '404 Not Found',
          endpoint,
          problem: 'API endpoint does not exist',
          solutions: [
            'Verify endpoint URL is correct',
            'Check API documentation',
            'Ensure backend route is configured',
            'Check for typos in endpoint path'
          ],
          timestamp: new Date().toISOString()
        });
        break;
      case 500:
        DebugAPI.error('💥 Server Error', {
          status: '500 Internal Server Error',
          endpoint,
          problem: 'Backend server encountered an error',
          solutions: [
            'Check backend server logs',
            'Verify database connectivity',
            'Check server configuration',
            'Contact backend developer'
          ],
          timestamp: new Date().toISOString()
        });
        break;
      default:
        DebugAPI.error(`❓ HTTP Error ${status}`, {
          status,
          endpoint,
          responseData,
          timestamp: new Date().toISOString()
        });
    }
  }
} 