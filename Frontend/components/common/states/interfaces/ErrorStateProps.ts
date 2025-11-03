export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  size?: 'small' | 'medium' | 'large';
}


