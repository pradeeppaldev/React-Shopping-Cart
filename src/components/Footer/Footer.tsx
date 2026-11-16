import React, { useState } from 'react';
import * as S from './style';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <S.FooterContainer>
      {/* Newsletter Section */}
      <S.NewsletterWrapper>
        <S.NewsletterContent>
          <S.NewsletterTitle>
            JOIN THE VIBE CLUB {'//'} GET 15% OFF
          </S.NewsletterTitle>
          <S.NewsletterSubtitle>
            Be the first to access limited archive drops, secret sales, and community lookbooks.
          </S.NewsletterSubtitle>
        </S.NewsletterContent>

        <S.NewsletterForm onSubmit={handleSubscribe}>
          {subscribed ? (
            <S.SubscribedMessage>
              ✓ You're in! Check your inbox for your 15% code.
            </S.SubscribedMessage>
          ) : (
            <>
              <S.NewsletterInput
                type="email"
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <S.NewsletterButton type="submit">SUBSCRIBE</S.NewsletterButton>
            </>
          )}
        </S.NewsletterForm>
      </S.NewsletterWrapper>

      {/* Main Footer Links */}
      <S.FooterGrid>
        <S.BrandColumn>
          <S.BrandLogo>
            VIBE<span>CART</span>
          </S.BrandLogo>
          <S.BrandTagline>
            PREMIUM STREETWEAR & ARCHIVE STUDIO
          </S.BrandTagline>
          <S.BrandDesc>
            Engineered for the culture. We craft heavyweight everyday essentials,
            tactical volume, and Y2K aesthetic statement cuts using 100% sustainable
            organic cotton and low-impact dyeing.
          </S.BrandDesc>
          <S.SocialLinks>
            <S.SocialPill href="#tiktok" title="TikTok">TikTok</S.SocialPill>
            <S.SocialPill href="#instagram" title="Instagram">Instagram</S.SocialPill>
            <S.SocialPill href="#discord" title="Discord">Discord</S.SocialPill>
            <S.SocialPill href="#youtube" title="YouTube">YouTube</S.SocialPill>
          </S.SocialLinks>
        </S.BrandColumn>

        <S.LinksColumn>
          <S.ColumnTitle>SHOP COLLECTIONS</S.ColumnTitle>
          <S.LinksList>
            <li><a href="#streetwear">Streetwear Archive</a></li>
            <li><a href="#mens">Men's Fashion</a></li>
            <li><a href="#womens">Women's Fashion</a></li>
            <li><a href="#footwear">Cyber Footwear</a></li>
            <li><a href="#accessories">Chrome Accessories</a></li>
            <li><a href="#new">Just Dropped</a></li>
          </S.LinksList>
        </S.LinksColumn>

        <S.LinksColumn>
          <S.ColumnTitle>CUSTOMER CARE</S.ColumnTitle>
          <S.LinksList>
            <li><a href="#orders">Track Your Order</a></li>
            <li><a href="#shipping">Shipping & Delivery Rates</a></li>
            <li><a href="#returns">Hassle-Free 30-Day Returns</a></li>
            <li><a href="#fit">Size & Fit Guide</a></li>
            <li><a href="#faq">Help & FAQ</a></li>
            <li><a href="#contact">Contact Support 24/7</a></li>
          </S.LinksList>
        </S.LinksColumn>

        <S.LinksColumn>
          <S.ColumnTitle>SUSTAINABILITY</S.ColumnTitle>
          <S.LinksList>
            <li><a href="#organic">100% GOTS Organic Cotton</a></li>
            <li><a href="#packaging">Zero-Plastic Recycled Packaging</a></li>
            <li><a href="#carbon">Carbon-Neutral Global Dispatch</a></li>
            <li><a href="#wages">Ethical Fair-Wage Workshops</a></li>
            <li><a href="#recycling">Garment Take-Back Scheme</a></li>
          </S.LinksList>
        </S.LinksColumn>
      </S.FooterGrid>

      {/* Bottom Bar: Payments & Copyright */}
      <S.BottomBar>
        <S.Copyright>
          © 2026 VIBECART STUDIO INC. ALL RIGHTS RESERVED.
        </S.Copyright>

        <S.PaymentMethods>
          <span className="badge">APPLE PAY</span>
          <span className="badge">GOOGLE PAY</span>
          <span className="badge">KLARNA</span>
          <span className="badge">VISA</span>
          <span className="badge">MASTERCARD</span>
          <span className="badge">PAYPAL</span>
        </S.PaymentMethods>

        <S.RegionSelector>
          <span>🇺🇸 United States (USD $)</span>
        </S.RegionSelector>
      </S.BottomBar>
    </S.FooterContainer>
  );
};

export default Footer;
