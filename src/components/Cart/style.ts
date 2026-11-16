import styled from 'styled-components/macro';

export const BackdropOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(8, 10, 14, 0.7);
  backdrop-filter: blur(6px);
  z-index: 95;
  animation: fadeIn 0.2s ease-out;
`;

export const CartButton = styled.button`
  border: 0;
  padding: 0;
  width: 50px;
  height: 50px;
  color: #ececec;
  background-color: #14161d;
  border: 1px solid #282c38;
  border-right: none;
  border-radius: 12px 0 0 12px;
  text-align: center;
  line-height: 50px;
  position: absolute;
  top: 90px;
  left: 0;
  cursor: pointer;
  z-index: 2;
  transition: all 0.2s ease;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.secondary || '#eabf00'};
  }

  &:hover {
    background-color: #20242f;
  }
`;

interface IContainer {
  isOpen: boolean;
}

export const Container = styled.div<IContainer>`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
  width: 100%;
  height: 100%;
  background-color: #14161d;
  box-sizing: border-box;
  z-index: 100;
  transition: right 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: -10px 0 35px rgba(0, 0, 0, 0.7);
  border-left: 1px solid #282c38;

  ${CartButton} {
    left: ${({ isOpen }) => (isOpen ? '0' : '-50px')};
  }

  @media only screen and (min-width: ${({ theme: { breakpoints } }) =>
      breakpoints.tablet}) {
    width: 480px;
    right: ${({ isOpen }) => (isOpen ? '0' : '-480px')};

    ${CartButton} {
      left: -50px;
    }
  }
`;

interface ICartIcon {
  large?: boolean;
}

export const CartIcon = styled.div<ICartIcon>`
  width: ${({ large }) => (large ? '60px' : '50px')};
  height: ${({ large }) => (large ? '60px' : '50px')};
  position: relative;
  display: inline-block;
  vertical-align: middle;
  margin-right: 15px;
  background-image: url(${require('static/cart-icon.png')});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  background-size: 50%;
`;

export const CartQuantity = styled.div`
  display: inline-block;
  width: 18px;
  height: 18px;
  color: #0c0b10;
  font-weight: bold;
  font-size: 0.7em;
  text-align: center;
  line-height: 18px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.secondary || '#eabf00'};
  position: absolute;
  bottom: 0;
  right: 5px;
`;

export const CartContent = styled.div`
  height: 100%;
  overflow-y: scroll;
  padding: 0 20px 240px;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: #282c38;
  }
`;

export const CartContentHeader = styled.div`
  color: #ececec;
  box-sizing: border-box;
  text-align: center;
  padding: 32px 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeaderTitle = styled.span`
  font-weight: 900;
  font-size: 1.3em;
  vertical-align: middle;
  letter-spacing: -0.02em;
  color: #ffffff;
`;

export const ShippingBarContainer = styled.div`
  background: #101217;
  border: 1px solid #232733;
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 16px;
`;

export const ShippingBarLabel = styled.div`
  font-size: 0.78rem;
  color: #c0c6d4;
  margin-bottom: 8px;
  text-align: center;

  b {
    color: #eabf00;
  }
`;

export const ProgressBarTrack = styled.div`
  width: 100%;
  height: 6px;
  background: #1e222c;
  border-radius: 3px;
  overflow: hidden;
`;

interface IProgressBarFill {
  progress: number;
}

export const ProgressBarFill = styled.div<IProgressBarFill>`
  width: ${({ progress }) => `${progress}%`};
  height: 100%;
  background: linear-gradient(90deg, #eabf00 0%, #ccff00 100%);
  border-radius: 3px;
  transition: width 0.3s ease;
`;

export const PromoContainer = styled.form`
  display: flex;
  gap: 8px;
  margin: 16px 0 8px;
`;

export const PromoInput = styled.input`
  flex: 1;
  background: #101217;
  border: 1px solid #282c38;
  border-radius: 8px;
  padding: 9px 12px;
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  outline: none;

  &::placeholder {
    color: #687082;
    font-weight: 500;
  }

  &:focus {
    border-color: #eabf00;
  }
`;

export const PromoButton = styled.button`
  background: #1f232e;
  border: 1px solid #2e3442;
  color: #ffffff;
  padding: 0 16px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #eabf00;
    color: #000000;
    border-color: #eabf00;
  }
`;

interface IPromoMessage {
  type: 'success' | 'error';
}

export const PromoMessage = styled.div<IPromoMessage>`
  font-size: 0.72rem;
  font-weight: 700;
  color: ${({ type }) => (type === 'success' ? '#10b981' : '#ff3b30')};
  margin-bottom: 8px;
`;

export const ActivePromoBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(204, 255, 0, 0.1);
  border: 1px solid rgba(204, 255, 0, 0.3);
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 0.72rem;
  font-weight: 800;
  color: #ccff00;
  margin-bottom: 12px;

  button {
    background: none;
    border: none;
    color: #ccff00;
    cursor: pointer;
    font-size: 0.8rem;
  }
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
`;

export const Sub = styled.p`
  color: #a0a6b5;
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  margin: 0;
`;

export const SubPrice = styled.div`
  text-align: right;
  color: #5b5a5e;
`;

export const SubPriceValue = styled.p`
  color: ${({ theme }) => theme.colors.secondary || '#eabf00'};
  font-size: 24px;
  font-weight: 900;
  margin: 0;
`;

export const SubPriceInstallment = styled.p`
  margin: 2px 0 0;
  font-size: 0.72rem;
  color: #687082;
`;

export const CheckoutButton = styled.button`
  width: 100%;
  border: 0;
  color: #000000;
  text-transform: uppercase;
  background: #eabf00;
  font-weight: 900;
  font-size: 0.95rem;
  letter-spacing: 0.08em;
  border-radius: 12px;
  text-align: center;
  padding: 16px 0;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease;
  box-shadow: 0 8px 24px rgba(234, 191, 0, 0.25);

  &:hover {
    background-color: #ffdf5a;
    transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(234, 191, 0, 0.35);
  }
`;

export const TrustBadgesRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 12px;
  font-size: 0.7rem;
  color: #687082;
`;

export const CartFooter = styled.div`
  box-sizing: border-box;
  padding: 20px 24px 24px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  background-color: #14161d;
  border-top: 1px solid #232733;
  box-shadow: 0 -10px 24px rgba(0, 0, 0, 0.5);
`;
