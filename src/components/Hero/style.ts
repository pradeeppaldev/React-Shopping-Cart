import styled from 'styled-components/macro';

export const HeroContainer = styled.section`
  position: relative;
  max-width: 1360px;
  margin: 20px auto 40px;
  padding: 48px 32px;
  border-radius: 24px;
  background: radial-gradient(circle at 85% 30%, rgba(234, 191, 0, 0.12) 0%, rgba(14, 16, 21, 0.98) 70%),
    linear-gradient(135deg, #13161d 0%, #0d0e12 100%);
  border: 1px solid #232733;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);

  @media (max-width: 900px) {
    flex-direction: column;
    padding: 36px 20px;
    margin: 12px 16px 28px;
  }
`;

export const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: radial-gradient(rgba(234, 191, 0, 0.05) 1px, transparent 1px);
  background-size: 24px 24px;
  pointer-events: none;
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 640px;
`;

export const PillBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(204, 255, 0, 0.1);
  border: 1px solid rgba(204, 255, 0, 0.3);
  padding: 6px 14px;
  border-radius: 999px;
  color: #ccff00;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  margin-bottom: 20px;

  .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #ccff00;
    box-shadow: 0 0 8px #ccff00;
    animation: pulseGlow 2s infinite ease-in-out;
  }
`;

export const HeroTitle = styled.h1`
  margin: 0 0 16px;
  font-size: 3.2rem;
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1.05;
  color: #ffffff;
  text-transform: uppercase;

  span {
    background: linear-gradient(135deg, #eabf00 0%, #ffdf5a 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

export const HeroSubtitle = styled.p`
  margin: 0 0 28px;
  font-size: 1.05rem;
  line-height: 1.6;
  color: #a0a6b5;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 32px;
`;

export const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #eabf00;
  color: #000000;
  font-weight: 800;
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  padding: 14px 28px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 8px 20px rgba(234, 191, 0, 0.25);

  svg {
    width: 16px;
    height: 16px;
    transition: transform 0.2s ease;
  }

  &:hover {
    background: #ffdf5a;
    transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(234, 191, 0, 0.35);

    svg {
      transform: translateX(4px);
    }
  }
`;

export const SecondaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #1a1d26;
  color: #ffffff;
  font-weight: 700;
  font-size: 0.88rem;
  letter-spacing: 0.04em;
  padding: 14px 24px;
  border-radius: 12px;
  border: 1px solid #282c38;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #252a36;
    border-color: #eabf00;
    transform: translateY(-2px);
  }
`;

export const TrustBadges = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  border-top: 1px solid #232733;
  padding-top: 20px;
  flex-wrap: wrap;
`;

export const TrustItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  .icon {
    font-size: 1.2rem;
    color: #eabf00;
  }

  div {
    display: flex;
    flex-direction: column;

    strong {
      font-size: 0.85rem;
      color: #ffffff;
    }

    small {
      font-size: 0.7rem;
      color: #687082;
    }
  }
`;

export const HeroVisual = styled.div`
  position: relative;
  width: 440px;
  height: 380px;
  border-radius: 20px;
  background-image: url('https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80');
  background-size: cover;
  background-position: center;
  border: 2px solid #282c38;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.6);

  @media (max-width: 900px) {
    width: 100%;
    height: 300px;
  }
`;

export const FloatingCard = styled.div`
  position: absolute;
  background: rgba(18, 20, 27, 0.92);
  backdrop-filter: blur(8px);
  border: 1px solid #2c3240;
  border-radius: 12px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.5);

  &.top-right {
    top: -16px;
    right: -16px;
  }

  &.bottom-left {
    bottom: -16px;
    left: -16px;
  }

  @media (max-width: 768px) {
    &.top-right {
      top: 10px;
      right: 10px;
    }
    &.bottom-left {
      bottom: 10px;
      left: 10px;
    }
  }

  .fire {
    font-size: 1.3rem;
  }

  .verified {
    background: #10b981;
    color: #fff;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 800;
  }

  div {
    display: flex;
    flex-direction: column;

    .title {
      font-size: 0.65rem;
      font-weight: 800;
      color: #eabf00;
      letter-spacing: 0.08em;
    }

    .subtitle {
      font-size: 0.8rem;
      font-weight: 700;
      color: #ffffff;
    }
  }
`;
