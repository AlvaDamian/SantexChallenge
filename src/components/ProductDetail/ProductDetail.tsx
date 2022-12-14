import { FC } from 'react';
import Product from '../../models/Product';

interface ProductDetailProps {
  product: Product
};

export const ProductDetail:FC<ProductDetailProps> = (props) =>  {
  return <div>
    <div>id: {props.product.id}</div>
    <div>description: {props.product.description}</div>
    <div>variants: {JSON.stringify(props.product.variants)}</div>
  </div>;
};