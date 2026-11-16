import styled from 'styled-components/macro';

export const Container = styled.section`
  max-width: 1360px;
  margin: 0 auto 48px;
  padding: 0 20px;
`;

export const HeaderWrapper = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;

export const SectionBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(234, 191, 0, 0.1);
  border: 1px solid rgba(234, 191, 0, 0.3);
  color: #eabf00;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  padding: 4px 12px;
  border-radius: 999px;
  margin-bottom: 8px;

  .icon {
    font-size: 0.9rem;
  }
`;

export const Title = styled.h2`
  margin: 0 0 8px;
  font-size: 2.2rem;
  font-weight: 900;
  letter-spacing: -0.03em;
  color: #ffffff;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 1.7rem;
  }
`;

export const Description = styled.p`
  margin: 0 auto;
  max-width: 580px;
  font-size: 0.95rem;
  color: #a0a6b5;
`;

export const TabsTrack = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  overflow-x: auto;
  padding: 10px 0 20px;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (max-width: 900px) {
    justify-content: flex-start;
  }
`;

interface ITabButton {
  active?: boolean;
}

export const TabButton = styled.button<ITabButton>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: ${({ active }) => (active ? '#eabf00' : '#14161d')};
  color: ${({ active }) => (active ? '#000000' : '#a0a6b5')};
  border: 1px solid ${({ active }) => (active ? '#eabf00' : '#232733')};
  padding: 10px 18px;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ active }) => (active ? '#000000' : '#ffffff')};
    border-color: #eabf00;
    transform: translateY(-1px);
  }
`;

export const CarouselGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const ShowcaseCard = styled.div`
  background: #14161d;
  border: 1px solid #232733;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    border-color: #eabf00;
    transform: translateY(-4px);
    box-shadow: 0 16px 30px rgba(0, 0, 0, 0.45);
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 280px;
  background: #101217;
  overflow: hidden;
`;

export const CardImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease, transform 0.4s ease;

  ${ShowcaseCard}:hover & {
    opacity: 0;
    transform: scale(1.05);
  }
`;

export const HoverImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.4s ease;

  ${ShowcaseCard}:hover & {
    opacity: 1;
    transform: scale(1.05);
  }
`;

export const DiscountTag = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  background: #ff3b30;
  color: #ffffff;
  font-size: 0.72rem;
  font-weight: 800;
  padding: 3px 8px;
  border-radius: 6px;
  z-index: 2;
`;

interface IWishlistBtn {
  active?: boolean;
}

export const WishlistBtn = styled.button<IWishlistBtn>`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(18, 20, 27, 0.85);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: ${({ active }) => (active ? '#ff3b30' : '#ffffff')};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  transition: all 0.2s ease;

  svg {
    width: 18px;
    height: 18px;
  }

  &:hover {
    background: #ffffff;
    color: #ff3b30;
    transform: scale(1.1);
  }
`;

export const QuickViewBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(14, 16, 21, 0.9);
  backdrop-filter: blur(6px);
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  padding: 10px;
  text-align: center;
  transform: translateY(100%);
  transition: transform 0.25s ease;
  z-index: 2;

  ${ShowcaseCard}:hover & {
    transform: translateY(0);
  }
`;

export const InfoWrapper = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const CategoryStyle = styled.div`
  font-size: 0.72rem;
  font-weight: 600;
  color: #687082;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
`;

export const CardTitle = styled.h3`
  margin: 0 0 8px;
  font-size: 0.98rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.35;
  height: 40px;
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
  margin-bottom: 12px;

  .stars {
    color: #eabf00;
    font-size: 0.8rem;
    letter-spacing: 1px;
  }

  .score {
    font-size: 0.78rem;
    font-weight: 700;
    color: #ffffff;
  }

  .reviews {
    font-size: 0.72rem;
    color: #687082;
  }
`;

export const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 10px;
  border-top: 1px solid #1f232e;

  .prices {
    display: flex;
    align-items: baseline;
    gap: 8px;

    .current {
      font-size: 1.15rem;
      font-weight: 900;
      color: #ffffff;
    }

    .original {
      font-size: 0.85rem;
      color: #687082;
      text-decoration: line-through;
    }
  }
`;

export const AddBagButton = styled.button`
  background: #1f232e;
  border: 1px solid #282c38;
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 800;
  padding: 7px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #eabf00;
    color: #000000;
    border-color: #eabf00;
  }
`;
