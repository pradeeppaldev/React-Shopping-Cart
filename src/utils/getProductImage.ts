import { IProduct } from 'models';

const LOCAL_SKUS = new Set([
  8552515751438644,
  18644119330491310,
  11854078013954528,
  876661122392077,
  9197907543445676,
  10547961582846888,
  6090484789343891,
  18532669286405344,
  5619496040738316,
  11600983276356164,
  27250082398145996,
  39876704341265610,
  12064273040195392,
  51498472915966370,
  10686354557628304,
  11033926921508488,
]);

export const getProductImage = (
  product: Partial<IProduct>,
  imageIndex: 1 | 2 = 1,
  forCart = false
): string => {
  const { sku, images } = product;

  if (sku && LOCAL_SKUS.has(sku)) {
    try {
      if (forCart) {
        return require(`static/products/${sku}-1-cart.webp`);
      }
      return require(`static/products/${sku}-${imageIndex}-product.webp`);
    } catch {
      // fallback if require fails
    }
  }

  if (images && images.length > 0) {
    const idx = (imageIndex - 1) % images.length;
    return images[idx] || images[0];
  }

  return 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80';
};

export default getProductImage;
