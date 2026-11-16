import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(6px);
  z-index: 10000;
  display: flex;
  justify-content: flex-end;
  animation: ${fadeIn} 0.25s ease-out;
`;

export const Drawer = styled.div`
  width: 100%;
  max-width: 480px;
  height: 100%;
  background: #0d0f12;
  border-left: 1px solid #23272e;
  box-shadow: -15px 0 50px rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  animation: ${slideIn} 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
`;

export const Header = styled.div`
  padding: 22px 24px;
  background: #12151b;
  border-bottom: 1px solid #23272e;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .title-group {
    display: flex;
    align-items: center;
    gap: 12px;

    h3 {
      font-size: 1.15rem;
      font-weight: 800;
      color: #fff;
      margin: 0;
      letter-spacing: 0.5px;
    }

    .badge {
      background: #ff0055;
      color: #fff;
      font-size: 0.7rem;
      font-weight: 800;
      padding: 3px 8px;
      border-radius: 12px;
      letter-spacing: 0.5px;
    }
  }

  .close-btn {
    background: #1e222b;
    border: 1px solid #2d333f;
    color: #fff;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    transition: all 0.2s ease;

    &:hover {
      background: #ff0055;
      border-color: #ff0055;
      transform: rotate(90deg);
    }
  }
`;

export const ControlsBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  background: #0f1218;
  border-bottom: 1px solid #1a1e27;
  font-size: 0.8rem;

  .action-btn {
    background: none;
    border: none;
    color: #4a9eff;
    cursor: pointer;
    font-weight: 600;
    transition: color 0.2s ease;
    padding: 4px 6px;

    &:hover {
      color: #fff;
      text-decoration: underline;
    }

    &.clear {
      color: #888;
      &:hover {
        color: #ff4d4d;
      }
    }
  }
`;

export const FilterPills = styled.div`
  display: flex;
  gap: 8px;
  padding: 12px 24px;
  border-bottom: 1px solid #1a1e27;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const FilterPill = styled.button<{ active: boolean }>`
  background: ${(props) => (props.active ? '#fff' : '#161922')};
  color: ${(props) => (props.active ? '#000' : '#888')};
  border: 1px solid ${(props) => (props.active ? '#fff' : '#23272e')};
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    color: #fff;
    border-color: #555;
  }
`;

export const NotifList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #23272e;
    border-radius: 4px;
  }
`;

export const NotifCard = styled.div<{ unread: boolean; type: string }>`
  position: relative;
  background: ${(props) => (props.unread ? '#151922' : '#101217')};
  border: 1px solid
    ${(props) =>
      props.unread
        ? props.type === 'offer'
          ? 'rgba(255, 0, 85, 0.4)'
          : props.type === 'birthday'
          ? 'rgba(255, 215, 0, 0.4)'
          : props.type === 'price_drop'
          ? 'rgba(0, 255, 136, 0.4)'
          : 'rgba(74, 158, 255, 0.4)'
        : '#1c202a'};
  border-radius: 14px;
  padding: 16px;
  display: flex;
  gap: 14px;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background: #181d28;
    transform: translateY(-2px);
  }

  ${(props) =>
    props.unread &&
    `
    &::before {
      content: '';
      position: absolute;
      top: 14px;
      right: 14px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #00ff88;
      box-shadow: 0 0 8px #00ff88;
    }
  `}

  .icon-wrap {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: #1a1e28;
    border: 1px solid #282e3d;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    flex-shrink: 0;
  }

  .content-wrap {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;

    .top-meta {
      display: flex;
      align-items: center;
      gap: 8px;

      .badge {
        font-size: 0.65rem;
        font-weight: 800;
        padding: 2px 6px;
        border-radius: 6px;
        background: ${(props) =>
          props.type === 'offer'
            ? 'rgba(255, 0, 85, 0.2)'
            : props.type === 'birthday'
            ? 'rgba(255, 215, 0, 0.2)'
            : props.type === 'price_drop'
            ? 'rgba(0, 255, 136, 0.2)'
            : 'rgba(74, 158, 255, 0.2)'};
        color: ${(props) =>
          props.type === 'offer'
            ? '#ff3377'
            : props.type === 'birthday'
            ? '#ffd700'
            : props.type === 'price_drop'
            ? '#00ff88'
            : '#4a9eff'};
        letter-spacing: 0.5px;
      }

      .time {
        font-size: 0.72rem;
        color: #777;
      }
    }

    h4 {
      margin: 2px 0;
      font-size: 0.95rem;
      font-weight: 700;
      color: #fff;
    }

    p {
      margin: 0;
      font-size: 0.83rem;
      line-height: 1.4;
      color: #9aa0a6;
    }

    .cta-btn {
      margin-top: 8px;
      align-self: flex-start;
      background: #1e2430;
      border: 1px solid #323b4e;
      color: #fff;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 6px 12px;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;

      &:hover {
        background: #00ff88;
        color: #000;
        border-color: #00ff88;
      }
    }
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 60px 20px;
  color: #666;

  .big-icon {
    font-size: 3rem;
    margin-bottom: 12px;
    opacity: 0.6;
  }

  h4 {
    color: #fff;
    font-size: 1.1rem;
    margin: 0 0 6px 0;
  }

  p {
    font-size: 0.85rem;
    max-width: 280px;
    margin: 0;
    line-height: 1.4;
  }
`;
