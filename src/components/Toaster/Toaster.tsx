import React from 'react';
import { useUser } from 'contexts/user-context';
import * as S from './style';

export const Toaster: React.FC = () => {
  const { toasts, removeToast } = useUser();

  if (toasts.length === 0) return null;

  return (
    <S.ToastContainer>
      {toasts.map((toast) => (
        <S.ToastItem key={toast.id} type={toast.type}>
          <span className="icon">
            {toast.icon || (toast.type === 'reward' ? '🪙' : toast.type === 'info' ? 'ℹ️' : '✓')}
          </span>
          <span className="text">{toast.message}</span>
          <button
            className="close"
            onClick={() => removeToast(toast.id)}
            aria-label="Dismiss toast"
          >
            ✕
          </button>
        </S.ToastItem>
      ))}
    </S.ToastContainer>
  );
};

export default Toaster;
