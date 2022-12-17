import { FC, useState } from 'react';
import styled from 'styled-components';
import useAddProduct from '../../hooks/useAddProduct';
import Product from '../../models/Product';
import { ProductVariantOption } from "../../models/ProductVariantOption";
import { ProductOption } from "../../models/ProductOption";
import { ProductOptionGroup } from "../../models/ProductOptionGroup";

// #region styles
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
  
`;

const FooterFormContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

const Price = styled.span`
  font-size: 32px;
  margin: 8px;
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
  max-width: 100px
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

const OptionGroupsContainer = styled.div``;

const OptionGroup = styled.div`
  display: inline-block;
  margin: 8px;
`;
const OptionGroupTitle = styled.h4`
  margin-bottom: 0px;
`;
const OptionsList = styled.ul`
  margin-top: 0px;
  list-style: none;
  display: flex;
  padding: 0px;
`;

const OptionItem = styled.li`
  margin: 3px;
  border: 1px solid #ffa500;
  cursor: pointer;
  padding: 3px;
  border-radius: 3px;

  &:hover {
    background-color: #ffa500;
    color: white;
  }
`;

const ActiveOptionItem = styled(OptionItem)`
  background-color: #ffa500;
  color: white;
`;

const ErrorMessageContainer = styled.div`
  background-color: red;
  color: white;
  padding: 8px;
`;
// #endregion



interface ProductDetailProps {
  product: Product
};

export const ProductDetail:FC<ProductDetailProps> = (props) => {
  const { product } = props;
  const { id, featuredAsset, name, description, variants, optionGroups } = props.product;
  const [ quantity, setQuantity ] = useState(1);
  const [ activeVariant, setActiveVariant ] = useState(variants[0]);
  
  const { addProduct, error, loading } = useAddProduct();

  const changeActiveOption = (newActiveOption:ProductOption) => {
    setActiveVariant(product.getVariantWithNewOption(activeVariant, newActiveOption)!);
  }

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
      <OptionGroupsContainer>
        {optionGroups.map((optionGroup:ProductOptionGroup) => {
          const optionsItems = optionGroup.options.map((option:ProductOption) => {
            if (activeVariant?.options.some((variantOption:ProductVariantOption) => variantOption.id === option.id)) {
              return <ActiveOptionItem key={`option-item-${id}-${option.id}`}>{option.name}</ActiveOptionItem>
            }

            return <OptionItem key={`option-item-${id}-${option.id}`} onClick= {() => changeActiveOption(option)}>{option.name}</OptionItem>;
          })
          return <OptionGroup key={`option-group-${id}-${optionGroup.id}`}>
            <OptionGroupTitle>{optionGroup.name}</OptionGroupTitle>
            <OptionsList>
              {optionsItems}
            </OptionsList>
          </OptionGroup>;
        })}
      </OptionGroupsContainer>
      <FooterFormContainer>
        <Price>$&nbsp;{activeVariant?.price}</Price>
        <QuantityInput type='number' min={1} max={99} step={1} value={quantity} onChange={(event) => setQuantity(+event.target.value)} />
        <AddToCartButton onClick={() => addProduct(activeVariant.id, quantity)} disabled={!activeVariant || loading}>{loading ? "Adding..." : "Add to cart"}</AddToCartButton>
      </FooterFormContainer>

      {
        error &&
        <ErrorMessageContainer>{error}</ErrorMessageContainer>
      }
    </ProductDetailFooter>
  </ProductDetailCard>;
};