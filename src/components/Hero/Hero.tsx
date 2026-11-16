import React from 'react';
import { useProducts } from 'contexts/products-context';
import * as S from './style';

const Hero: React.FC = () => {
  const { updateCategoryFilter } = useProducts();

  const handleScrollToProducts = () => {
    const catalog = document.getElementById('catalog-section');
    if (catalog) {
      catalog.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <S.HeroContainer>
      <S.HeroOverlay />
      <S.HeroContent>
        <S.PillBadge>
          <span className="dot" />
          <span>SS26 STREETWEAR CAPSULE DROP {'//'} LIVE NOW</span>
        </S.PillBadge>

        <S.HeroTitle>
          THE NEW WAVE <span>STREETWEAR</span>
        </S.HeroTitle>

        <S.HeroSubtitle>
          Heavyweight French Terry, boxy oversized drops, tactical parachute cargos, and Y2K cyber accents. Built for daily rotation, engineered to outlast trends.
        </S.HeroSubtitle>

        <S.ButtonGroup>
          <S.PrimaryButton onClick={handleScrollToProducts}>
            EXPLORE THE DROP
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </S.PrimaryButton>

          <S.SecondaryButton onClick={() => updateCategoryFilter('Streetwear')}>
            🔥 SHOP VIRAL TRENDS
          </S.SecondaryButton>
        </S.ButtonGroup>

        <S.TrustBadges>
          <S.TrustItem>
            <span className="icon">★</span>
            <div>
              <strong>4.9 / 5.0</strong>
              <small>Over 100k+ reviews</small>
            </div>
          </S.TrustItem>
          <S.TrustItem>
            <span className="icon">⚡</span>
            <div>
              <strong>Express 24h</strong>
              <small>Fast worldwide dispatch</small>
            </div>
          </S.TrustItem>
          <S.TrustItem>
            <span className="icon">🌱</span>
            <div>
              <strong>100% Sustainable</strong>
              <small>Heavyweight combed cotton</small>
            </div>
          </S.TrustItem>
        </S.TrustBadges>
      </S.HeroContent>

      <S.HeroVisual>
        <S.FloatingCard className="top-right">
          <span className="fire">🔥</span>
          <div>
            <span className="title">VIRAL ON TIKTOK</span>
            <span className="subtitle">Skater Sweatshirt #1</span>
          </div>
        </S.FloatingCard>

        <S.FloatingCard className="bottom-left">
          <span className="verified">✓</span>
          <div>
            <span className="title">NEW ARRIVAL</span>
            <span className="subtitle">Cyber Runner V3</span>
          </div>
        </S.FloatingCard>
      </S.HeroVisual>
    </S.HeroContainer>
  );
};

export default Hero;
