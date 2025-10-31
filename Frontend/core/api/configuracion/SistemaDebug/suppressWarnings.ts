const originalWarn = console.warn;
const originalError = console.error;

const WARNINGS_TO_SUPPRESS = [
  
  '[antd: compatible]',
  
];


const ERRORS_TO_SUPPRESS = [
  
  'antd v5 support React is 16 ~ 18',
  '[antd: compatible]',
];


function shouldSuppressMessage(message: string, suppressList: string[]): boolean {
  return suppressList.some(pattern => 
    typeof message === 'string' && message.includes(pattern)
  );
}


console.warn = (...args: any[]) => {
  const message = args.join(' ');
  
  if (!shouldSuppressMessage(message, WARNINGS_TO_SUPPRESS)) {
    originalWarn.apply(console, args);
  }
};


console.error = (...args: any[]) => {
  const message = args.join(' ');
  
  if (!shouldSuppressMessage(message, ERRORS_TO_SUPPRESS)) {
    originalError.apply(console, args);
  }
  
};


export function restoreOriginalConsole() {
  console.warn = originalWarn;
  console.error = originalError;
}


export function addWarningToSuppress(pattern: string) {
  if (!WARNINGS_TO_SUPPRESS.includes(pattern)) {
    WARNINGS_TO_SUPPRESS.push(pattern);
  }
}


export function addErrorToSuppress(pattern: string) {
  if (!ERRORS_TO_SUPPRESS.includes(pattern)) {
    ERRORS_TO_SUPPRESS.push(pattern);
  }
}


try {
  const { Debug } = require('./debugSystem');
  if (Debug?.isDebugEnabled()) {
    console.log('🔇 Warning suppressor activated - Ant Design React 19 warnings will be hidden');
  }
} catch {} 