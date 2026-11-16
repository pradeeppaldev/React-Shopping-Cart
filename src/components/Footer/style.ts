import styled from 'styled-components/macro';

export const FooterContainer = styled.footer`
  background: #0d0f14;
  border-top: 1px solid #232733;
  margin-top: 60px;
  padding: 60px 24px 32px;
`;

export const NewsletterWrapper = styled.div`
  max-width: 1360px;
  margin: 0 auto 50px;
  background: linear-gradient(135deg, #14161d 0%, #1a1d26 100%);
  border: 1px solid #282c38;
  border-radius: 20px;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;

  @media (max-width: 860px) {
    flex-direction: column;
    padding: 28px 20px;
    text-align: center;
  }
`;

export const NewsletterContent = styled.div`
  max-width: 520px;
`;

export const NewsletterTitle = styled.h3`
  margin: 0 0 8px;
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  color: #ffffff;
`;

export const NewsletterSubtitle = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #a0a6b5;
  line-height: 1.5;
`;

export const NewsletterForm = styled.form`
  display: flex;
  gap: 10px;
  width: 100%;
  max-width: 440px;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

export const NewsletterInput = styled.input`
  flex: 1;
  background: #0f1117;
  border: 1px solid #282c38;
  border-radius: 10px;
  padding: 12px 16px;
  color: #ffffff;
  font-size: 0.88rem;
  outline: none;

  &:focus {
    border-color: #eabf00;
  }
`;

export const NewsletterButton = styled.button`
  background: #eabf00;
  color: #000000;
  font-weight: 800;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  padding: 12px 22px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #ffdf5a;
  }
`;

export const SubscribedMessage = styled.div`
  color: #10b981;
  font-weight: 800;
  font-size: 0.9rem;
`;

export const FooterGrid = styled.div`
  max-width: 1360px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 40px;
  padding-bottom: 48px;
  border-bottom: 1px solid #1f232e;

  @media (max-width: 960px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const BrandColumn = styled.div`
  max-width: 380px;
`;

export const BrandLogo = styled.h2`
  margin: 0 0 4px;
  font-size: 1.8rem;
  font-weight: 900;
  letter-spacing: -0.04em;
  color: #ffffff;

  span {
    color: #eabf00;
  }
`;

export const BrandTagline = styled.p`
  margin: 0 0 14px;
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  color: #687082;
`;

export const BrandDesc = styled.p`
  margin: 0 0 20px;
  font-size: 0.85rem;
  line-height: 1.6;
  color: #a0a6b5;
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const SocialPill = styled.a`
  background: #14161d;
  border: 1px solid #232733;
  color: #c0c6d4;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 6px 14px;
  border-radius: 999px;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    color: #ffffff;
    border-color: #eabf00;
    transform: translateY(-1px);
  }
`;

export const LinksColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ColumnTitle = styled.h4`
  margin: 0 0 16px;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: #ffffff;
`;

export const LinksList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;

  li a {
    color: #a0a6b5;
    font-size: 0.85rem;
    text-decoration: none;
    transition: color 0.15s ease;

    &:hover {
      color: #eabf00;
    }
  }
`;

export const BottomBar = styled.div`
  max-width: 1360px;
  margin: 28px auto 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const Copyright = styled.div`
  font-size: 0.75rem;
  color: #687082;
  font-weight: 600;
`;

export const PaymentMethods = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;

  .badge {
    background: #14161d;
    border: 1px solid #232733;
    color: #a0a6b5;
    font-size: 0.65rem;
    font-weight: 800;
    padding: 3px 8px;
    border-radius: 4px;
    letter-spacing: 0.05em;
  }
`;

export const RegionSelector = styled.div`
  font-size: 0.75rem;
  color: #a0a6b5;
  font-weight: 600;
`;
