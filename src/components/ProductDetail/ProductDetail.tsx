import { FC, useState } from 'react';
import styled from 'styled-components';
import useAddProduct from '../../hooks/useAddProduct';
import Product from '../../models/Product';

const ProductDetailCard = styled.div`
  background-color: #F9F9F9;
  border: 1px solid #D5D5D5;
  border-radius: 8px;
  max-width: 25%;
  box-shadow: 0px 16px 16px 0px #D9D9D9;
  margin: 5px;
`;

const ProductDetailCardHeader = styled.div`
  width: 100%;
  max-height: max-content;
  position: relative;
`;

const ProductDetailImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 300px;
`;

const ProductDetailBody = styled.div`
  padding: 8px;
`;

const ProductDetailDescription = styled.p`
  font-family: sans-serif;
  width: 100%;
  margin-bottom: 16px;
`;

const ProductDetailFooter = styled.div`
  border-top: 1px solid grey;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

const QuantityInput = styled.input`
  background-color: #eaeaea;
  border: 1px solid #dfdfdf;
  border-radius: 4px;
  box-shadow: 3px 3px 5px #a4a09d8a;
  margin: 8px;
  padding: 8px;
  font-size: 1.2rem;
  text-align: end;
`;

const AddToCartButton = styled.button`
  margin: 8px;
  background-color: orange;
  border-radius: 8px;
  padding: 8px;
  color: white;
  box-sizing: border-box;
  box-shadow: 3px 3px 5px #ca80548a;
  font-size: 1.2rem;
`;


interface ProductDetailProps {
  product: Product
};

export const ProductDetail:FC<ProductDetailProps> = (props) => {
  const [ quantity, setQuantity ] = useState(1);
  const { featuredAsset, name, description } = props.product;
  const { addProduct, error, loading } = useAddProduct();

  return <ProductDetailCard>
    <ProductDetailCardHeader>
      {
        // TODO show a placeholder image if it doesn't exist.
        featuredAsset &&
        <ProductDetailImage
          src={featuredAsset.source}
          width={featuredAsset.width}
          height={featuredAsset.height}
        />
      }
    </ProductDetailCardHeader>
    <ProductDetailBody>
      <h1>
        {name}
      </h1>
      <ProductDetailDescription>
        {description}
      </ProductDetailDescription>
    </ProductDetailBody>
    <ProductDetailFooter>
      <QuantityInput type='number' min={1} max={99} step={1} value={quantity} onChange={(event) => setQuantity(+event.target.value)} />
      <AddToCartButton onClick={() => addProduct(props.product.variants[0].id, quantity)} disabled={loading}>Add to cart</AddToCartButton>
    </ProductDetailFooter>
  </ProductDetailCard>;
};