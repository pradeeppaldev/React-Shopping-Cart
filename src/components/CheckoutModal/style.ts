import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scaleUp = keyframes`
  from {
    opacity: 0;
    transform: scale(0.96) translateY(12px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  z-index: 10001;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: ${fadeIn} 0.25s ease-out;

  @media (max-width: 600px) {
    padding: 10px;
  }
`;

export const Modal = styled.div`
  width: 100%;
  max-width: 760px;
  max-height: 92vh;
  background: #0d0f14;
  border: 1px solid #242938;
  border-radius: 20px;
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 255, 136, 0.08);
  display: flex;
  flex-direction: column;
  animation: ${scaleUp} 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
`;

export const Header = styled.div`
  padding: 22px 28px;
  background: #12151e;
  border-bottom: 1px solid #232734;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .title-wrap {
    h3 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 800;
      color: #fff;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    p {
      margin: 4px 0 0;
      font-size: 0.82rem;
      color: #8892a0;
    }
  }

  .close-btn {
    background: #191e28;
    border: 1px solid #2d3444;
    color: #fff;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;

    &:hover {
      background: #ff0055;
      border-color: #ff0055;
      transform: rotate(90deg);
    }
  }
`;

export const Body = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 26px 28px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #232838;
    border-radius: 4px;
  }
`;

export const Section = styled.div`
  background: #12151f;
  border: 1px solid #212635;
  border-radius: 14px;
  padding: 20px;

  .section-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    h4 {
      margin: 0;
      color: #fff;
      font-size: 0.95rem;
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    span {
      font-size: 0.78rem;
      color: #8892a0;
    }
  }
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 0.75rem;
    font-weight: 700;
    color: #8892a0;
    text-transform: uppercase;
  }

  input {
    background: #171b26;
    border: 1px solid #252b3c;
    border-radius: 10px;
    padding: 10px 14px;
    color: #fff;
    font-family: inherit;
    font-size: 0.9rem;

    &:focus {
      outline: none;
      border-color: #00ff88;
    }
  }
`;

export const PaymentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
`;

export const PaymentOption = styled.div<{ selected: boolean }>`
  background: ${(props) => (props.selected ? '#161c28' : '#141722')};
  border: 2px solid ${(props) => (props.selected ? '#00ff88' : '#232838')};
  border-radius: 12px;
  padding: 14px 12px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
  transition: all 0.2s ease;

  &:hover {
    border-color: #00ff88;
  }

  .pay-icon {
    font-size: 1.6rem;
  }

  .pay-title {
    font-size: 0.82rem;
    font-weight: 800;
    color: #fff;
  }

  .pay-sub {
    font-size: 0.7rem;
    color: #8892a0;
  }
`;

export const CoinRedemptionBox = styled.div`
  background: linear-gradient(135deg, #191504 0%, #2b2003 100%);
  border: 1px solid rgba(255, 215, 0, 0.4);
  border-radius: 12px;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .coin-info {
    display: flex;
    align-items: center;
    gap: 12px;

    .icon {
      font-size: 1.6rem;
    }

    strong {
      color: #ffd700;
      font-size: 0.9rem;
    }

    p {
      margin: 2px 0 0;
      font-size: 0.78rem;
      color: #d8c385;
    }
  }

  button {
    background: #ffd700;
    color: #000;
    border: none;
    font-weight: 800;
    font-size: 0.8rem;
    padding: 8px 14px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #ffea70;
    }

    &.applied {
      background: #00ff88;
      color: #000;
    }
  }
`;

export const SummaryBreakdown = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 0.88rem;

  .row {
    display: flex;
    justify-content: space-between;
    color: #8892a0;

    &.discount {
      color: #00ff88;
      font-weight: 700;
    }

    &.total {
      border-top: 1px solid #232838;
      padding-top: 12px;
      font-size: 1.15rem;
      font-weight: 900;
      color: #fff;

      .total-amount {
        color: #00ff88;
      }
    }
  }
`;

export const Footer = styled.div`
  padding: 20px 28px;
  background: #12151e;
  border-top: 1px solid #232734;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .total-preview {
    span {
      font-size: 0.8rem;
      color: #8892a0;
      display: block;
    }
    strong {
      font-size: 1.3rem;
      color: #fff;
    }
  }

  .place-order-btn {
    background: #00ff88;
    color: #000;
    border: none;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 900;
    padding: 14px 32px;
    border-radius: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s ease;
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);

    &:hover {
      background: #00dd77;
      transform: translateY(-2px);
      box-shadow: 0 0 30px rgba(0, 255, 136, 0.5);
    }
  }
`;

/* Success View */
export const SuccessView = styled.div`
  text-align: center;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .success-badge {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: rgba(0, 255, 136, 0.15);
    border: 2px solid #00ff88;
    color: #00ff88;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.4rem;
    margin-bottom: 20px;
    box-shadow: 0 0 30px rgba(0, 255, 136, 0.4);
    animation: bounce 1.5s infinite;
  }

  h2 {
    color: #fff;
    font-size: 1.6rem;
    font-weight: 900;
    margin: 0 0 8px 0;
  }

  p {
    color: #8892a0;
    font-size: 0.95rem;
    max-width: 440px;
    margin: 0 0 24px 0;
    line-height: 1.5;
  }

  .order-details-card {
    background: #141824;
    border: 1px solid #252b3e;
    border-radius: 14px;
    padding: 20px;
    width: 100%;
    max-width: 420px;
    text-align: left;
    margin-bottom: 28px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 0.88rem;

    .row {
      display: flex;
      justify-content: space-between;
      color: #9aa0a6;
      strong {
        color: #fff;
      }
    }
  }

  .cta-buttons {
    display: flex;
    gap: 14px;

    button {
      padding: 12px 24px;
      border-radius: 10px;
      font-weight: 800;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.2s ease;

      &.primary {
        background: #00ff88;
        color: #000;
        border: none;
        &:hover {
          background: #00dd77;
        }
      }

      &.secondary {
        background: #1a1f2c;
        color: #fff;
        border: 1px solid #2b3348;
        &:hover {
          background: #252c3e;
        }
      }
    }
  }
`;
