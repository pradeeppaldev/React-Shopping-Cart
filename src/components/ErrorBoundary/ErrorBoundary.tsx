import React, { Component, ErrorInfo, ReactNode } from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #0e1118;
  color: #ffffff;
  padding: 24px;
  text-align: center;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`;

const GlitchTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: 900;
  color: #ff0055;
  margin: 0 0 12px 0;
  letter-spacing: -0.02em;
`;

const Message = styled.p`
  color: #a0a6b5;
  font-size: 1rem;
  max-width: 480px;
  line-height: 1.6;
  margin: 0 0 28px 0;
`;

const ReloadButton = styled.button`
  background: #00ff88;
  color: #000000;
  font-weight: 800;
  font-size: 0.95rem;
  padding: 14px 28px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #00dd77;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 255, 136, 0.3);
  }
`;

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  public handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <span style={{ fontSize: '3.5rem', marginBottom: '16px' }}>⚡</span>
          <GlitchTitle>STYLE STREAM INTERRUPTED</GlitchTitle>
          <Message>
            Something unexpected occurred while loading the fashion archive. Don't worry, your cart, wishlist, and coins are safely stored locally.
          </Message>
          <ReloadButton onClick={this.handleReload}>
            RELOAD VIBECART STUDIO
          </ReloadButton>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
