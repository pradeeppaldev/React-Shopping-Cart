import { ICartProduct } from 'models';
import CartProduct from './CartProduct';
import * as S from './style';

interface IProps {
  products: ICartProduct[];
}

const CartProducts = ({ products }: IProps) => {
  return (
    <S.Container>
      {products?.length ? (
        products.map((p, index) => (
          <CartProduct
            product={p}
            key={`${p.sku}-${p.selectedSize || ''}-${p.selectedColor || ''}-${index}`}
          />
        ))
      ) : (
        <S.CartProductsEmpty>
          Add some products in the cart <br />
          :)
        </S.CartProductsEmpty>
      )}
    </S.Container>
  );
};

export default CartProducts;
