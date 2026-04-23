import React, { Component, ErrorInfo, ReactNode } from 'react';
import styles from './ErrorBoundary.module.css';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className={styles.errorBoundary}>
          <h2 className={styles.errorTitle}>Произошла ошибка</h2>
          <p className={styles.errorMessage}>
            {this.state.error?.message || 'Неизвестная ошибка'}
          </p>
          <button 
            className={styles.retryButton}
            onClick={this.handleRetry}
          >
            Попробовать снова
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}