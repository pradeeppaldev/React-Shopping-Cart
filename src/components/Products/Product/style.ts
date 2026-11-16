import styled from 'styled-components/macro';

export const BuyButton = styled.button`
  background-color: #1a1d26;
  border: 1px solid #282c38;
  color: #ffffff;
  padding: 13px 0;
  margin-top: 10px;
  cursor: pointer;
  width: 100%;
  border-radius: 10px;
  font-weight: 800;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary || '#eabf00'};
    color: #000000;
    border-color: ${({ theme }) => theme.colors.secondary || '#eabf00'};
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(234, 191, 0, 0.25);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.secondary || '#eabf00'};
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 290px;
  border-radius: 12px;
  overflow: hidden;
  background-color: #101217;
  margin-bottom: 12px;

  @media only screen and (min-width: ${({ theme: { breakpoints } }) =>
      breakpoints.tablet}) {
    height: 320px;
  }
`;

export const MainImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.35s ease, transform 0.4s ease;
`;

export const HoverImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.35s ease, transform 0.4s ease;
`;

export const QuickViewOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(14, 16, 21, 0.88);
  backdrop-filter: blur(6px);
  color: #ffffff;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  padding: 10px;
  text-align: center;
  transform: translateY(100%);
  transition: transform 0.25s ease;
  z-index: 2;
`;

interface IContainer {
  sku: number | string;
}

export const Container = styled.div<IContainer>`
  position: relative;
  text-align: left;
  box-sizing: border-box;
  padding: 14px;
  margin-bottom: 24px;
  background: #14161d;
  border: 1px solid #232733;
  border-radius: 16px;
  cursor: pointer;
  outline: none;
  display: flex;
  flex-direction: column;
  transition: all 0.25s ease;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.secondary || '#eabf00'};
  }

  &:hover {
    border-color: #eabf00;
    transform: translateY(-4px);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.4);

    ${HoverImg} {
      opacity: 1;
      transform: scale(1.04);
    }

    ${MainImg} {
      opacity: 0;
      transform: scale(1.04);
    }

    ${QuickViewOverlay} {
      transform: translateY(0);
    }
  }
`;

export const BadgeContainer = styled.div`
  position: absolute;
  top: 22px;
  left: 22px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  z-index: 3;
`;

export const Stopper = styled.div`
  color: #0e1015;
  padding: 3px 8px;
  font-size: 0.65rem;
  font-weight: 800;
  background-color: #ccff00;
  border-radius: 5px;
  cursor: default;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

export const DiscountBadge = styled.div`
  background-color: #ff3b30;
  color: #ffffff;
  padding: 3px 8px;
  font-size: 0.68rem;
  font-weight: 800;
  border-radius: 5px;
  letter-spacing: 0.04em;
  align-self: flex-start;
`;

interface IWishlistButton {
  active?: boolean;
}

export const WishlistButton = styled.button<IWishlistButton>`
  position: absolute;
  top: 22px;
  right: 22px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(18, 20, 27, 0.85);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: ${({ active }) => (active ? '#ff3b30' : '#ffffff')};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 3;
  transition: all 0.2s ease;

  svg {
    width: 17px;
    height: 17px;
  }

  &:hover {
    background: #ffffff;
    color: #ff3b30;
    transform: scale(1.1);
  }
`;

export const MetaRow = styled.div`
  font-size: 0.72rem;
  font-weight: 600;
  color: #687082;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
`;

export const Title = styled.p`
  position: relative;
  margin: 0 0 6px;
  font-size: 0.95rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.35;
  height: 38px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;

  .stars {
    color: #eabf00;
    font-size: 0.78rem;
    letter-spacing: 1px;
  }

  .score {
    font-size: 0.78rem;
    font-weight: 800;
    color: #ffffff;
  }

  .reviews {
    font-size: 0.7rem;
    color: #687082;
  }
`;

export const ColorRow = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 8px;
`;

interface IColorDot {
  color: string;
  active?: boolean;
}

export const ColorDot = styled.button<IColorDot>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  border: 2px solid ${({ active }) => (active ? '#eabf00' : '#282c38')};
  box-shadow: ${({ active }) => (active ? '0 0 0 1px #14161d' : 'none')};
  padding: 0;
  cursor: pointer;
  transition: transform 0.15s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

export const SizesRow = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

interface ISizeButton {
  active?: boolean;
}

export const SizeButton = styled.button<ISizeButton>`
  background: ${({ active }) => (active ? '#eabf00' : '#101217')};
  color: ${({ active }) => (active ? '#000000' : '#a0a6b5')};
  border: 1px solid ${({ active }) => (active ? '#eabf00' : '#232733')};
  border-radius: 4px;
  padding: 2px 7px;
  font-size: 0.68rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: #eabf00;
    color: ${({ active }) => (active ? '#000000' : '#ffffff')};
  }
`;

export const Price = styled.div`
  margin-top: auto;
  min-height: 48px;
`;

export const Val = styled.div`
  margin: 0 0 2px;
  display: flex;
  align-items: baseline;
  gap: 3px;

  small {
    font-size: 0.85rem;
    font-weight: 700;
    color: #a0a6b5;
  }

  b {
    font-size: 1.35rem;
    font-weight: 900;
    color: #ffffff;
  }

  span {
    font-size: 0.85rem;
    font-weight: 700;
    color: #ffffff;
  }
`;

export const OriginalPriceStrike = styled.span`
  margin-left: 8px;
  font-size: 0.82rem !important;
  color: #687082 !important;
  text-decoration: line-through;
  font-weight: 500 !important;
`;

export const Installment = styled.p`
  margin: 0;
  font-size: 0.72rem;
  color: #687082;

  b {
    color: #a0a6b5;
    margin-left: 4px;
  }
`;
