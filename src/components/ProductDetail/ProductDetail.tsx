import { FC } from 'react';
import styled from 'styled-components';
import useAddProduct from '../../hooks/useAddProduct';
import Product from '../../models/Product';

const ProductDetailCard = styled.div`
  background-color: #F9F9F9;
  border: 1px solid #D5D5D5;
  border-radius: 8px;
  max-width: 25%;
  box-shadow: 1px 1px #D9D9D9;
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

const ProductDetailDescription = styled.p`
  word-wrap: break-word;
  text-align: justify;
  position: absolute;
  bottom: 0;
  background-color: #6e64738f;
  color: white;
  height: 1.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  z-index: 999;
  margin-bottom: 0;

  &:hover {
    height: auto;
    white-space: normal;
  }
`;

const QuantityInput = styled.input``;
const AddToCartButton = styled.button``;


interface ProductDetailProps {
  product: Product
};

export const ProductDetail:FC<ProductDetailProps> = (props) => {
  const { featuredAsset, name, description } = props.product;
  const {addProduct, error, loading} = useAddProduct();

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
      <ProductDetailDescription>
        {description}
      </ProductDetailDescription>
    </ProductDetailCardHeader>
    <div>
      <h3>
        {name}
      </h3>
      <div>
        <QuantityInput type='number' min={0} max={99} step={1} />
        <AddToCartButton onClick={() => addProduct(props.product.variants[0].id, 1)}>Add to cart</AddToCartButton>
      </div>
    </div>
    {/* <div>id: {props.product.id}</div>
    <div>description: {props.product.description}</div>
    <div>variants: {JSON.stringify(props.product.variants)}</div> */}
  </ProductDetailCard>;
};