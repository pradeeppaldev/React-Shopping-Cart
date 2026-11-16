import styled from 'styled-components/macro';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(8, 10, 14, 0.85);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: fadeIn 0.2s ease-out;
`;

export const ModalContainer = styled.div`
  position: relative;
  background: #14161d;
  border: 1px solid #282c38;
  border-radius: 24px;
  padding: 36px 28px;
  max-width: 460px;
  width: 100%;
  text-align: center;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.25s ease-out;
  overflow: hidden;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 18px;
  right: 18px;
  background: #1e222c;
  border: 1px solid #2e3442;
  color: #a0a6b5;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.9rem;
  z-index: 10;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    color: #ffffff;
    border-color: #eabf00;
  }
`;

export const Header = styled.div`
  margin-bottom: 24px;

  .badge {
    display: inline-block;
    background: rgba(234, 191, 0, 0.15);
    border: 1px solid rgba(234, 191, 0, 0.4);
    color: #eabf00;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    padding: 4px 12px;
    border-radius: 999px;
    margin-bottom: 8px;
  }

  h2 {
    margin: 0 0 6px;
    font-size: 1.6rem;
    font-weight: 900;
    color: #ffffff;
    letter-spacing: -0.02em;
  }

  p {
    margin: 0 auto;
    font-size: 0.85rem;
    color: #a0a6b5;
    line-height: 1.45;
    max-width: 360px;
  }
`;

export const WheelWrapper = styled.div`
  position: relative;
  width: 280px;
  height: 280px;
  margin: 0 auto 16px;
  border-radius: 50%;
  border: 6px solid #282c38;
  box-shadow: 0 0 30px rgba(234, 191, 0, 0.2), inset 0 0 15px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Pointer = styled.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-top: 22px solid #eabf00;
  z-index: 20;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.6));
`;

interface IWheel {
  rotation: number;
  spinning?: boolean;
}

export const Wheel = styled.div<IWheel>`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  transform: ${({ rotation }) => `rotate(${rotation}deg)`};
  transition: ${({ spinning }) =>
    spinning ? 'transform 3.8s cubic-bezier(0.15, 0.9, 0.2, 1)' : 'none'};
  background: #111;
`;

interface ISegment {
  degree: number;
  color: string;
  textColor: string;
}

export const Segment = styled.div<ISegment>`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  transform-origin: 0% 50%;
  transform: ${({ degree }) => `rotate(${degree}deg)`};
  clip-path: polygon(0 0, 100% 0, 50% 100%, 0 50%);
  background-color: ${({ color }) => color};

  .text {
    position: absolute;
    left: 14px;
    top: 42px;
    font-size: 0.68rem;
    font-weight: 900;
    letter-spacing: 0.05em;
    color: ${({ textColor }) => textColor};
    transform: rotate(60deg);
    white-space: nowrap;
  }
`;

export const CenterButton = styled.button`
  position: absolute;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #14161d;
  border: 3px solid #eabf00;
  color: #eabf00;
  font-weight: 900;
  font-size: 0.78rem;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 15;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.6);
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    transform: scale(1.08);
    background: #eabf00;
    color: #000;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.8;
  }
`;

export const WinCard = styled.div`
  margin-top: 16px;
  background: #0f1117;
  border: 1px solid #eabf00;
  border-radius: 16px;
  padding: 16px;
  animation: fadeIn 0.3s ease-out;

  .confetti {
    font-size: 1.8rem;
    display: inline-block;
    margin-bottom: 4px;
  }

  h3 {
    margin: 0 0 6px;
    font-size: 1.15rem;
    font-weight: 900;
    color: #ffffff;
  }

  p {
    margin: 0 0 12px;
    font-size: 0.82rem;
    color: #c0c6d4;
  }
`;

export const RewardPill = styled.div`
  display: inline-block;
  background: #eabf00;
  color: #000000;
  font-weight: 900;
  font-size: 0.95rem;
  padding: 6px 16px;
  border-radius: 8px;
  margin-bottom: 8px;
  letter-spacing: 0.05em;
`;

export const ClaimButton = styled.button`
  background: #ccff00;
  color: #000000;
  font-weight: 800;
  font-size: 0.85rem;
  padding: 10px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #e2ff4f;
    transform: translateY(-1px);
  }
`;
