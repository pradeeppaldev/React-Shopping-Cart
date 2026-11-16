import formatPrice from 'utils/formatPrice';
import getProductImage from 'utils/getProductImage';
import { ICartProduct } from 'models';
import { useCart } from 'contexts/cart-context';
import * as S from './style';

interface IProps {
  product: ICartProduct;
}

const CartProduct = ({ product }: IProps) => {
  const { removeProduct, increaseProductQuantity, decreaseProductQuantity } =
    useCart();
  const {
    title,
    price,
    style,
    currencyId,
    currencyFormat,
    availableSizes,
    quantity,
    selectedSize,
    selectedColor,
  } = product;

  const handleRemoveProduct = () => removeProduct(product);
  const handleIncreaseProductQuantity = () => increaseProductQuantity(product);
  const handleDecreaseProductQuantity = () => decreaseProductQuantity(product);

  const displaySize = selectedSize || (availableSizes && availableSizes[0]) || 'M';
  const displayVariant = selectedColor ? `${displaySize} | ${selectedColor}` : `${displaySize} | ${style || 'Standard'}`;
  const imgSrc = getProductImage(product, 1, true);

  return (
    <S.Container>
      <S.DeleteButton
        onClick={handleRemoveProduct}
        title="remove product from cart"
        aria-label="Remove item"
      >
        ✕
      </S.DeleteButton>
      <S.Image src={imgSrc} alt={title} />
      <S.Details>
        <S.Title>{title}</S.Title>
        <S.Desc>
          <span>{displayVariant}</span>
          <span className="qty">Qty: {quantity}</span>
        </S.Desc>
      </S.Details>
      <S.Price>
        <p>{`${currencyFormat}  ${formatPrice(price * quantity, currencyId)}`}</p>
        <div>
          <S.ChangeQuantity
            onClick={handleDecreaseProductQuantity}
            disabled={quantity === 1}
            aria-label="Decrease quantity"
          >
            -
          </S.ChangeQuantity>
          <S.QuantityValue>{quantity}</S.QuantityValue>
          <S.ChangeQuantity
            onClick={handleIncreaseProductQuantity}
            aria-label="Increase quantity"
          >
            +
          </S.ChangeQuantity>
        </div>
      </S.Price>
    </S.Container>
  );
};

export default CartProduct;
