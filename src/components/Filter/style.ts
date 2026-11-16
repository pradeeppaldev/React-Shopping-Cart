import styled from 'styled-components/macro';
import CB from 'commons/Checkbox';

export const Container = styled.div`
  background: #14161d;
  border: 1px solid #232733;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 24px;
`;

export const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
  padding-bottom: 12px;
  border-bottom: 1px solid #232733;
`;

export const MainFilterTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: 0.05em;

  svg {
    width: 18px;
    height: 18px;
    color: #eabf00;
  }
`;

export const CountBadge = styled.span`
  background: #eabf00;
  color: #000000;
  font-size: 0.65rem;
  font-weight: 800;
  padding: 1px 6px;
  border-radius: 999px;
`;

export const ResetLink = styled.button`
  background: none;
  border: none;
  color: #eabf00;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;

export const Section = styled.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Title = styled.h4`
  margin: 0 0 10px;
  font-size: 0.82rem;
  font-weight: 800;
  color: #a0a6b5;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

export const SortSelect = styled.select`
  width: 100%;
  background: #101217;
  border: 1px solid #282c38;
  border-radius: 10px;
  color: #ffffff;
  padding: 10px 14px;
  font-size: 0.85rem;
  font-weight: 600;
  outline: none;
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #eabf00;
  }
`;

export const CategoryPills = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

interface ICategoryPill {
  active?: boolean;
}

export const CategoryPill = styled.button<ICategoryPill>`
  text-align: left;
  background: ${({ active }) => (active ? '#1f232e' : 'transparent')};
  color: ${({ active }) => (active ? '#eabf00' : '#c0c6d4')};
  border: 1px solid ${({ active }) => (active ? '#eabf00' : 'transparent')};
  border-radius: 8px;
  padding: 7px 12px;
  font-size: 0.82rem;
  font-weight: ${({ active }) => (active ? '700' : '500')};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: #1a1d26;
    color: #ffffff;
  }
`;

export const SizesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const Checkbox = styled(CB)`
  display: inline-block;

  label {
    display: inline-block;
    position: relative;
    cursor: pointer;
    -webkit-user-select: none;
    user-select: none;
    width: 38px;
    height: 38px;
    font-size: 0.78rem;
    border-radius: 8px;
    line-height: 38px;
    text-align: center;
    font-weight: 700;

    &:hover input ~ .checkmark {
      border: 1px solid #eabf00;
    }

    input:focus-visible ~ .checkmark {
      outline: 2px solid #eabf00;
    }

    & input:checked ~ .checkmark {
      background-color: #eabf00;
      color: #000000;
      border-color: #eabf00;
      font-weight: 800;
    }

    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
    }

    .checkmark {
      position: absolute;
      top: 0;
      left: 0;
      width: 38px;
      height: 38px;
      font-size: 0.78rem;
      border-radius: 8px;
      line-height: 38px;
      text-align: center;
      color: #ffffff;
      background-color: #101217;
      border: 1px solid #282c38;
      transition: all 0.15s ease;
    }
  }
`;

export const PriceRangeGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
`;

interface IPriceOption {
  active?: boolean;
}

export const PriceOption = styled.button<IPriceOption>`
  background: ${({ active }) => (active ? '#1f232e' : '#101217')};
  color: ${({ active }) => (active ? '#eabf00' : '#a0a6b5')};
  border: 1px solid ${({ active }) => (active ? '#eabf00' : '#282c38')};
  border-radius: 8px;
  padding: 8px 10px;
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: #eabf00;
    color: #ffffff;
  }
`;

export const ShippingToggleLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.82rem;
  font-weight: 600;
  color: #c0c6d4;
  cursor: pointer;

  input {
    width: 16px;
    height: 16px;
    accent-color: #eabf00;
    cursor: pointer;
  }

  &:hover {
    color: #ffffff;
  }
`;
