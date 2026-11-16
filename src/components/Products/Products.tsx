import { IProduct } from 'models';
import Product from './Product';
import { useProducts } from 'contexts/products-context';

import * as S from './style';

interface IProps {
  products: IProduct[];
}

const Products = ({ products }: IProps) => {
  const { resetAllFilters } = useProducts();

  if (!products || products.length === 0) {
    return (
      <S.EmptyWrapper>
        <span className="search-icon">🔍</span>
        <h3>NO PRODUCTS FOUND</h3>
        <p>
          We couldn't find any products matching your active filters or search terms.
        </p>
        <S.ResetButton onClick={resetAllFilters}>CLEAR ALL FILTERS</S.ResetButton>
      </S.EmptyWrapper>
    );
  }

  return (
    <S.Container>
      {products.map((p) => (
        <Product product={p} key={p.sku} />
      ))}
    </S.Container>
  );
};

export default Products;
