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
  overflow-y: auto;
  animation: fadeIn 0.2s ease-out;
`;

export const ModalContainer = styled.div`
  position: relative;
  background: #14161d;
  border: 1px solid #282c38;
  border-radius: 20px;
  width: 100%;
  max-width: 1050px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.75);
  animation: fadeIn 0.25s ease-out;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #282c38;
    border-radius: 3px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 18px;
  right: 18px;
  background: #1e222c;
  border: 1px solid #2e3442;
  color: #a0a6b5;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:hover {
    color: #ffffff;
    background: #2a303e;
    border-color: #eabf00;
  }
`;

export const ModalGrid = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 32px;
  padding: 32px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    padding: 24px;
    gap: 24px;
  }
`;

export const GalleryColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const MainImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 480px;
  background: #0d0f14;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #232733;

  @media (max-width: 860px) {
    height: 340px;
  }
`;

export const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const BadgeTopLeft = styled.span`
  position: absolute;
  top: 14px;
  left: 14px;
  background: #ff3b30;
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: 6px;
  letter-spacing: 0.05em;
`;

export const BadgeTopRight = styled.span`
  position: absolute;
  top: 14px;
  right: 14px;
  background: #14161d;
  color: #ccff00;
  border: 1px solid rgba(204, 255, 0, 0.4);
  font-size: 0.7rem;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: 6px;
  letter-spacing: 0.05em;
`;

export const ThumbnailsRow = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 4px;
`;

interface IThumbnail {
  active?: boolean;
}

export const Thumbnail = styled.button<IThumbnail>`
  width: 72px;
  height: 72px;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid ${({ active }) => (active ? '#eabf00' : '#232733')};
  background: #101217;
  padding: 0;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.2s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    border-color: #eabf00;
  }
`;

export const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Breadcrumb = styled.div`
  font-size: 0.75rem;
  color: #687082;
  font-weight: 600;
  display: flex;
  gap: 6px;
  margin-bottom: 8px;
`;

export const Title = styled.h2`
  margin: 0 0 10px;
  font-size: 1.8rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  color: #ffffff;
  line-height: 1.2;
`;

export const RatingReviewBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

export const Stars = styled.span`
  color: #eabf00;
  font-size: 0.95rem;
  letter-spacing: 2px;
`;

export const RatingScore = styled.span`
  font-weight: 800;
  font-size: 0.88rem;
  color: #ffffff;
`;

export const ReviewCount = styled.span`
  color: #687082;
  font-size: 0.78rem;
`;

export const PriceBlock = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 8px;
`;

export const CurrentPrice = styled.span`
  font-size: 1.8rem;
  font-weight: 900;
  color: #ffffff;
`;

export const OriginalPrice = styled.span`
  font-size: 1.1rem;
  color: #687082;
  text-decoration: line-through;
`;

export const SavingsPill = styled.span`
  background: rgba(255, 59, 48, 0.15);
  color: #ff3b30;
  border: 1px solid rgba(255, 59, 48, 0.4);
  font-size: 0.75rem;
  font-weight: 800;
  padding: 3px 8px;
  border-radius: 6px;
`;

export const InstallmentText = styled.p`
  margin: 0 0 16px;
  font-size: 0.8rem;
  color: #a0a6b5;

  b {
    color: #eabf00;
  }
`;

export const ShortDescription = styled.p`
  margin: 0 0 20px;
  font-size: 0.92rem;
  line-height: 1.55;
  color: #c0c6d4;
`;

export const OptionSection = styled.div`
  margin-bottom: 18px;
`;

export const OptionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.78rem;
  font-weight: 800;
  color: #a0a6b5;
  margin-bottom: 8px;
  letter-spacing: 0.05em;

  b {
    color: #ffffff;
  }
`;

export const SizeGuideLink = styled.span`
  color: #eabf00;
  cursor: pointer;
  font-size: 0.72rem;
  text-decoration: underline;
`;

export const ColorSwatches = styled.div`
  display: flex;
  gap: 10px;
`;

interface IColorSwatch {
  colorHex: string;
  active?: boolean;
}

export const ColorSwatch = styled.button<IColorSwatch>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ colorHex }) => colorHex};
  border: 3px solid ${({ active }) => (active ? '#eabf00' : '#282c38')};
  box-shadow: ${({ active }) => (active ? '0 0 0 2px #14161d' : 'none')};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

export const SizesGrid = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

interface ISizePill {
  active?: boolean;
}

export const SizePill = styled.button<ISizePill>`
  background: ${({ active }) => (active ? '#eabf00' : '#1a1d26')};
  color: ${({ active }) => (active ? '#000000' : '#ffffff')};
  border: 1px solid ${({ active }) => (active ? '#eabf00' : '#282c38')};
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #eabf00;
  }
`;

export const ActionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 20px 0 16px;
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  background: #1a1d26;
  border: 1px solid #282c38;
  border-radius: 10px;
  overflow: hidden;

  button {
    background: none;
    border: none;
    color: #ffffff;
    font-size: 1rem;
    font-weight: 700;
    width: 36px;
    height: 44px;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover:not(:disabled) {
      background: #282c38;
    }

    &:disabled {
      color: #555;
      cursor: not-allowed;
    }
  }

  span {
    padding: 0 10px;
    font-weight: 800;
    font-size: 0.9rem;
    color: #ffffff;
    min-width: 20px;
    text-align: center;
  }
`;

interface IAddToCart {
  added?: boolean;
}

export const AddToCartButton = styled.button<IAddToCart>`
  flex: 1;
  background: ${({ added }) => (added ? '#10b981' : '#eabf00')};
  color: #000000;
  font-weight: 900;
  font-size: 0.95rem;
  letter-spacing: 0.08em;
  padding: 14px 20px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 8px 20px rgba(234, 191, 0, 0.2);

  &:hover {
    background: ${({ added }) => (added ? '#10b981' : '#ffdf5a')};
    transform: translateY(-1px);
  }
`;

interface IWishlistIconButton {
  active?: boolean;
}

export const WishlistIconButton = styled.button<IWishlistIconButton>`
  background: #1a1d26;
  border: 1px solid #282c38;
  color: ${({ active }) => (active ? '#ff3b30' : '#ffffff')};
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  svg {
    width: 22px;
    height: 22px;
  }

  &:hover {
    border-color: #ff3b30;
    transform: scale(1.05);
  }
`;

export const StockStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.78rem;
  color: #10b981;
  font-weight: 600;
  margin-bottom: 24px;

  .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #10b981;
    box-shadow: 0 0 6px #10b981;
  }
`;

export const TabNav = styled.div`
  display: flex;
  border-bottom: 1px solid #232733;
  margin-bottom: 16px;
  overflow-x: auto;
`;

interface ITabTitle {
  active?: boolean;
}

export const TabTitle = styled.button<ITabTitle>`
  background: none;
  border: none;
  border-bottom: 2px solid ${({ active }) => (active ? '#eabf00' : 'transparent')};
  color: ${({ active }) => (active ? '#ffffff' : '#687082')};
  font-size: 0.82rem;
  font-weight: 700;
  padding: 10px 14px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    color: #ffffff;
  }
`;

export const TabContentWrapper = styled.div`
  font-size: 0.86rem;
  line-height: 1.6;
  color: #a0a6b5;
`;

export const TabParagraph = styled.div`
  margin: 0;
`;

export const ReviewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ReviewCard = styled.div`
  background: #101217;
  border: 1px solid #1f232e;
  border-radius: 10px;
  padding: 12px 16px;
`;

export const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;

  strong {
    color: #ffffff;
    font-size: 0.85rem;
  }

  .date {
    margin-left: auto;
    font-size: 0.72rem;
    color: #687082;
  }
`;

export const VerifiedPill = styled.span`
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  font-size: 0.65rem;
  font-weight: 800;
  padding: 1px 6px;
  border-radius: 4px;
`;

export const ReviewRating = styled.div`
  color: #eabf00;
  font-size: 0.8rem;
  margin-bottom: 4px;
`;

export const ReviewComment = styled.p`
  margin: 0;
  color: #d1d5db;
  font-size: 0.82rem;
`;

export const SimilarSection = styled.div`
  border-top: 1px solid #232733;
  padding: 24px 32px 32px;
  background: #0f1117;
`;

export const SimilarTitle = styled.h4`
  margin: 0 0 16px;
  font-size: 0.95rem;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: 0.05em;
`;

export const SimilarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const SimilarCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: #14161d;
  border: 1px solid #232733;
  border-radius: 10px;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  img {
    width: 44px;
    height: 52px;
    object-fit: cover;
    border-radius: 6px;
  }

  .meta {
    display: flex;
    flex-direction: column;
    min-width: 0;

    strong {
      font-size: 0.78rem;
      color: #ffffff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 2px;
    }

    span {
      font-size: 0.8rem;
      font-weight: 800;
      color: #eabf00;
    }
  }

  &:hover {
    border-color: #eabf00;
    transform: translateY(-2px);
  }
`;
