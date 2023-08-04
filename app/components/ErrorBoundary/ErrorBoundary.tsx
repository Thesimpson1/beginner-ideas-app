import React, { Component, ReactNode } from 'react';
import RNRestart from 'react-native-restart';
import { sentryMainError } from 'app/logging/sentry/sentryEvents';

import { Fallback } from 'app/components/ErrorBoundary/component/Fallback';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }
  onRecoverFromError = () => {
    this.setState({ hasError: false }, () => {
      // restart app
      RNRestart.Restart();
    });
  };
  componentDidCatch(error: Error) {
    sentryMainError(error);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return <Fallback onPress={this.onRecoverFromError} />;
    }

    return children;
  }
}
