import styled from 'styled-components/macro';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(8, 10, 14, 0.7);
  backdrop-filter: blur(6px);
  z-index: 999;
  display: flex;
  justify-content: flex-end;
  animation: fadeIn 0.2s ease-out;
`;

export const DrawerContainer = styled.aside`
  width: 100%;
  max-width: 440px;
  height: 100%;
  background: #14161d;
  border-left: 1px solid #282c38;
  display: flex;
  flex-direction: column;
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.6);
  animation: slideIn 0.25s ease-out;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

export const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #232733;
`;

export const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.95rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  color: #ffffff;
`;

export const HeartIcon = styled.svg`
  width: 20px;
  height: 20px;
`;

export const CloseButton = styled.button`
  background: #1e222c;
  border: 1px solid #2e3442;
  color: #a0a6b5;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s ease;

  &:hover {
    color: #ffffff;
    border-color: #eabf00;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 30px;
  text-align: center;
  flex: 1;

  .heart-emoji {
    font-size: 3.5rem;
    margin-bottom: 16px;
  }

  h3 {
    margin: 0 0 8px;
    font-size: 1.1rem;
    font-weight: 800;
    color: #ffffff;
  }

  p {
    margin: 0 0 24px;
    font-size: 0.85rem;
    color: #a0a6b5;
    line-height: 1.5;
  }
`;

export const ExploreButton = styled.button`
  background: #eabf00;
  color: #000000;
  font-weight: 800;
  font-size: 0.85rem;
  padding: 12px 24px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #ffdf5a;
    transform: translateY(-2px);
  }
`;

export const ItemsList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ItemCard = styled.div`
  display: flex;
  gap: 14px;
  background: #101217;
  border: 1px solid #232733;
  border-radius: 12px;
  padding: 12px;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: #2e3442;
  }
`;

export const ItemImage = styled.img`
  width: 80px;
  height: 96px;
  object-fit: cover;
  border-radius: 8px;
  background: #0d0f14;
`;

export const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const ItemCategory = styled.span`
  font-size: 0.68rem;
  font-weight: 700;
  color: #687082;
  text-transform: uppercase;
  margin-bottom: 4px;
`;

export const ItemTitle = styled.h4`
  margin: 0 0 6px;
  font-size: 0.88rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.3;
`;

export const ItemPrice = styled.div`
  font-size: 0.95rem;
  font-weight: 800;
  color: #eabf00;
  margin-bottom: 10px;
`;

export const ItemActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: auto;
`;

export const MoveToCartButton = styled.button`
  background: #eabf00;
  color: #000000;
  font-size: 0.72rem;
  font-weight: 800;
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #ffdf5a;
  }
`;

export const RemoveButton = styled.button`
  background: none;
  border: 1px solid #282c38;
  color: #a0a6b5;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #ff3b30;
    border-color: #ff3b30;
  }
`;
