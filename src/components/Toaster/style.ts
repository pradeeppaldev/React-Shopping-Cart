import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: translateY(20px) scale(0.95);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
  }
`;

export const ToastContainer = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  flex-direction: column-reverse;
  gap: 12px;
  z-index: 99999;
  pointer-events: none;
  max-width: 420px;
  width: calc(100% - 48px);

  @media (max-width: 600px) {
    bottom: 16px;
    right: 16px;
    width: calc(100% - 32px);
  }
`;

export const ToastItem = styled.div<{ type: 'success' | 'info' | 'reward' }>`
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  background: ${(props) =>
    props.type === 'reward'
      ? 'linear-gradient(135deg, #1b1604 0%, #2b1f02 100%)'
      : props.type === 'info'
      ? 'linear-gradient(135deg, #0d1624 0%, #111d33 100%)'
      : 'linear-gradient(135deg, #0e1a14 0%, #12281e 100%)'};
  border: 1px solid
    ${(props) =>
      props.type === 'reward'
        ? 'rgba(255, 215, 0, 0.4)'
        : props.type === 'info'
        ? 'rgba(74, 158, 255, 0.4)'
        : 'rgba(0, 255, 136, 0.4)'};
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5),
    0 0 15px
      ${(props) =>
        props.type === 'reward'
          ? 'rgba(255, 215, 0, 0.15)'
          : props.type === 'info'
          ? 'rgba(74, 158, 255, 0.15)'
          : 'rgba(0, 255, 136, 0.15)'};
  color: #fff;
  font-family: inherit;
  font-size: 0.9rem;
  animation: ${slideIn} 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  backdrop-filter: blur(10px);

  .icon {
    font-size: 1.3rem;
    flex-shrink: 0;
  }

  .text {
    flex: 1;
    line-height: 1.4;
    font-weight: 500;
  }

  .close {
    background: none;
    border: none;
    color: #888;
    cursor: pointer;
    font-size: 1.1rem;
    padding: 0 4px;
    transition: color 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      color: #fff;
    }
  }
`;
